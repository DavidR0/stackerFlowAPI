import express from "express";
import validate from "../../middleWare/requestValidator";
import requireUser from "../../middleWare/requireUser";
import {QTagSchema} from "../../schema/qTag.schema";
import {QuestionTagController} from "../../controllers/qTag.controller";

const qTagRouter = express.Router();

const qtagCtrl = new QuestionTagController();
const qtagSchema = new QTagSchema();

qTagRouter.post("/create",validate(qtagSchema.createQTagSchema),qtagCtrl.createQTagHandler);
qTagRouter.get("/get",[validate(qtagSchema.getUpdateDeleteQTagSchema)],qtagCtrl.getQTagHandler);
qTagRouter.post("/getQTs",qtagCtrl.getQTagsHandler); // just like get, except returns all matches and not just one
qTagRouter.patch("/update",[validate(qtagSchema.getUpdateDeleteQTagSchema)],qtagCtrl.updateQTagHandler);
qTagRouter.delete("/delete",[validate(qtagSchema.getUpdateDeleteQTagSchema)],qtagCtrl.deleteQTagHandler);

export default qTagRouter;
 