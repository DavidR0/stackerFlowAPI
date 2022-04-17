import express from "express";
import validate from "../../middleWare/requestValidator";
import {VoteSchema} from "../../schema/vote.schema";
import {VoteController} from "../../controllers/vote.controller";

const voteRouter = express.Router();

const voteCtrl = new VoteController();
const voteSchema = new VoteSchema();

voteRouter.post("/create",[validate(voteSchema.createDeleteVoteSchema)],voteCtrl.createVoteHandler);
voteRouter.get("/get",[validate(voteSchema.getUpdateDeleteVoteSchema)],voteCtrl.getVoteHandler);
voteRouter.post("/getAll",voteCtrl.getVotesHandler);
voteRouter.patch("/update",[validate(voteSchema.getUpdateDeleteVoteSchema)],voteCtrl.updateVoteHandler);
voteRouter.delete("/delete",[validate(voteSchema.createDeleteVoteSchema)],voteCtrl.deleteVoteHandler);

export default voteRouter;
