import { getRepository } from "typeorm";
import { Answer } from "../entities/Answer";

export class AnswerDB{
    
    async addAnswer(answer: Answer){
        const answerRepo = getRepository(Answer);
        return await answerRepo.save(answer);
    }

    async getAnswer(query: any){
        const answerRepo = getRepository(Answer);
        return await answerRepo.findOne(query);
    }

    async updateAnswer(answer: Answer){
        const answerRepo = getRepository(Answer);
        return await answerRepo.save(answer);
    }

    async deleteAnswer(answer: Answer){
        const answerRepo = getRepository(Answer);
        return await answerRepo.delete(answer);
    }

}