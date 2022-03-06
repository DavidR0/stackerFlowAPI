import {getRepository} from "typeorm";
import { Session, sessionDTO } from "../entities/Session";
import { User } from "../entities/User";

export default class sessionDB{
    
    async addSession(user: User, token: string){
        const sesh = new Session();

        sesh.jwtToken = token;
        sesh.userId = user.userId;

        const sessionRepository = getRepository(Session);
        return await sessionRepository.save(sesh);
    }

    async getSessions(query: object){
        const sessionRepository = getRepository(Session);
        return await sessionRepository.find(query);
    }

    async getOneSession(query: object){
        const sessionRepository = getRepository(Session);
        return await sessionRepository.findOne(query);
    }

    async updateSession(session: sessionDTO, findByQuery: object){
        const sessionRepository = getRepository(Session);
        const foundSession = await sessionRepository.findOne(findByQuery);

        if(foundSession){
            if(session.jwtToken){
                foundSession.jwtToken = session.jwtToken;
            }

            if(session.valid != undefined){
                foundSession.valid = session.valid;
            }

            await sessionRepository.save(foundSession);
        }else{
            throw new Error("Session does not exist");
        }

    }

    async deleteSession(findByQuery: object){
        const sessionRepository = getRepository(Session);
        await sessionRepository.delete(findByQuery);
    }

}