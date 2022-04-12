import express from "express";
import {UserController} from "../../controllers/user.controller";
import validate from "../../middleWare/requestValidator";
import requireUser from "../../middleWare/requireUser";
import {UserSchema} from "../../schema/user.schema";

const userRouter = express.Router();

const userCtrl = new UserController();
const userSchema = new UserSchema();

userRouter.post("/create",validate(userSchema.createUserSchema),userCtrl.createUserHandler);
userRouter.post("/get",[requireUser,validate(userSchema.getUpdateUserSchema)],userCtrl.getUserHandler);
userRouter.patch("/update",[requireUser,validate(userSchema.getUpdateUserSchema)],userCtrl.updateUserHandler);
userRouter.delete("/delete",[requireUser,validate(userSchema.getUpdateUserSchema)],userCtrl.deleteUserHandler);

export default userRouter;
