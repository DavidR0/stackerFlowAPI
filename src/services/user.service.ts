import { userDTO } from "../entities/User";
import speakeasy from "speakeasy"
import log from "../logger";
import userDB from "../db/user.DB";
import bcrypt from "bcrypt"
import config from "config"

export default class userService{
 
    async createUser(user: userDTO) {
        try{
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
        
        } catch(e: any){
            log.error(e);
            throw new Error(e);
        }
    };

    compareUserPassword(candidatePassword:string, user: userDTO){
        return bcrypt.compare(candidatePassword,user.password).catch((e)=>false);
    }

    
    toUserDTO(user: any): userDTO{
        //Check if mandatory items exists if not throw error
        if(!user.email && !user.password && !user.userName){
            log.error("Could not convert object to userDTO");
            throw new Error("Could not convert object to userDTO");
        }

        const userName = user.userName;
        const email = user.email;
        const password = user.password;

        //Check all the other optional items
        let userObj : userDTO = {
            userName,
            email,
            password,
        };

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