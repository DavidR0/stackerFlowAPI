import { object, string, ref, number } from "yup";

export const createUserSchema = object({
    body: object({
        userName: string().required("userName is required"),
        password: string()
        .required("Password is required"),
        email: string().email("Must be a valid email").required("Email is required"),
    }),
});

export const getUpdateUserSchema = object({
    body: object({
        userID: number().required("userID is required"),
    }),
});

