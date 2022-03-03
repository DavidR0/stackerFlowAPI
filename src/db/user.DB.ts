import { User } from "../entities/User";
import { userDTO } from "../entities/User";
import { dbConnection } from "./connectionDB";

export default class userDB{
    
    async addUser(user: userDTO){
        //Get connection instance
        const db = dbConnection.getInstance();
        const connection = db.getDBConnection();
        const dbUser = new User();

        dbUser.userName = user.userName;
        dbUser.email = user.email;
        dbUser.password = user.password
    
        if(user.twoFact){
            dbUser.twoFact = user.twoFact;
        }
    
        if(user.type){
            dbUser.type = user.type;
        }

        await connection.manager.save(dbUser);
    }
}
