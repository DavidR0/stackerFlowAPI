import express from "express";
import validate from "../../middleWare/requestValidator";
import requireUser from "../../middleWare/requireUser";
import VoteSchema from "../../schema/vote.schema";
import VoteController from "../../controllers/vote.controller";

const router = express.Router();

const voteCtrl = new VoteController();
const voteSchema = new VoteSchema();

router.post("/create",validate(voteSchema.createVoteSchema),voteCtrl.createVoteHandler);
router.get("/get",[requireUser,validate(voteSchema.getUpdateDeleteVoteSchema)],voteCtrl.getVoteHandler);
router.patch("/update",[requireUser,validate(voteSchema.getUpdateDeleteVoteSchema)],voteCtrl.updateVoteHandler);
router.delete("/delete",[requireUser,validate(voteSchema.getUpdateDeleteVoteSchema)],voteCtrl.deleteVoteHandler);

export default router;
