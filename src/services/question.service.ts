import {QuestionDB} from "../db/question.DB";
import { Question } from "../entities/Question";
import { User } from "../entities/User";

export class QuestionService{

    private qDatabase = new QuestionDB();

    async createQuestion(question: Question, user: User){
        //Setting question info
        if(user.userName != undefined){
            question.author = user.userName;
        }

        if(user.userId != undefined){
            question.userId = user.userId;
        }

        return await this.qDatabase.addQuestion(question);
    }

    async getQuestion(question: Question){
        return await this.qDatabase.getQuestion(question);
    }

    async getQuestions(question: Question){
        return await this.qDatabase.getQuestions(question);
    }

    async updateQuestion(question: Question, user: User){
        const questionToUpdatedb = await this.qDatabase.getQuestion({questionId: question.questionId});

        if(questionToUpdatedb == undefined){
            throw new Error("Question does not exist");
        }

        if(user.type =="Admin" || user.userId == questionToUpdatedb.userId){

            if(question.title != undefined){
                questionToUpdatedb.title = question.title;
            }

            if(question.content != undefined){
                questionToUpdatedb.content = question.content;
            }

            if(question.voteCount != undefined){
                questionToUpdatedb.voteCount = question.voteCount;
            }

            return await this.qDatabase.updateQuestion(questionToUpdatedb);
        }

        throw new Error("User does not have access rights");
    }

    async deleteQuestion(question: Question, user: User){
        const questionToDeletedb = await this.getQuestion(question);

        if(questionToDeletedb == undefined){
            throw new Error("Question does not exist");
        }

        if(user.type =="Admin" || user.userId == questionToDeletedb.userId){
            return await this.qDatabase.deleteQuestion(questionToDeletedb);
        }

        throw new Error("User does not have access rights");

    } 

    toQuestion(question: any): Question{
       const questionObj = new Question(); 

       if(question.author != undefined){
           questionObj.author = question.author ;
       }

       if(question.content != undefined){
            questionObj.content = question.content;
        }

        if(question.creationTime != undefined){
            questionObj.creationTime = question.creationTime;
        }

        if(question.questionId != undefined){
            questionObj.questionId = question.questionId;
        }
    
        if(question.title != undefined){
            questionObj.title = question.title;
        }

        if(question.userId != undefined){
            questionObj.userId = question.userId;
        }

        if(question.voteCount != undefined){
            questionObj.voteCount = question.voteCount;
        }

       return questionObj;
    }
}