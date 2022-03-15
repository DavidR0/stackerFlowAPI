import { object, string, number } from "yup";

export class UserSchema{
    createUserSchema = object({
        body: object({
            userName: string().required("userName is required"),
            password: string()
            .required("Password is required"),
            email: string().email("Must be a valid email").required("Email is required"),
        }),
    });
    
    getUpdateUserSchema = object({
        body: object({
            userId: number().required("userId is required"),
        }),
    });
}


