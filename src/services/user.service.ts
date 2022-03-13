import speakeasy from "speakeasy"
import log from "../logger";
import userDB from "../db/user.DB";
import bcrypt from "bcrypt"
import config from "config"
import { User } from "../entities/User";

export default class UserService{
 
    async createUser(user: User) {
        try{
            if(user.password && user.email && user.userName){
                //Create two factor auth secret
                if(user.twoFact) {
                    const twoFactorAuthSecret = speakeasy.generateSecret();
                    user.privateKey = twoFactorAuthSecret.base32;  
                    user.twoFact = true;  
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

    async getUserById(requestedUser: User, requestingUser: User){
        if(requestingUser.type =="Admin" || requestedUser.userId == requestingUser.userId){
            return await new userDB().getUser(requestedUser);
        }

        throw new Error("User does not have access rights");
    }

    async updateUserById(userToUpdate: User, userRequestingUpdate: User){
        const userdb = new userDB();
        const userToUpdatedb = await userdb.getUser({userId: userToUpdate.userId});

        if(userToUpdatedb == undefined){
            throw new Error("User does not exist");
        }

        if(userRequestingUpdate.type =="Admin" || userRequestingUpdate.userId == userToUpdate.userId){

            //Check if we are updating the password, if so hash it
            if(userToUpdate.password){
                const salt = await bcrypt.genSalt(config.get('security.saltWorkFactor'));
                const hash = await bcrypt.hashSync(userToUpdate.password,salt)  
                userToUpdatedb.password = hash;
            }

            //If user is not an admin, he cannot change certain items like admin or ban status
            if(userRequestingUpdate.type == 'Admin'){
                if(userToUpdate.type != undefined){
                    userToUpdatedb.type = userToUpdate.type;
                }

                if(userToUpdate.banned != undefined){
                    userToUpdatedb.banned =  userToUpdate.banned;
                }

                if(userToUpdate.score != undefined){
                    userToUpdatedb.score = userToUpdate.score;
                }
            }

            if(userToUpdate.email != undefined){
                userToUpdatedb.email = userToUpdate.email;
            }
            
            if(userToUpdate.privateKey != undefined){
                userToUpdatedb.privateKey = userToUpdate.privateKey;
            }

            if(userToUpdate.twoFact != undefined){
                userToUpdatedb.twoFact = userToUpdate.twoFact;
            }

            return await new userDB().updateUser(userToUpdatedb);
        }

        throw new Error("User does not have access rights");
    }

    async deleteUserById(userToDelete: User, userRequestingDelete: User){

        const userdb = new userDB();
        const userToDeletedb = await userdb.getUser(userToDelete);

        if(userToDeletedb == undefined){
            throw new Error("User does not exist");
        }

        if(userRequestingDelete.type =="Admin" || userRequestingDelete.userId == userToDelete.userId){
            return await new userDB().deleteUser(userToDeletedb);
        }

        throw new Error("User does not have access rights");
    }
    
    toUser(user: any): User{

        let userObj = new User();

        if(user.userName != undefined){
            userObj.userName = user.userName;
        }

        if(user.password != undefined){
            userObj.password = user.password;
        }

        if(user.email != undefined){
            userObj.email = user.email;
        }
        
        if(user.userId != undefined){
            userObj.userId = user.userId;
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