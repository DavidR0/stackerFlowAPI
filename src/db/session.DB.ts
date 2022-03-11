import {getRepository} from "typeorm";
import { Session } from "../entities/Session";

export default class sessionDB{
    
    async addSession(session: Session){
        const sessionRepository = getRepository(Session);
        return await sessionRepository.save(session);
    }

    async getSessions(query: object){
        const sessionRepository = getRepository(Session);
        return await sessionRepository.find(query);
    }

    async getOneSession(query: object){
        const sessionRepository = getRepository(Session);
        return await sessionRepository.findOne(query);
    }

    async updateSession(session: Session){
        const sessionRepository = getRepository(Session);
        return await sessionRepository.save(session);
    }

    async deleteSession(findByQuery: object){
        const sessionRepository = getRepository(Session);
        await sessionRepository.delete(findByQuery);
    }

}