import QuestionDB from "../db/question.DB";
import { questionDTO, userDTO } from "../entities/dto";
import { Question } from "../entities/Question";

export default class QuestionService{

    private qDatabase = new QuestionDB();

    async createQuestion(question: questionDTO, user: userDTO){

        const questionDBObj = new Question();

        //Setting question info
        if(user.userName != undefined){
            questionDBObj.author = user.userName;
        }

        if(question.content != undefined){
            questionDBObj.content = question.content;
        }

        if(question.title != undefined){
            questionDBObj.title = question.title;
        }

        if(user.userID != undefined){
            questionDBObj.userId = user.userID;
        }

        return await this.qDatabase.addQuestion(questionDBObj);
    }

    async getQuestion(question: questionDTO){
        return await new QuestionDB().getQuestion({questionId: question.questionId});
    }

    async deleteQuestion(question: questionDTO, user: userDTO){

        const questiondb = new QuestionDB();
        const questionToDeletedb = await this.getQuestion(question);

        if(questionToDeletedb == undefined){
            throw new Error("Question does not exist");
        }

        if(user.type =="Admin" || user.userID == questionToDeletedb.userId){
            return await questiondb.deleteQuestion(questionToDeletedb);
        }

        throw new Error("User does not have access rights");

    } 

    toQuestionDTO(question: any): questionDTO{
       const questionObj : questionDTO = {}; 

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