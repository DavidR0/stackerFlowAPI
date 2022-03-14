import VoteDB from "../db/vote.DB";
import { Vote } from "../entities/Vote";
import { User } from "../entities/User";

export default class VoteService{

    private vDataBase = new VoteDB();

    async createVote(vote: Vote, user: User){
        vote.userId = user.userId;
        return await this.vDataBase.addVote(vote);
    }

    async getVote(vote: Vote){
        return await this.vDataBase.getVote(vote);
    }

    async updateVote(vote: Vote, user: User){
        const itemToUpdate = await this.vDataBase.getVote({voteId: vote.voteId});

        if(itemToUpdate == undefined){
            throw new Error("Vote does not exist");
        }

        if(user.type =="Admin" || vote.userId == user.userId){

            if(vote.itemType != undefined){
                itemToUpdate.itemType = vote.itemType;
            }
            if(vote.voteType != undefined){
                itemToUpdate.voteType = vote.voteType;
            }
            if(vote.userId != undefined){
                itemToUpdate.userId = vote.userId;
            }
            if(vote.itemId != undefined){
                itemToUpdate.itemId = vote.itemId;
            }
            
            return await this.vDataBase.updateVote(itemToUpdate);
        }

        throw new Error("User does not have access rights");

    }

    async deleteVote(vote: Vote, user: User){
        const itemToDelete = await this.vDataBase.getVote({voteId: vote.voteId});

        if(itemToDelete == undefined){
            throw new Error("Vote does not exist");
        }

        if(user.type =="Admin" || vote.userId == user.userId){
            return await this.vDataBase.deleteVote(itemToDelete);
        }

        throw new Error("User does not have access rights");
    }


    toVote(obj: any): Vote{
        const vote = new Vote();

        if(obj.itemId  != undefined){
            vote.itemId = obj.itemId;
        }

        if(obj.itemType != undefined){
            vote.itemType = obj.itemType;
        }

        if(obj.userId != undefined){
            vote.userId = obj.userId;
        }

        if(obj.voteId != undefined){
            vote.voteId = obj.voteId;
        }

        if(obj.voteType != undefined){
            vote.voteType = obj.voteType;
        }

        return vote;
    }
}