import express from "express";
import validate from "../../middleWare/requestValidator";
import {AnswerController} from "../../controllers/answer.controller";
import {AnswerSchema} from "../../schema/answer.schema"

const answerRouter = express.Router();

const answerCtrl = new AnswerController();
const answerSchema = new AnswerSchema();

answerRouter.post("/create",validate(answerSchema.createAnswerSchema), answerCtrl.createAnswerHandler);
answerRouter.get("/get",[validate(answerSchema.getUpdateDeleteAnswerSchema)], answerCtrl.getAnswerHandler);
answerRouter.post("/getQuestionAnswers",[validate(answerSchema.getQuestionAnswers)], answerCtrl.getQuestionAnswersHandler);
answerRouter.patch("/update",[validate(answerSchema.getUpdateDeleteAnswerSchema)], answerCtrl.updateAnswerHandler);
answerRouter.delete("/delete",[validate(answerSchema.getUpdateDeleteAnswerSchema)], answerCtrl.deleteAnswerHandler);

export default answerRouter;
