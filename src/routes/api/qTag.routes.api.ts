import express from "express";
import validate from "../../middleWare/requestValidator";
import requireUser from "../../middleWare/requireUser";
import {QTagSchema} from "../../schema/qTag.schema";
import {QuestionTagController} from "../../controllers/qTag.controller";

const qTagRouter = express.Router();

const qtagCtrl = new QuestionTagController();
const qtagSchema = new QTagSchema();

qTagRouter.post("/create",validate(qtagSchema.createQTagSchema),qtagCtrl.createQTagHandler);
qTagRouter.get("/get",[requireUser,validate(qtagSchema.getUpdateDeleteQTagSchema)],qtagCtrl.getQTagHandler);
qTagRouter.patch("/update",[requireUser,validate(qtagSchema.getUpdateDeleteQTagSchema)],qtagCtrl.updateQTagHandler);
qTagRouter.delete("/delete",[requireUser,validate(qtagSchema.getUpdateDeleteQTagSchema)],qtagCtrl.deleteQTagHandler);

export default qTagRouter;
 