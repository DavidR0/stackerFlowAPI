import express from "express";
import UserController from "../../controllers/user.controller";
import validate from "../../middleWare/requestValidator";
import requireUser from "../../middleWare/requireUser";
import UserSchema from "../../schema/user.schema";

const router = express.Router();

const userCtrl = new UserController();
const userSchema = new UserSchema();

router.post("/create",validate(userSchema.createUserSchema),userCtrl.createUserHandler);
router.get("/get",[requireUser,validate(userSchema.getUpdateUserSchema)],userCtrl.getUserHandler);
router.patch("/update",[requireUser,validate(userSchema.getUpdateUserSchema)],userCtrl.updateUserHandler);
router.delete("/delete",[requireUser,validate(userSchema.getUpdateUserSchema)],userCtrl.deleteUserHandler);

export default router;
