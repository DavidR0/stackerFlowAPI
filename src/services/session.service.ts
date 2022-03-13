import speakeasy from "speakeasy"
import { User} from "../entities/User";
import userDB from "../db/user.DB";
import bcrypt from "bcrypt"
import config from 'config'
import sessionDB from "../db/session.DB";
import log from "../logger";
import userService from "./user.service";
import { Session } from "../entities/Session";
import JwtService from "./jwt.service";
import UserService from "./user.service";

export default class SessionService{

    async getSession(session: Session, user: User){
        //Get the session
        const sessiondb = new sessionDB();
        const foundSession =  await sessiondb.getOneSession(session);

        //See if requesting user has the required rights
        if(foundSession){
            if(user.type === "Admin" ||  foundSession.userId == user.userId){
                return foundSession;
            }
        }else{
            return "Session not found";
        }
              
        throw new Error("User does not have access rights");  
    }

    async updateSession(session: Session, user: User){
        //Get the session
        const sessiondb = new sessionDB();
        const foundSession =  await sessiondb.getOneSession({id: session.id});

        if(foundSession){
            //See if requesting user has the required rights
            if(user.type === "Admin" ||  foundSession.userId == user.userId){

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

    async deleteSession(session: Session, user: User){
        //Get the session
        const sessiondb = new sessionDB();
        const foundSession =  await sessiondb.getOneSession(session);

        if(foundSession){
            //See if requesting user has the required rights
            if(user.type === "Admin" ||  foundSession?.userId == user.userId){
                return sessiondb.deleteSession(foundSession);
            }
        }else{
            return "Session not found";
        }

        throw new Error("User does not have access rights");
    }

    async createSession(user: User, token: {accessToken: string}){
        const session = new Session();
        session.userId = user.userId;
        session.jwtToken = token.accessToken;
        return new sessionDB().addSession(session);
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

        //If no existing valid Jwt Tokens, we create new access and session tokens
        const salt = new UserService().toUser(validUser);
        //Create access token
        const accessToken = new JwtService().signJwt(
            {...salt},
            {expiresIn: config.get('security.accessTokenTtl') }
        );

        //Create refresh token
        const refreshToken = new JwtService().signJwt(
            {...salt},
            {expiresIn: config.get('security.refreshTokenTtl') }
        );

        return {accessToken, refreshToken,  new: true};
        
    }

    toSession(sess: any){
        const session = new Session();

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

