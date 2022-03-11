import speakeasy from "speakeasy"
import { User} from "../entities/User";
import userDB from "../db/user.DB";
import bcrypt from "bcrypt"
import config from 'config'
import sessionDB from "../db/session.DB";
import { sessionDTO, userDTO } from "../entities/dto";
import log from "../logger";
import userService from "./user.service";
import { Session } from "../entities/Session";
import JwtService from "./jwt.service";

export default class SessionService{

    async createSession(user: User,token: {accessToken: string}){
        const session = new Session();
        session.userId = user.userId;
        session.jwtToken = token.accessToken;
        return new sessionDB().addSession(session);
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

                if(session.jwtToken != undefined){
                    foundSession.jwtToken = session.jwtToken;
                }
    
                if(session.valid != undefined){
                    foundSession.valid = session.valid;
                } 

                return sessiondb.updateSession(foundSession);
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
        const isValid = await bcrypt.compare(password,user.password).catch((e)=>false);
        
        //Wrong login password
        if(!isValid){
            return false;
        }
        //User successfully validated, return a user object 
        return user;
    }

    async getSessionTokens(validUser : User){
        //Check if valid session exists
        let vSesh = await new sessionDB().getOneSession({userId: validUser.userId, valid: true});

        if(vSesh){
            //Verify if valid session contains valid Jwt token
            const result = new JwtService().verifyJwt(vSesh.jwtToken);
            
            //If expired, invalidate token in DB
            if(result.expired){
                vSesh.valid = false;

                try{
                    await new sessionDB().updateSession(vSesh);
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
        const accessToken = new JwtService().signJwt(userSalt,
            {expiresIn: config.get('security.accessTokenTtl') }
        );

        //Create refresh token
        const refreshToken = new JwtService().signJwt(userSalt,
            {expiresIn: config.get('security.refreshTokenTtl') }
        );

        return {accessToken, refreshToken,  new: true};
        
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

