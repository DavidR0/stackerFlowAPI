import {Request, Response} from "express";
import {UserService} from "../services/user.service";
import log from "../logger";
import {VoteService} from "../services/vote.service";

export class VoteController{

    async createVoteHandler(req: Request, res: Response){
        const vService = new VoteService();
        const vote = vService.toVote(req.body);
        const user = new UserService().toUser(res.locals.user);

        try{
            res.send(await vService.createVote(vote,user));
        }catch(e: any){
            log.error(e)
            res.send(e.message);
        }
    }

    async getVoteHandler(req: Request, res: Response){
        const vService = new VoteService();
        const vote = vService.toVote(req.body);

        res.send(await vService.getVote(vote));
    }

    async updateVoteHandler(req: Request, res: Response){
        const vService = new VoteService();
        const vote = vService.toVote(req.body);
        const user = new UserService().toUser(res.locals.user);

        try{
            const rez = await vService.updateVote(vote, user);
            log.info("Successfully updated vote.")
            res.send(rez);
        }catch(e: any){
            log.error(e)
            res.send(e.message);
        }
    }

    async deleteVoteHandler(req: Request, res: Response){
        const vService = new VoteService();
        const vote = vService.toVote(req.body);
        const user = new UserService().toUser(res.locals.user);

        try{
            const rez = await vService.deleteVote(vote, user);
            log.info("Successfully deleted vote.")
            res.send(rez);
        }catch(e: any){
            log.error(e)
            res.send(e.message);
        }
    }
}