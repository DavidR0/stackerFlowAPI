import {object, string, ref, number, boolean} from 'yup'

export default class AnswerSchema{

    createAnswerSchema = object({
        body: object({
            questionId: string()
            .required("questionId is required"),
            content: string()
            .required("content is required"),
        }),
    });

    getUpdateDeleteAnswerSchema = object({
        body: object({
            answerId: string()
            .required("answerId is required"),
        }),
    });
}