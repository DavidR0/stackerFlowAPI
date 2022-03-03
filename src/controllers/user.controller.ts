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

            log.info("Successfully created user")
            return res.send(omit(user,"password"));

        }catch(e: any){
            return res.status(409).send(e.message);
        }
    }
}


