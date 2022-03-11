import { User } from "../entities/User";
import { dbConnection } from "./connectionDB";
import {getRepository} from "typeorm";

export default class UserDB{
    
    async addUser(user: User){
        //Get connection instance
        const db = dbConnection.getInstance();
        const connection = db.getDBConnection();
        return await connection.manager.save(user);
    }

    async getUser(query: any){
        const userRepository = getRepository(User);
        return await userRepository.findOne(query);
    }

    async updateUser(user: User){
        const userRepository = getRepository(User);
        return await userRepository.save(user);
    }

    async deleteUser(user: User){
        const userRepository = getRepository(User);
        return await userRepository.delete(user);
    }
}
