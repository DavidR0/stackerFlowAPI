import {Request, Response} from "express";
import QTagService from "../services/qTag.service";
import log from "../logger";
import UserService from "../services/user.service";

export default class QuestionTagController{
    async createQTagHandler(req: Request, res: Response){
        const tService = new QTagService();
        const qtag = tService.toQTag(req.body);
        
        try{
            res.send(await tService.createQTag(qtag));
        }catch(e: any){
            log.error(e)
            res.send(e.message);
        }
    }

    async getQTagHandler(req: Request, res: Response){
        const tService = new QTagService();
        const qtag = tService.toQTag(req.body);

        res.send(await tService.getQTag(qtag));
    }

    async updateQTagHandler(req: Request, res: Response){
        const tService = new QTagService();
        const tag = tService.toQTag(req.body);
        const user = new UserService().toUser(res.locals.user);

        try{
            const rez = await tService.updateQTag(tag, user);
            log.info("Successfully updated qtag.")
            res.send(rez);
        }catch(e: any){
            log.error(e)
            res.send(e.message);
        }
    }

    async deleteQTagHandler(req: Request, res: Response){
        const tService = new QTagService();
        const tag = tService.toQTag(req.body);
        const user = new UserService().toUser(res.locals.user);

        try{
            const rez = await tService.deleteQTag(tag, user);
            log.info("Successfully deleted qtag.")
            res.send(rez);
        }catch(e: any){
            log.error(e)
            res.send(e.message);
        }

    }
}