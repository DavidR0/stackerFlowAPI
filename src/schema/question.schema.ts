import {object, string} from 'yup'

export class QuestionSchema{

    createQuestionSchema = object({
        body: object({
            title: string()
            .required("title is required"),
            content: string()
            .required("content is required"),
        }),
    });

    getUpdateDeleteQuestionSchema = object({
        body: object({
            questionId: string()
            .required("questionId is required"),
        }),
    });
}