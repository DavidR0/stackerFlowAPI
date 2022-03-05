import express from "express";
import userController from "../../controllers/user.controller";
import validate from "../../middleWare/requestValidator";
import { createUserSchema, getUpdateUserSchema } from "../../schema/user.schema";

const router = express.Router();

const userCtrl = new userController();

router.post("/create",validate(createUserSchema),userCtrl.createUserHandler);
router.get("/get",validate(getUpdateUserSchema),userCtrl.getUserHandler);
router.patch("/update",validate(getUpdateUserSchema),userCtrl.updateUserHandler);

export default router;
