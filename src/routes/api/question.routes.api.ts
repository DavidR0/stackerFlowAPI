import express from "express";
import validate from "../../middleWare/requestValidator";
import QuestionController from "../../controllers/question.controller";
import QuestionSchema from "../../schema/question.schema"

const router = express.Router();

const questionCtrl = new QuestionController();
const questionSchema = new QuestionSchema();

router.post("/create",validate(questionSchema.createQuestionSchema), questionCtrl.createQuestionHandler);
router.get("/get",[validate(questionSchema.getUpdateDeleteQuestionSchema)], questionCtrl.getQuestionHandler);
router.patch("/update",[validate(questionSchema.getUpdateDeleteQuestionSchema)], questionCtrl.updateQuestionHandler);
router.delete("/delete",[validate(questionSchema.getUpdateDeleteQuestionSchema)], questionCtrl.deleteQuestionHandler);

export default router;
