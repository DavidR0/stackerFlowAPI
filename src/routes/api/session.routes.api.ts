import express from "express";
import sessionController from "../../controllers/session.controller";
import validate from "../../middleWare/requestValidator";
import SessionSchema from "../../schema/session.schema";
import requireUser from "../../middleWare/requireUser";

const router = express.Router();

const sessionCtrl = new sessionController();
const sessionSchema = new SessionSchema();

router.post("/create",validate(sessionSchema.createSessionSchema),sessionCtrl.createSessionHandler);
router.get("/get",[requireUser,validate(sessionSchema.getUpdateSessionSchema)],sessionCtrl.getSessionhandler);
router.patch("/update",[requireUser,validate(sessionSchema.getUpdateSessionSchema)],sessionCtrl.updateSessionHandler);
router.delete("/delete",[requireUser,validate(sessionSchema.getUpdateSessionSchema)],sessionCtrl.deleteSessionHandler);

export default router;
