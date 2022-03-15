import { object, string, number } from "yup";

export class TagSchema{
    createTagSchema = object({
        body: object({
            tag: string().required("tag is required"),
        }),
    });
    
    getUpdateDeleteTagSchema = object({
        body: object({
            tagId: number().required("tagId is required"),
        }),
    });
}


