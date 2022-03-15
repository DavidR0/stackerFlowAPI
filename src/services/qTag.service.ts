import {QTagDB} from "../db/QTag.DB";
import {QuestionDB} from "../db/question.DB";
import { QuestionTag } from "../entities/QuestionTag";
import { User } from "../entities/User";

export class QTagService{

    private tDataBase = new QTagDB();

    async createQTag(user:User, qtag: QuestionTag){
        const question = await new QuestionDB().getQuestion({questionId: qtag.questionId});

        //Only admin or question owner can add tags
        if(user.type =="Admin" || question?.userId == user.userId){
            return await this.tDataBase.addQTag(qtag);
        }

        throw new Error("User does not have access rights");
    }

    async getQTag(qtag: QuestionTag){
        return await this.tDataBase.getQTag(qtag);
    }

    async updateQTag(qtag: QuestionTag, user: User){
        const itemToUpdate = await this.tDataBase.getQTag({id: qtag.id});

        if(itemToUpdate == undefined){
            throw new Error("QTag does not exist");
        }
        
        if(user.type =="Admin"){

            if(qtag.questionId != undefined){
                itemToUpdate.questionId = qtag.questionId;
            }
            
            if(qtag.tagId != undefined){
                itemToUpdate.tagId = qtag.tagId;
            }

            return await this.tDataBase.updateQTag(itemToUpdate);
        }

        throw new Error("User does not have access rights");

    }

    async deleteQTag(qtag: QuestionTag, user: User){
        const itemToUpdate = await this.tDataBase.getQTag({id: qtag.id});

        if(itemToUpdate == undefined){
            throw new Error("QTag does not exist");
        }

        const question = await new QuestionDB().getQuestion({questionId: itemToUpdate.questionId});
        //Only admin or question owner can delete tags
        if(user.type =="Admin" || question?.userId == user.userId){
            return await this.tDataBase.deleteQTag(qtag);
        }

        throw new Error("User does not have access rights");
    }


    toQTag(obj: any): QuestionTag{
        const qtag = new QuestionTag();

        if(obj.tagId  != undefined){
            qtag.tagId = obj.tagId;
        }

        if(obj.questionId  != undefined){
            qtag.questionId = obj.questionId;
        }

        if(obj.id != undefined){
            qtag.id = obj.id;
        }

        return qtag;
    }
}