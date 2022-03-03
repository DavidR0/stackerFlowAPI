import { object, string, ref } from "yup";

export const createUserSchema = object({
    body: object({
        userName: string().required("userName is required"),
        password: string()
        .required("Password is required")
        .min(6, "Password is too short"),
        email: string().email("Must be a valid email").required("Email is required"),
    }),
});

