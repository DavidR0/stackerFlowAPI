import express from "express";
import { createUserHandler } from "../../controllers/user.controller";
const router = express.Router();

router.post("/",createUserHandler);

export default router;
