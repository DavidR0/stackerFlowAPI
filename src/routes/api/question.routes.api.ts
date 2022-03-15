import express from "express";
import validate from "../../middleWare/requestValidator";
import {QuestionController} from "../../controllers/question.controller";
import {QuestionSchema} from "../../schema/question.schema"

const questionRouter = express.Router();

const questionCtrl = new QuestionController();
const questionSchema = new QuestionSchema();

questionRouter.post("/create",validate(questionSchema.createQuestionSchema), questionCtrl.createQuestionHandler);
questionRouter.get("/get",[validate(questionSchema.getUpdateDeleteQuestionSchema)], questionCtrl.getQuestionHandler);
questionRouter.patch("/update",[validate(questionSchema.getUpdateDeleteQuestionSchema)], questionCtrl.updateQuestionHandler);
questionRouter.delete("/delete",[validate(questionSchema.getUpdateDeleteQuestionSchema)], questionCtrl.deleteQuestionHandler);

export default questionRouter;
