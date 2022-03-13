import {Request, Response, NextFunction } from "express";
import {get} from "lodash"
import log from "../logger";
import JwtService from "../services/jwt.service";


//NOTE: For auth 2.0, the client must send only the access token, only if the sent 
//token is invalid must the client then send the refresh token. If time available, a wraper 
//to this method must be made, using the client ID, to inject the refreshToken 
const deserializeUser = async (req : Request, res: Response, next: NextFunction) => {
    const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/,"");
    const refreshToken = get(req, "headers.x-refresh", "")
    const userId =  get(req, "headers.userid", "")

    if(!accessToken && !refreshToken ){ 
        log.info("User has invalid tokens.");
        return next();
    }

    if(userId == undefined){
        log.info("User has invalid userId.");
        return next();
    }

    ///Verify if user has a valid accessToken
    const accessRes =  new JwtService().verifyJwt(accessToken)
    //Valid accessToken
    if(accessRes.valid){
        const id = (<any>accessRes.decoded).userId; 
        if(id == userId){
            res.locals.user = accessRes.decoded;
            log.info("User has vaild access token.");
            return next();    
        }
    }
    //Access token is expired or token belongs to another user
    log.info("User has invaild access token.");
    

    //See if we can reissue a new access token bassed on the refresh token
    if(accessRes.expired && refreshToken){
        const refResult = new JwtService().verifyJwt(refreshToken)
        //TODO check if refresh token has been invalidated in the db
        if(!refResult.valid){
            log.info("User has invaild refresh token.");
            return next();
        }

        const id = (<any>refResult.decoded).userId;

        if(id == userId){
            //refresh token is valid, lets reissue a new access token
            const newAccessToken = await new JwtService().reIssueJwt(userId);
            if(newAccessToken){
                res.setHeader('x-access-token', newAccessToken);
                res.locals.user = new JwtService().verifyJwt(newAccessToken).decoded; 
                log.info("Reissued user vaild access token.");  
                return next();
            }
        }
        log.info("User is using wrong id");  
    }
    return next();
};

export default deserializeUser;



