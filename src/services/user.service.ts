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

    async getUserById(requestedUser: userDTO, requestingUser: userDTO){
        if(requestingUser.type =="Admin" || requestedUser.userID == requestingUser.userID){
            const query = {
                userId: requestedUser.userID
            };
            const user = await new userDB().getUser(query);
            return user;        
        }

        throw new Error("User does not have access rights");
    }

    async updateUserById(userToUpdate: userDTO, userRequestingUpdate: userDTO){
        if(userRequestingUpdate.type =="Admin" || userRequestingUpdate.userID == userToUpdate.userID){
            const query = {
                userId: userToUpdate.userID
            };
            //Check if we are updating the password, if so hash it
            if(userToUpdate.password){
                const salt = await bcrypt.genSalt(config.get('security.saltWorkFactor'));
                const hash = await bcrypt.hashSync(userToUpdate.password,salt)  
                userToUpdate.password = hash;
            }

            //If user is not an admin, he cannot change certain items like admin or ban status
            if(userRequestingUpdate.type != 'Admin'){
                delete userToUpdate.type;
                delete userToUpdate.banned
            }

            return await new userDB().updateUser(userToUpdate,query);
        }

        throw new Error("User does not have access rights");

    }
    
    toUserDTO(user: any): userDTO{

        let userObj : userDTO = {};

        if(user.userName != undefined){
            userObj.userName = user.userName;
        }

        if(user.password != undefined){
            userObj.password = user.password;
        }

        if(user.email != undefined){
            userObj.email = user.email;
        }

        if(user.userID != undefined){
            userObj.userID = user.userID;
        }
        
        if(user.userId != undefined){
            userObj.userID = user.userId;
        }

        if(user.type != undefined){
            userObj.type = user.type;
        }

        if(user.banned != undefined){
            userObj.banned = user.banned;
        }

        if(user.twoFact != undefined){
            userObj.twoFact = user.twoFact;
        }

        if(user.score != undefined){
            userObj.score = user.score;
        }

        if(user.privateKey != undefined){
            userObj.privateKey = user.privateKey;
        }
      
        return userObj;
    }

}