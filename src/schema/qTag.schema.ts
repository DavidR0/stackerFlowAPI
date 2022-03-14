import { object,  number } from "yup";

export default class QTagSchema{
    createQTagSchema = object({
        body: object({
            tagId: number().required("tagId is required"),
            questionId: number().required("questionId is required"),
        }),
    });
    
    getUpdateDeleteQTagSchema = object({
        body: object({
            id: number().required("id is required"),
        }),
    });
}


