import { dbConnection } from "./connectionDB";
import {getRepository} from "typeorm";
import { Session } from "../entities/Session";
import { User } from "../entities/User";

export default class sessionDB{
    
    async addSession(user: User, token: string){
        const sesh = new Session();

        sesh.jwtToken = token;
        sesh.userId = user.userId;

        const sessionRepository = getRepository(Session);
        return await sessionRepository.save(sesh);
    }

    async getValidSessionsByUser(userID: number){
        const sessionRepository = getRepository(Session);
        return await sessionRepository.findOne({userId: userID, valid: true})
    }
}