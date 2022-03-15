import { User } from "../entities/User";
import {getRepository} from "typeorm";

export class UserDB{
    
    async addUser(user: User){
        const userRepository = getRepository(User);
        return await userRepository.save(user);
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
