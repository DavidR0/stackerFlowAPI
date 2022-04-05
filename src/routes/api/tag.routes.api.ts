import express from "express";
import validate from "../../middleWare/requestValidator";
import requireUser from "../../middleWare/requireUser";
import {TagSchema} from "../../schema/tag.schema";
import {TagController} from "../../controllers/tag.controller";

const tagRouter = express.Router();

const tagCtrl = new TagController();
const tagSchema = new TagSchema();

tagRouter.post("/create",[validate(tagSchema.createTagSchema)],tagCtrl.createTagHandler);
tagRouter.get("/get",[validate(tagSchema.getUpdateDeleteTagSchema)],tagCtrl.getTagHandler);
tagRouter.patch("/update",[validate(tagSchema.getUpdateDeleteTagSchema)],tagCtrl.updateTagHandler);
tagRouter.delete("/delete",[validate(tagSchema.getUpdateDeleteTagSchema)],tagCtrl.deleteTagHandler);

export default tagRouter;
