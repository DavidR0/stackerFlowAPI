import express from "express";
import validate from "../../middleWare/requestValidator";
import requireUser from "../../middleWare/requireUser";
import QTagSchema from "../../schema/qTag.schema";
import QTagController from "../../controllers/qTag.controller";

const router = express.Router();

const qtagCtrl = new QTagController();
const qtagSchema = new QTagSchema();

router.post("/create",validate(qtagSchema.createQTagSchema),qtagCtrl.createQTagHandler);
router.get("/get",[requireUser,validate(qtagSchema.getUpdateDeleteQTagSchema)],qtagCtrl.getQTagHandler);
router.patch("/update",[requireUser,validate(qtagSchema.getUpdateDeleteQTagSchema)],qtagCtrl.updateQTagHandler);
router.delete("/delete",[requireUser,validate(qtagSchema.getUpdateDeleteQTagSchema)],qtagCtrl.deleteQTagHandler);

export default router;
 