import { object, string, ref, number, boolean } from "yup";

export const createSessionSchema = object({
    body: object({
        password: string()
        .required("Password is required")
        .min(6, "Password is too short"),
        email: string().email("Must be a valid email").required("Email is required"),
        twoFactPin: number(),
    }),
});
