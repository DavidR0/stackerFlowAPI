import QuestionService from "../services/question.service"
import UserService from "../services/user.service";
import {Request, Response} from "express";
import log from "../logger";


export default class QuestionController{

    protected uService = new UserService();

    async createQuestionHandler(req: Request, res: Response){
        const qService = new QuestionService();

        const question = qService.toQuestionDTO(req.body);
        const user = new UserService().toUserDTO(res.locals.user);

        const rez = await qService.createQuestion(question, user);
        log.info("Successfully created question.")
        res.send(rez);
    }

    async getQuestionHandler(req: Request, res: Response){
        const qService = new QuestionService();
        const question = qService.toQuestionDTO(req.body);
        
        res.send(await qService.getQuestion(question));
    }

    async updateQuestionHandler(req: Request, res: Response){
        
    }

    async deleteQuestionHandler(req: Request, res: Response){
        const qService = new QuestionService();
        const question = qService.toQuestionDTO(req.body);
        const user = new UserService().toUserDTO(res.locals.user);

        try{
            const rez = await qService.deleteQuestion(question, user);
            log.info("Successfully deleted question.")
            res.send(rez);
        }catch(e: any){
            log.error(e)
            res.send(e.message);
        }
    }
}