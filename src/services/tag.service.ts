import {TagDB} from "../db/tag.DB";
import { Tag } from "../entities/Tag";
import { User } from "../entities/User";

export class TagService{

    private tDataBase = new TagDB();

    async createTag(tag: Tag){
        return await this.tDataBase.addTag(tag);
    }

    async getTag(tag: Tag){
        return await this.tDataBase.getTag(tag);
    }

    async updateTag(tag: Tag, user: User){
        const itemToUpdate = await this.tDataBase.getTag({tagId: tag.tagId});

        if(itemToUpdate == undefined){
            throw new Error("Tag does not exist");
        }

        if(user.type =="Admin"){
            if(tag.tag != undefined){
                itemToUpdate.tag = tag.tag;
            }
            
            return await this.tDataBase.updateTag(itemToUpdate);
        }

        throw new Error("User does not have access rights");

    }

    async deleteTag(tag: Tag, user: User){

        if(user.type =="Admin"){
            return await this.tDataBase.deleteTag(tag);
        }

        throw new Error("User does not have access rights");
    }


    toTag(obj: any): Tag{
        const tag = new Tag();

        if(obj.tagId  != undefined){
            tag.tagId = obj.tagId;
        }

        if(obj.tag != undefined){
            tag.tag = obj.tag;
        }

        return tag;
    }
}