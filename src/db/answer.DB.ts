import { getRepository } from "typeorm";
import { Answer } from "../entities/Answer";

export default class AnswerDB{
    
    async addAnswer(answer: Answer){
        const answerRepo = getRepository(Answer);
        return await answerRepo.save(answer);
    }

    async getAnswer(answer: Answer){
        const answerRepo = getRepository(Answer);
        return await answerRepo.findOne(answer);
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