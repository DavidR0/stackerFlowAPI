import {AnswerDB} from "../db/answer.DB";
import { Answer } from "../entities/Answer";
import { Question } from "../entities/Question";
import { User } from "../entities/User";

export class AnswerService{
    private aDatabase = new AnswerDB();

    async createAnswer(answer: Answer, user: User, question: Question){
        answer.userId = user.userId;
        answer.questionId = question.questionId;
        answer.author = user.userName;

        return await this.aDatabase.addAnswer(answer);
    }

    async getAnswer(answer: Answer){
        return await this.aDatabase.getAnswer(answer);
    }

    async getQuestionAnswers(answer: Question) {
        return await this.aDatabase.getQuestionAnswers(answer);
    }

    async updateAnswer(answer: Answer, user: User){
        const answerToUpdatedb = await this.aDatabase.getAnswer({answerId: answer.answerId});

        if(answerToUpdatedb == undefined){
            throw new Error("Answer does not exist");
        }

        if(user.type =="Admin" || user.userId == answerToUpdatedb.userId){

            if(answer.content != undefined){
                answerToUpdatedb.content = answer.content;
            }

            if(answer.voteCount != undefined){
                answerToUpdatedb.voteCount = answer.voteCount;
            }

            return await this.aDatabase.updateAnswer(answerToUpdatedb);
        }

        throw new Error("User does not have access rights");
    }

    async deleteAnswer(answer: Answer, user: User){
        const answerToDeletedb = await this.aDatabase.getAnswer(answer);

        if(answerToDeletedb == undefined){
            throw new Error("Answer does not exist");
        }

        if(user.type =="Admin" || user.userId == answerToDeletedb.userId){
            return await this.aDatabase.deleteAnswer(answerToDeletedb);
        }

        throw new Error("User does not have access rights");
    }

    async updateAnswerPoints(item: Answer, points: number) {
        //get item from db
        const itemToUpdate = await this.aDatabase.getAnswer(item);
        if (itemToUpdate != undefined) {
            //Update item points and save to db
            itemToUpdate.voteCount += points;
            return await this.aDatabase.updateAnswer(itemToUpdate);
        }
    } 

    toAnswer(ans: any): Answer{
        let answer = new Answer();

        if(ans.author != undefined){
            answer.author = ans.author;
        }

        if(ans.content != undefined){
            answer.content = ans.content;
        }

        if(ans.questionId != undefined){
            answer.questionId = ans.questionId;
        }

        if(ans.voteCount != undefined){
            answer.voteCount = ans.voteCount;
        }

        if(ans.creationTime != undefined){
            answer.creationTime = ans.creationTime;
        }

        if(ans.answerId != undefined){
            answer.answerId = ans.answerId;
        }

        if(ans.userId != undefined){
            answer.userId = ans.userId;
        }

        return answer;
    }
}