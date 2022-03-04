import { userDTO } from "../entities/User";
import speakeasy from "speakeasy"
import log from "../logger";
import userDB from "../db/user.DB";
import bcrypt from "bcrypt"
import config from "config"

export default class userService{
 
    async createUser(user: userDTO) {
        try{
            if(user.password){
                //Create two factor auth secret
                if(user.twoFact) {
                    const twoFactorAuthSecret = speakeasy.generateSecret();
                    user.privateKey = twoFactorAuthSecret.base32;    
                }

                //Hash the password
                const salt = await bcrypt.genSalt(config.get('security.saltWorkFactor'));
                const hash = await bcrypt.hashSync(user.password,salt)  
                user.password = hash;

                //Create the user
                const uDB = new userDB();
                await uDB.addUser(user);
            }else{
                throw new Error("Password is needed.");
            }
        } catch(e: any){
            log.error(e);
            throw new Error(e);
        }
    };

    async getUserById(userId : number){
        const query = {
            userId: userId
        };
        const user = await new userDB().getUser(query);
        return user;
    }

    compareUserPassword(candidatePassword:string, user: userDTO){
        if(user.password){
            return bcrypt.compare(candidatePassword,user.password).catch((e)=>false);
        }
    }
    
    toUserDTO(user: any): userDTO{
        //Check if mandatory items exists if not throw error
        if(!user.userName){
            log.error("Could not convert object to userDTO.");
            throw new Error("Could not convert object to userDTO.");
        }

        const userName = user.userName;

        //Check all the other optional items
        let userObj : userDTO = {
            userName,
        };

        if(user.password){
            userObj.password = user.password;
        }

        if(user.email){
            userObj.email = user.email;
        }

        if(user.userID){
            userObj.userID = user.userID;
        }
        
        if(user.type){
            userObj.type = user.type;
        }

        if(user.banned){
            userObj.banned = user.banned;
        }

        if(user.twoFact){
            userObj.twoFact = user.twoFact;
        }

        if(user.score){
            userObj.score = user.score;
        }

        if(user.privateKey){
            userObj.privateKey;
        }
      
        return userObj;
    }

}