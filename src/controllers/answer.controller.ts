import AnswerService from "../services/answer.service";
import QuestionService from "../services/question.service"
import UserService from "../services/user.service";
import {Request, Response} from "express";
import log from "../logger";

export default class AnswerController{
    async createAnswerHandler(req: Request, res: Response){
        const aService = new AnswerService();
        const answer = aService.toAnswer(req.body);
        const user = new UserService().toUserDTO(res.locals.user);
        const question = new QuestionService().toQuestionDTO(req.body);
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
        const user = new UserService().toUserDTO(res.locals.user);

        //const rez = await aService.getAnswer(answer, user);
        //res.send(rez);

    }

    async updateAnswerHandler(req: Request, res: Response){
        res.send();
    }

    async deleteAnswerHandler(req: Request, res: Response){
        res.send();
    }
}