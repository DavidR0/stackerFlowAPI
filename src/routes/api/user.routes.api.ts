import express from "express";
import userController from "../../controllers/user.controller";
import validate from "../../middleWare/requestValidator";
import { createUserSchema } from "../../schema/user.schema";

const router = express.Router();

const userCtrl = new userController();

router.post("/",validate(createUserSchema),userCtrl.createUserHandler);

export default router;
