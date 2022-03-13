import AnswerDB from "../db/answer.DB";
import { Answer } from "../entities/Answer";
import { User } from "../entities/User";
import { questionDTO, userDTO } from "../entities/dto";

export default class AnswerService{
    private aDatabase = new AnswerDB();

    async createAnswer(answer: Answer, user: userDTO, question: questionDTO){
        if(user.userID){
            answer.userId = user.userID;
        }

        if(question.questionId){
            answer.questionId = question.questionId;
        }

        if(user.userName){
            answer.author = user.userName;
        }

        return await this.aDatabase.addAnswer(answer);
    }

    async getAnswer(answer: Answer, user: User){
        return await this.aDatabase.getAnswer(answer);
    }

    toAnswer(ans: any): Answer{
        const answer = new Answer();

        if(ans.author){
            answer.author = ans.author;
        }

        if(ans.content){
            answer.content = ans.content;
        }

        if(ans.questionId){
            answer.questionId = ans.questionId;
        }

        if(ans.voteCount){
            answer.voteCount = ans.voteCount;
        }

        if(ans.creationTime){
            answer.creationTime = ans.creationTime;
        }

        if(ans.answerId){
            answer.answerId = ans.answerId;
        }

        if(ans.userId){
            answer.userId = ans.userId;
        }

        return answer;
    }
}