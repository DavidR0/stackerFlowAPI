import jwt from "jsonwebtoken";
import config from 'config'
import { userDTO } from "../entities/dto";
import userDB from "../db/user.DB";
import UserService from "../services/user.service";

export default class JwtService{

    async reIssueJwt(userId: number){
            
        //Get the user who holds the session token
        const user = await new userDB().getUser({userId: userId});
    
        if(user){
            const userSalt : userDTO = new UserService().toUserDTO(user);
    
            //Create session token
            const accessToken = this.signJwt(userSalt,
                {expiresIn: config.get('security.accessTokenTtl')
            });
        
            return accessToken;
        }
    }

    signJwt(object: Object, options?: jwt.SignOptions | undefined){
        const privateKey = config.get('security.privateKey') as string;
        return jwt.sign(object,privateKey,{
            ...(options && options),
            algorithm:"RS256"
        });
    }

    verifyJwt(token: string){
        const publicKey = config.get('security.publicKey') as string;

        try{
            const decoded = jwt.verify(token, publicKey); 
            return{
                valid: true,
                expired: false,
                decoded,
            }
        
        }catch(e: any){
            return{
                valid: false,
                expired: e.message === "jwt expired",
                decoded: null
            }
        }
    }    

    
}