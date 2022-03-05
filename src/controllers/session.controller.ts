import sessionService from "../services/session.service";
import {Request, Response} from "express";
import log from "../logger";
export default class sessionController{

    async createSessionHandler(req: Request, res: Response){
        const sesService = new sessionService();

        //Email and password is given by validator
        const user = {email: req.body.email, password: req.body.password}

        //See if valid user exists with the given login info
        const validUser = await sesService.validateUser(user);

        //If user is invalid, not found or wrong email/password
        if(!validUser){
            log.error("Login information invalid.");
            return res.status(401).send("Login information invalid.");
        }

        //Check if user is banned
        if(validUser.banned){
            log.error("User is banned.");
            return res.status(403).send("User is banned.");  
        }
        
        //TwoFactor Auth check
        if(!sesService.validateTwoFactAuth(validUser, req.body.pin)){
            log.error("Two factor authentication failed");
            return res.status(401).send("Two factor authentication failed");
        }

        //Get access and session tokens
        const tokens = await sesService.getSessionTokens(validUser);
        //If new session tokens were created save them in db
        if(tokens.new){
            try{
                await sesService.createSession(validUser,tokens);
            }catch(e: any){
                log.error(e);
                return res.send(e.message);
            }
        }

        log.info("Successfully created session.")
        //Send created session tokens
        return res.send({refreshToken: tokens.refreshToken,accessToken: tokens.accessToken}); 
    }

}