import { userDTO } from "../entities/User";
import speakeasy from "speakeasy"
import log from "../logger";
import userDB from "../db/user.DB";
import bcrypt from "bcrypt"
import config from "config"

export default class userService{
 
    async createUser(user: userDTO) {
        try{
            if(user.password && user.email && user.userName){
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
                throw new Error("Password, Email and Username is needed.");
            }
        } catch(e: any){
            log.error(e);
            throw new Error(e);
        }
    };

    async getUserById(userID : number){
        const query = {
            userId: userID
        };
        const user = await new userDB().getUser(query);
        return user;
    }

    async updateUserById(user : userDTO){
        const query = {
            userId: user.userID
        };
        //Check if we are updating the password, if so hash it
        if(user.password){
            const salt = await bcrypt.genSalt(config.get('security.saltWorkFactor'));
            const hash = await bcrypt.hashSync(user.password,salt)  
            user.password = hash;
        }
        await new userDB().updateUser(user,query);
    }

    compareUserPassword(candidatePassword:string, user: userDTO){
        if(user.password){
            return bcrypt.compare(candidatePassword,user.password).catch((e)=>false);
        }
    }
    
    toUserDTO(user: any): userDTO{

        let userObj : userDTO = {};

        if(user.userName){
            userObj.userName = user.userName;
        }

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
            userObj.privateKey = user.privateKey;
        }
      
        return userObj;
    }

}