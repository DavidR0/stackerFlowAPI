import { object, string, ref, number, boolean } from "yup";

export default class SessionSchema{

    createSessionSchema = object({
        body: object({
            password: string()
            .required("Password is required"),
            email: string().email("Must be a valid email").required("Email is required"),
            twoFactPin: number(),
        }),
    });

    getUpdateSessionSchema = object({
        body: object({
            id: number()
            .required("id is required")
        }),
    });
}


