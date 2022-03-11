import sessionService from "../services/session.service";
import {Request, Response} from "express";
import log from "../logger";
import userService from "../services/user.service";

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


        try{
            //Get access and session tokens
            const tokens = await sesService.getSessionTokens(validUser);

            //If new session tokens were created save them in db
            if(tokens.new){
                await sesService.createSession(validUser,tokens);
            }

            log.info("Successfully created session.")
            //Send created session tokens
            return res.status(200).send({userId: validUser.userId ,refreshToken: tokens.refreshToken,accessToken: tokens.accessToken}); 
        }catch(e: any){
            log.error(e);
            return res.send(e.message);
        }

    }

    async getSessionhandler(req: Request, res: Response){

        const user = new userService().toUserDTO(res.locals.user);
        const session = new sessionService().toSessionDTO(req.body);

        try{
            const sessions = await new sessionService().getSession(session, user);
            res.send(sessions);
        }catch(e: any){
            log.error(e);
            return res.status(404).send(e.message);
        }
    }

    async updateSessionHandler(req: Request, res: Response){

        const user = new userService().toUserDTO(res.locals.user);
        const sessionUpdate = new sessionService().toSessionDTO(req.body);
        
        try{
            const sessions = await new sessionService().updateSession(sessionUpdate, user);
            log.info("Successfuly updated session");
            res.send(sessions);
        }catch(e: any){
            log.error(e);
            return res.status(404).send(e.message);
        }
    }

    async deleteSessionHandler(req: Request, res: Response){

        const user = new userService().toUserDTO(res.locals.user);
        const sessionUpdate = new sessionService().toSessionDTO(req.body);
        
        try{
            const sessions = await new sessionService().deleteSession(sessionUpdate, user);
            log.info("Successfuly deleted session");
            res.send(sessions);
        }catch(e: any){
            log.error(e);
            return res.status(404).send(e.message);
        }
    }
}