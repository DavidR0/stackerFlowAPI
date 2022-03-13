import {Request, Response} from "express";
import UserService from "../services/user.service";
import TagService from "../services/tag.service";
import log from "../logger";


export default class TagController{

    async createTagHandler(req: Request, res: Response){
        const tService = new TagService();
        const tag = tService.toTag(req.body);
        
        try{
            res.send(await tService.createTag(tag));
        }catch(e: any){
            log.error(e)
            res.send(e.message);
        }
    }

    async getTagHandler(req: Request, res: Response){
        const tService = new TagService();
        const tag = tService.toTag(req.body);

        res.send(await tService.getTag(tag));
    }

    async updateTagHandler(req: Request, res: Response){
        const tService = new TagService();
        const tag = tService.toTag(req.body);
        const user = new UserService().toUser(res.locals.user);

        try{
            const rez = await tService.updateTag(tag, user);
            log.info("Successfully updated tag.")
            res.send(rez);
        }catch(e: any){
            log.error(e)
            res.send(e.message);
        }
    }

    async deleteTagHandler(req: Request, res: Response){
        const tService = new TagService();
        const tag = tService.toTag(req.body);
        const user = new UserService().toUser(res.locals.user);

        try{
            const rez = await tService.deleteTag(tag, user);
            log.info("Successfully deleted tag.")
            res.send(rez);
        }catch(e: any){
            log.error(e)
            res.send(e.message);
        }
    }
}