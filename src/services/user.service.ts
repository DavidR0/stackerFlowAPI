import speakeasy from "speakeasy"
import log from "../logger";
import {UserDB} from "../db/user.DB";
import bcrypt from "bcrypt"
import config from "config"
import { User } from "../entities/User";
import lodash from "lodash";
import EmailService from "./email.service";

export class UserService{

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
                const uDB = new UserDB();
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
            return await new UserDB().getUser(requestedUser);
        }else{
            let rez : any = await new UserDB().getUser(requestedUser);
            rez = lodash.omit(rez, ['password', 'privateKey', 'twoFact']);
            return rez;
        }
    }

    async updateUserById(userToUpdate: User, userRequestingUpdate: User){
        const userdb = new UserDB();
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
                    userToUpdatedb.banned = userToUpdate.banned;
                    //If user is banned, send him an email
                    if(userToUpdatedb.banned){
                        const email = new EmailService();
                        await email.sendEmail(userToUpdatedb.email, "Account banned", "Your account at stackerflow has been banned!");
                        //await email.sendEmail("davidrusuyzf@gmail.com", "Account banned", "Your account has been banned");
                    }
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

            return await new UserDB().updateUser(userToUpdatedb);
        }

        throw new Error("User does not have access rights");
    }

    async deleteUserById(userToDelete: User, userRequestingDelete: User){

        const userdb = new UserDB();
        const userToDeletedb = await userdb.getUser(userToDelete);

        if(userToDeletedb == undefined){
            throw new Error("User does not exist");
        }

        if(userRequestingDelete.type =="Admin" || userRequestingDelete.userId == userToDelete.userId){
            return await new UserDB().deleteUser(userToDeletedb);
        }

        throw new Error("User does not have access rights");
    }

    async updateUserPoints(user: User, points: number){
        //get user from db
        const userToUpdatedb = await new UserDB().getUser({userId: user.userId});
        //updated userToUpdatedb points if user is found
        if(userToUpdatedb != undefined){
            userToUpdatedb.score = userToUpdatedb.score + points;
            return await new UserDB().updateUser(userToUpdatedb);
        }else{
            log.error("Failed to update user points, user not found");
        }
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