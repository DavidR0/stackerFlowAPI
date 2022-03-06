import { User } from "../entities/User";
import { userDTO } from "../entities/User";
import { dbConnection } from "./connectionDB";
import {getRepository} from "typeorm";

export default class userDB{
    
    async addUser(user: userDTO){
        //Get connection instance
        const db = dbConnection.getInstance();
        const connection = db.getDBConnection();
        const dbUser = new User();


        if(user.email && user.password && user.userName){
            dbUser.email = user.email;
            dbUser.password = user.password
            dbUser.userName = user.userName;
        }else{
            throw new Error("Cannot create user, password, email and username required");
        }
    
        if(user.twoFact){
            dbUser.twoFact = user.twoFact;
        }
    
        if(user.type){
            dbUser.type = user.type;
        }

        await connection.manager.save(dbUser);
    }

    async getUser(query: any){
        const userRepository = getRepository(User);
        const foundUser = await userRepository.findOne(query);
        return foundUser;
    }

    async updateUser(user: userDTO, findByQuery: any){
        const userRepository = getRepository(User);
        const foundUser = await userRepository.findOne(findByQuery);
        console.log(findByQuery);

        if(foundUser){

            //Set values that require updating                       
            if(user.password){
                foundUser.password = user.password;
            }
    
            if(user.email){
                foundUser.email = user.email;
            }
                
            if(user.type){
                foundUser.type = user.type;
            }
    
            if(user.banned){
                foundUser.banned = user.banned;
            }
    
            if(user.twoFact){
                foundUser.twoFact = user.twoFact;
            }
    
            if(user.score){
                foundUser.score = user.score;
            }
    
            if(user.privateKey){
                foundUser.privateKey = user.privateKey;
            }           

            await userRepository.save(foundUser);

        }else{
            throw new Error("User does not exist");
        }
    }

    //TODO Delete User
}
