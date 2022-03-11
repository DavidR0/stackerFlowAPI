import express from "express";
import userController from "../../controllers/user.controller";
import validate from "../../middleWare/requestValidator";
import requireUser from "../../middleWare/requireUser";
import { createUserSchema, getUpdateUserSchema } from "../../schema/user.schema";

const router = express.Router();

const userCtrl = new userController();

router.post("/create",validate(createUserSchema),userCtrl.createUserHandler);
router.get("/get",[requireUser,validate(getUpdateUserSchema)],userCtrl.getUserHandler);
router.patch("/update",[requireUser,validate(getUpdateUserSchema)],userCtrl.updateUserHandler);
router.delete("/delete",[requireUser,validate(getUpdateUserSchema)],userCtrl.deleteUserHandler);

export default router;
