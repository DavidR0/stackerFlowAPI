import express from "express";
import sessionController from "../../controllers/session.controller";
import validate from "../../middleWare/requestValidator";
import { createSessionSchema} from "../../schema/session.schema";

const router = express.Router();

const sessionCtrl = new sessionController();

router.post("/create",validate(createSessionSchema),sessionCtrl.createSessionHandler);
// router.get("/get",validate(getUpdateUserSchema),userCtrl.getUserHandler);
// router.patch("/update",validate(getUpdateUserSchema),userCtrl.updateUserHandler);

export default router;
