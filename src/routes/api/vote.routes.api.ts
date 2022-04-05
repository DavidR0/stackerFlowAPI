import express from "express";
import validate from "../../middleWare/requestValidator";
import requireUser from "../../middleWare/requireUser";
import {VoteSchema} from "../../schema/vote.schema";
import {VoteController} from "../../controllers/vote.controller";

const voteRouter = express.Router();

const voteCtrl = new VoteController();
const voteSchema = new VoteSchema();

voteRouter.post("/create",[validate(voteSchema.createVoteSchema)],voteCtrl.createVoteHandler);
voteRouter.get("/get",[validate(voteSchema.getUpdateDeleteVoteSchema)],voteCtrl.getVoteHandler);
voteRouter.patch("/update",[validate(voteSchema.getUpdateDeleteVoteSchema)],voteCtrl.updateVoteHandler);
voteRouter.delete("/delete",[validate(voteSchema.getUpdateDeleteVoteSchema)],voteCtrl.deleteVoteHandler);

export default voteRouter;
