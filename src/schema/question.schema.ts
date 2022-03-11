import {object, string, ref, number, boolean} from 'yup'

export default class QuestionSchema{

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