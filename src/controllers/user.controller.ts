import {Request, Response} from "express";
import userService from "../services/user.service";
import {omit} from 'lodash'
import log from "../logger";


export default class userController{

    async createUserHandler(req: Request, res: Response){
        //transform to userDTO
        try{
            const uService = new userService();
            //Create the user object
            const user = uService.toUserDTO(req.body)
            //create user object in db
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
            //Get the user, userId is guaranteed by request validator middle ware
            const user = await uService.getUserById(req.body.userID);
            log.info("Successfully got user.")
            return res.send(user);

        }catch(e: any){
            log.error(e);
            return res.status(404).send(e.message);
        }
    }

    async updateUserHandler(req: Request, res: Response){
        const uService = new userService();
        const user = uService.toUserDTO(req.body);
        try{
            await uService.updateUserById(user);
            log.info("Successfully updated user.")
            return res.status(200).send("Successfully updated user.")
        }catch(e: any){
            log.error(e);
            return res.send(e.message);
        }
    }
}


