import { object, string, ref, number } from "yup";

export default class VoteSchema{
    createVoteSchema = object({
        body: object({
            voteType: string().required("voteType is required"),
            itemType: string().required("itemType is required"),
            itemId: number().required("itemId is required"),
        }),
    });
    
    getUpdateDeleteVoteSchema = object({
        body: object({
            voteId: number().required("voteId is required"),
        }),
    });
}


