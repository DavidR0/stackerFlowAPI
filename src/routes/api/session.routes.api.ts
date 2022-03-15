import express from "express";
import {SessionController} from "../../controllers/session.controller";
import validate from "../../middleWare/requestValidator";
import {SessionSchema} from "../../schema/session.schema";
import requireUser from "../../middleWare/requireUser";

const sessionRouter = express.Router();

const sessionCtrl = new SessionController();
const sessionSchema = new SessionSchema();

sessionRouter.post("/create",validate(sessionSchema.createSessionSchema),sessionCtrl.createSessionHandler);
sessionRouter.get("/get",[requireUser,validate(sessionSchema.getUpdateSessionSchema)],sessionCtrl.getSessionhandler);
sessionRouter.patch("/update",[requireUser,validate(sessionSchema.getUpdateSessionSchema)],sessionCtrl.updateSessionHandler);
sessionRouter.delete("/delete",[requireUser,validate(sessionSchema.getUpdateSessionSchema)],sessionCtrl.deleteSessionHandler);

export default sessionRouter;
