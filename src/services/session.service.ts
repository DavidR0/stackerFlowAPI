import speakeasy from "speakeasy"
import { User, userDTO } from "../entities/User";
import { omit } from 'lodash';
import userDB from "../db/user.DB";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import config from 'config'
import sessionDB from "../db/session.DB";

export default class sessionService{
    validateTwoFactAuth(user: User, pin : string){
        //User does not have twoFact enabled
        if(!user.twoFact){
            return true;
        }

        if(user.twoFact && user.privateKey){
        
            const userSecretKey = user.privateKey;

            const verified = speakeasy.totp.verify({
                secret: userSecretKey,
                encoding: 'base32',
                token: pin,
                window: 0
            });
            return verified;
        }
        
        return false; 
    }

    async validateUser({email, password} : {email : string, password: string}){
        //Find the user, by email
        const query = {
            email
        };
        const user = await new userDB().getUser(query);

        //If user does not exist
        if(!user){
            return false;
        }
        //Validate user login password 
        const isValid = await this.compareUserPassword(password, user.password);
        //Wrong login password
        if(!isValid){
            return false;
        }
        //User successfully validated, return a user object 
        return user;// omit(user,"password");
    }

    async compareUserPassword(candidatePassword:string, userPassword: string){
        return bcrypt.compare(candidatePassword,userPassword).catch((e)=>false);
    }

    signJwt(object: Object, options?: jwt.SignOptions | undefined){
        const privateKey = config.get('security.privateKey') as string;
        return jwt.sign(object,privateKey,{
            ...(options && options),
            algorithm:"RS256"
        });
    }


    async getSessionTokens(validUser : User){
        //Check if valid session exists
        let vSesh = await new sessionDB().getValidSessionsByUser(validUser.userId);

        //Return valid session tokens
        if(vSesh){
            return{refreshToken: vSesh.jwtToken, accessToken:"", new: false};
        }else{
            //Create access and session tokens
            //Create access token
            const accessToken = this.signJwt({...validUser},
                {expiresIn: config.get('security.accessTokenTtl') }
            );

            //Create refresh token
            const refreshToken = this.signJwt({...validUser},
                {expiresIn: config.get('security.refreshTokenTtl') }
            );

            return {accessToken, refreshToken,  new: true};
        }
    }

    async createSession(user: User,token: {refreshToken: string}){
        return new sessionDB().addSession(user,token.refreshToken);
    }

}
