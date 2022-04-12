import { getRepository } from "typeorm";
import { Answer } from "../entities/Answer";
import { Question } from "../entities/Question";

export class AnswerDB{
    getQuestionAnswers(question: Question) {
        const answerRepo = getRepository(Answer);
        return answerRepo.find({where: {questionId: question.questionId}});
    }
    
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