import speakeasy from "speakeasy"
import { User, userDTO} from "../entities/User";
import userDB from "../db/user.DB";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import config from 'config'
import sessionDB from "../db/session.DB";
import { sessionDTO } from "../entities/Session";
import log from "../logger";
import userService from "./user.service";

export default class sessionService{

    async createSession(user: User,token: {accessToken: string}){
        return new sessionDB().addSession(user,token.accessToken);
    }
    async getSession(session: sessionDTO, user: userDTO){
        //Get the session
        const sessiondb = new sessionDB();
        const foundSession =  await sessiondb.getOneSession({id: session.id});

        //See if requesting user has the required rights
        if(foundSession){
            if(user.type === "Admin" ||  foundSession.userId == user.userID){
                return foundSession;
            }
        }else{
            return "Session not found";
        }
      
        
        throw new Error("User does not have access rights");
        
    }

    async updateSession(session: sessionDTO, user: userDTO){
        //Get the session
        const sessiondb = new sessionDB();
        const foundSession =  await sessiondb.getOneSession({id: session.id});

        if(foundSession){
            //See if requesting user has the required rights
            if(user.type === "Admin" ||  foundSession.userId == user.userID){
                return sessiondb.updateSession(session,{id: session.id});
            }
        }else{
            return "Session not found";
        }
            
        throw new Error("User does not have access rights");

    }

    async deleteSession(session: sessionDTO, user: userDTO){
        //Get the session
        const sessiondb = new sessionDB();
        const foundSession =  await sessiondb.getOneSession({id: session.id});

        if(foundSession){
            //See if requesting user has the required rights
            if(user.type === "Admin" ||  foundSession?.userId == user.userID){
                return sessiondb.deleteSession({id: session.id});
            }
        }else{
            return "Session not found";
        }

        
        throw new Error("User does not have access rights");

    }

    validateTwoFactAuth(user: User, pin : string){
        //User does not have twoFact enabled
        if(!user.twoFact){
            return true;
        }

        if(user.twoFact && user.privateKey){
        
            const userSecretKey = user.privateKey;

            const verified = speakeasy.totp.verify({
                secret: userSecretKey,
                encoding: 'base32',
                token: pin,
                window: 0
            });
            return verified;
        }
        
        return false; 
    }

    async validateUser({email, password} : {email : string, password: string}){
        //Find the user, by email
        const query = {
            email
        };
        const user = await new userDB().getUser(query);

        //If user does not exist
        if(!user){
            return false;
        }
        //Validate user login password 
        const isValid = await this.compareUserPassword(password, user.password);
        //Wrong login password
        if(!isValid){
            return false;
        }
        //User successfully validated, return a user object 
        return user;// omit(user,"password");
    }

    async compareUserPassword(candidatePassword:string, userPassword: string){
        return bcrypt.compare(candidatePassword,userPassword).catch((e)=>false);
    }

    signJwt(object: Object, options?: jwt.SignOptions | undefined){
        const privateKey = config.get('security.privateKey') as string;
        return jwt.sign(object,privateKey,{
            ...(options && options),
            algorithm:"RS256"
        });
    }

    verifyJwt(token: string){
        const publicKey = config.get('security.publicKey') as string;

        try{
            const decoded = jwt.verify(token, publicKey); 
            return{
                valid: true,
                expired: false,
                decoded,
            }
        
        }catch(e: any){
            return{
                valid: false,
                expired: e.message === "jwt expired",
                decoded: null
            }
        }
    }

    async getSessionTokens(validUser : User){
        //Check if valid session exists
        let vSesh = await new sessionDB().getOneSession({userId: validUser.userId, valid: true});

        if(vSesh){
            //Verify if valid session contains valid Jwt token
            const result = this.verifyJwt(vSesh.jwtToken);
            
            //If expired, invalidate token in DB
            if(result.expired){
                const sesToUpdate: sessionDTO = {};
                sesToUpdate.jwtToken = vSesh.jwtToken;
                sesToUpdate.valid = false;

                try{
                    await new sessionDB().updateSession(sesToUpdate,{jwtToken : vSesh.jwtToken});
                }catch(e: any){
                    throw new Error(e);
                }

                log.info("Found user session is expired, creating new session tokens.");
            }else{
                //Return valid session tokens
                return{refreshToken: vSesh.jwtToken, accessToken:"", new: false};
            }
        }
        const userSalt : userDTO = new userService().toUserDTO(validUser);

        //If no existing valid Jwt Tokens, we create new access and session tokens
        //Create access token
        const accessToken = this.signJwt(userSalt,
            {expiresIn: config.get('security.accessTokenTtl') }
        );

        //Create refresh token
        const refreshToken = this.signJwt(userSalt,
            {expiresIn: config.get('security.refreshTokenTtl') }
        );

        return {accessToken, refreshToken,  new: true};
        
    }

   async reIssueAccessToken(userId: number){
            
        //Get the user who holds the session token
        const user = await new userDB().getUser({userId: userId});

        if(user){
            const userSalt : userDTO = new userService().toUserDTO(user);

            //Create session token
            const accessToken = this.signJwt(userSalt,
                {expiresIn: config.get('security.accessTokenTtl')
            });
        
            return accessToken;
        }
    }

    toSessionDTO(sess: any){
        const session : sessionDTO = {};

        if(sess.id != undefined){
            session.id = sess.id;
        }

        if(sess.valid != undefined){
            session.valid = sess.valid;
        }

        if(sess.userId != undefined){
            session.userId = sess.userId;
        }

        return session;
    }

}

