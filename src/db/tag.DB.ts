import { getRepository } from "typeorm";
import { Tag } from "../entities/Tag";

export default class TagDB{
    
    async addTag(tag: Tag){
        const Repo = getRepository(Tag);
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