import {AnswerService} from "../services/answer.service";
import {QuestionService} from "../services/question.service"
import {UserService} from "../services/user.service";
import {Request, Response} from "express";
import log from "../logger";

export class AnswerController{
    async createAnswerHandler(req: Request, res: Response){
        const aService = new AnswerService();
        const answer = aService.toAnswer(req.body);
        const user = new UserService().toUser(res.locals.user);
        const question = new QuestionService().toQuestion(req.body);
        
        try{
            
            const rez = await aService.createAnswer(answer,user,question);
            log.info("Successfully created answer.")
            res.send(rez);
        } catch(e: any){
            log.error("Failed to create answer.")
            res.send(e.message);
        }
    }

    async getAnswerHandler(req: Request, res: Response){
        const aService = new AnswerService();
        const answer = aService.toAnswer(req.body);

        const rez = await aService.getAnswer(answer);
        res.send(rez);
    }

    async updateAnswerHandler(req: Request, res: Response){
        const aService = new AnswerService();
        const answer = aService.toAnswer(req.body);
        const user = new UserService().toUser(res.locals.user);

        try{
            const rez = await aService.updateAnswer(answer, user);
            log.info("Successfully updated answer.")
            res.send(rez);
        }catch(e: any){
            log.error(e)
            res.send(e.message);
        }
    }

    async deleteAnswerHandler(req: Request, res: Response){
        const aService = new AnswerService();
        const answer = aService.toAnswer(req.body);
        const user = new UserService().toUser(res.locals.user);

        try{
            const rez = await aService.deleteAnswer(answer, user);
            log.info("Successfully deleted answer.")
            res.send(rez);
        }catch(e: any){
            log.error(e)
            res.send(e.message);
        }
    }
}