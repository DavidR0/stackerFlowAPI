import {SessionService} from "../services/session.service";
import {Request, Response} from "express";
import log from "../logger";
import {UserService} from "../services/user.service";

export class SessionController{

    async createSessionHandler(req: Request, res: Response){
        const sService = new SessionService();

        //Email and password is given by validator
        const user = new UserService().toUser(req.body); 
        const rez = await sService.createSession(user,req.body.twoFactPin);
        res.status(rez.status).send(rez.payload);
 
    }

    async getSessionhandler(req: Request, res: Response){

        const user = new UserService().toUser(res.locals.user);
        const session = new SessionService().toSession(req.body);

        try{
            const sessions = await new SessionService().getSession(session, user);
            res.send(sessions);
        }catch(e: any){
            log.error(e);
            return res.status(404).send(e.message);
        }
    }

    async updateSessionHandler(req: Request, res: Response){

        const user = new UserService().toUser(res.locals.user);
        const sessionUpdate = new SessionService().toSession(req.body);
        
        try{
            const sessions = await new SessionService().updateSession(sessionUpdate, user);
            log.info("Successfuly updated session");
            res.send(sessions);
        }catch(e: any){
            log.error(e);
            return res.status(404).send(e.message);
        }
    }

    async deleteSessionHandler(req: Request, res: Response){

        const user = new UserService().toUser(res.locals.user);
        const sessionUpdate = new SessionService().toSession(req.body);
        
        try{
            const rez = await new SessionService().deleteSession(sessionUpdate, user);
            log.info("Successfuly deleted session");
            res.send(rez);
        }catch(e: any){
            log.error(e);
            return res.status(404).send(e.message);
        }
    }
}