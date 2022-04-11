import { getRepository } from "typeorm";
import { Tag } from "../entities/Tag";

export class TagDB{
    
    async addTag(tag: Tag){
        //Check if tag exists
        const Repo = getRepository(Tag);
        const rez = await Repo.findOne(tag);
        if(rez) return rez;
        //If not add it
        return await Repo.save(tag);
    }

    async getTag(query: any){
        const Repo = getRepository(Tag);
        return await Repo.findOne(query);
    }

    async updateTag(tag: Tag){
        const Repo = getRepository(Tag);
        return await Repo.save(tag);
    }

    async deleteTag(tag: Tag){
        const Repo = getRepository(Tag);
        return await Repo.delete(tag);
    }

}