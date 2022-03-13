import express from "express";
import validate from "../../middleWare/requestValidator";
import AnswerController from "../../controllers/answer.controller";
import AnswerSchema from "../../schema/answer.schema"

const router = express.Router();

const answerCtrl = new AnswerController();
const answerSchema = new AnswerSchema();

router.post("/create",validate(answerSchema.createAnswerSchema), answerCtrl.createAnswerHandler);
router.get("/get",[validate(answerSchema.getUpdateDeleteAnswerSchema)], answerCtrl.getAnswerHandler);
router.patch("/update",[validate(answerSchema.getUpdateDeleteAnswerSchema)], answerCtrl.updateAnswerHandler);
router.delete("/delete",[validate(answerSchema.getUpdateDeleteAnswerSchema)], answerCtrl.deleteAnswerHandler);

export default router;
