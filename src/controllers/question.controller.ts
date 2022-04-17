import {QuestionService} from "../services/question.service"
import {UserService} from "../services/user.service";
import {Request, Response} from "express";
import log from "../logger";


export class QuestionController{

    protected uService = new UserService();

    async createQuestionHandler(req: Request, res: Response){
        const qService = new QuestionService();

        const question = qService.toQuestion(req.body);
        const user = new UserService().toUser(res.locals.user);
        try{
            const rez = await qService.createQuestion(question, user);
            log.info("Successfully created question.")
            res.send(rez);
    
        }catch(e: any){
            log.error("Failed to create question.")
            res.send(e.message);
        }
    }

    async getQuestionHandler(req: Request, res: Response){
        const qService = new QuestionService();
        const question = qService.toQuestion(req.body);
        log.info("Successfully got question.")
        res.send(await qService.getQuestion(question));
    }

    async getQuestionsHandler(req: Request, res: Response){
        const qService = new QuestionService();        
        res.send(await qService.getQuestions());
    }


    async updateQuestionHandler(req: Request, res: Response){
        const qService = new QuestionService();
        const question = qService.toQuestion(req.body);
        const user = new UserService().toUser(res.locals.user);

        try{
            const rez = await qService.updateQuestion(question, user);
            log.info("Successfully updated question.")
            res.send(rez);
        }catch(e: any){
            log.error(e)
            res.send(e.message);
        }
    }

    async deleteQuestionHandler(req: Request, res: Response){
        const qService = new QuestionService();
        const question = qService.toQuestion(req.body);
        const user = new UserService().toUser(res.locals.user);

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