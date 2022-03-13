import {Request, Response} from "express";
import userService from "../services/user.service";
import {omit} from 'lodash'
import log from "../logger";


export default class UserController{

    async createUserHandler(req: Request, res: Response){
        try{
            const uService = new userService();
            const user = uService.toUser(req.body)

            await uService.createUser(user);
            log.info("Successfully created user.")
            return res.send(omit(user,"password"));

        }catch(e: any){
            log.error(e);
            return res.status(409).send(e.message);
        }
    }

    async getUserHandler(req: Request, res: Response){
        try{

            const uService = new userService();
            const requestingUser = uService.toUser(res.locals.user);
            const requestedUser = uService.toUser(req.body);

            const user = await uService.getUserById(requestedUser,requestingUser);
            log.info("Successfully got user.")
            return res.send(user);

        }catch(e: any){
            log.error(e);
            return res.status(404).send(e.message);
        }
    }

    async updateUserHandler(req: Request, res: Response){
            const uService = new userService();
            const userRequestingUpdate = uService.toUser(res.locals.user);
            //We have the userId due to validator
            const userToUpdate = uService.toUser(req.body);
        try{
            await uService.updateUserById(userToUpdate,userRequestingUpdate);
            log.info("Successfully updated user.")
            return res.status(200).send("Successfully updated user.")
        }catch(e: any){
            log.error(e);
            return res.send(e.message);
        }
    }

    async deleteUserHandler(req: Request, res: Response){
        try{

            const uService = new userService();
            const requestingUser = uService.toUser(res.locals.user);
            const requestedUser = uService.toUser(req.body);

            const rez = await uService.deleteUserById(requestedUser,requestingUser);
            log.info("Successfully deleted user.")
            return res.send(rez);

        }catch(e: any){
            log.error(e);
            return res.status(404).send(e.message);
        }
    }
}


