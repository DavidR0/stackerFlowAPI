import { getRepository } from "typeorm";
import { Question } from "../entities/Question";

export default class QuestionDB{

    async addQuestion(question: Question){
        const questionRepo = getRepository(Question);
        return await questionRepo.save(question);
    }
    
    async getQuestion(query: any){
        const questionRepository = getRepository(Question);
        return await questionRepository.findOne(query);
    }

    async updateQuestion(question: Question){
        const questionRepo = getRepository(Question);
        return await questionRepo.save(question);
    }

    async deleteQuestion(question: Question){
        const questionRepo = getRepository(Question);
        return await questionRepo.delete(question);
    }

}