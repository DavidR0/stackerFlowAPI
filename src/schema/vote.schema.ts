import { object, string, number } from "yup";

export class VoteSchema{
    createDeleteVoteSchema = object({
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


