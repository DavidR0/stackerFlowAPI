import { getRepository } from "typeorm";
import { QuestionTag } from "../entities/QuestionTag";

export class QTagDB{
    
    async addQTag(qtag: QuestionTag){
        const Repo = getRepository(QuestionTag);
        return await Repo.save(qtag);
    }

    async getQTag(query: any){
        const Repo = getRepository(QuestionTag);
        return await Repo.findOne(query);
    }

    async getQTags(query: any){
        const Repo = getRepository(QuestionTag);
        return await Repo.find({
            relations: ["tag"],
            where: query,
        });
    }

    async updateQTag(qtag: QuestionTag){
        const Repo = getRepository(QuestionTag);
        return await Repo.save(qtag);
    }

    async deleteQTag(qtag: QuestionTag){
        const Repo = getRepository(QuestionTag);
        return await Repo.delete(qtag);
    }

}