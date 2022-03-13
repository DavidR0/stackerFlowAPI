import { object, string, ref, number } from "yup";

export default class UserSchema{
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
            userID: number().required("userID is required"),
        }),
    });
}


