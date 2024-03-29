import { getRepository } from "typeorm";
import { Vote } from "../entities/Vote";

export class VoteDB{
    
    async addVote(vote: Vote){
        const Repo = getRepository(Vote);
        return await Repo.save(vote);
    }

    async getVote(query: any){
        const Repo = getRepository(Vote);
        return await Repo.findOne(query);
    }

    async getVotes(query: any){
        const Repo = getRepository(Vote);
        return await Repo.find(query);
    }

    async updateVote(vote: Vote){
        const Repo = getRepository(Vote);
        return await Repo.save(vote);
    }

    async deleteVote(vote: Vote){
        const Repo = getRepository(Vote);
        return await Repo.delete(vote);
    }

}