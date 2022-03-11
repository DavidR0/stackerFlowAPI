import { userDTO } from "../entities/dto";
import speakeasy from "speakeasy"
import log from "../logger";
import userDB from "../db/user.DB";
import bcrypt from "bcrypt"
import config from "config"
import { User } from "../entities/User";



export default class UserService{
 
    async createUser(user: userDTO) {
        try{
            if(user.password && user.email && user.userName){
                const userDbObj = new User();
                userDbObj.email = user.email;
                userDbObj.userName = user.userName;
                //Create two factor auth secret
                if(user.twoFact) {
                    const twoFactorAuthSecret = speakeasy.generateSecret();
                    userDbObj.privateKey = twoFactorAuthSecret.base32;  
                    userDbObj.twoFact = true;  
                }

                if(user.type != undefined){
                    userDbObj.type = user.type;
                }

                //Hash the password
                const salt = await bcrypt.genSalt(config.get('security.saltWorkFactor'));
                const hash = await bcrypt.hashSync(user.password,salt)  
                userDbObj.password = hash;

                //Create the user
                const uDB = new userDB();
                await uDB.addUser(userDbObj);
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
        const userdb = new userDB();
        const userToUpdatedb = await userdb.getUser({userId: userToUpdate.userID});

        if(userToUpdatedb == undefined){
            throw new Error("User does not exist");
        }

        if(userRequestingUpdate.type =="Admin" || userRequestingUpdate.userID == userToUpdate.userID){

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

    async deleteUserById(userToDelete: userDTO, userRequestingDelete: userDTO){

        const userdb = new userDB();
        const userToDeletedb = await userdb.getUser({userId: userToDelete.userID});

        if(userToDeletedb == undefined){
            throw new Error("User does not exist");
        }

        if(userRequestingDelete.type =="Admin" || userRequestingDelete.userID == userToDelete.userID){
            return await new userDB().deleteUser(userToDeletedb);
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