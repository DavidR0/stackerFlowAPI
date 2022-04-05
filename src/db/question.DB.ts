import { getRepository } from "typeorm";
import { Question } from "../entities/Question";

export class QuestionDB{

    async addQuestion(question: Question){
        const questionRepo = getRepository(Question);
        return await questionRepo.save(question);
    }
    
    async getQuestion(query: any){
        const questionRepository = getRepository(Question);
        return await questionRepository.findOne(query);
    }

    async getQuestions(){
        const questionRepository = getRepository(Question);
        return await questionRepository.find({
            order: {
                creationTime: "DESC"
            },
        });
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