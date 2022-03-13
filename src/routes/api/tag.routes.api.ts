import express from "express";
import validate from "../../middleWare/requestValidator";
import requireUser from "../../middleWare/requireUser";
import TagSchema from "../../schema/tag.schema";
import TagController from "../../controllers/tag.controller";

const router = express.Router();

const tagCtrl = new TagController();
const tagSchema = new TagSchema();

router.post("/create",validate(tagSchema.createTagSchema),tagCtrl.createTagHandler);
router.get("/get",[requireUser,validate(tagSchema.getUpdateDeleteTagSchema)],tagCtrl.getTagHandler);
router.patch("/update",[requireUser,validate(tagSchema.getUpdateDeleteTagSchema)],tagCtrl.updateTagHandler);
router.delete("/delete",[requireUser,validate(tagSchema.getUpdateDeleteTagSchema)],tagCtrl.deleteTagHandler);

export default router;
