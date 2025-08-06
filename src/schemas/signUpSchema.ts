import { z,email } from "zod";

export const userNameValidation = z
  .string()
  .min(2, "Use at least 2 characters for your username")
  .max(10, "Use less than 10 characters for your username")
  .regex(/^[a-zA-Z0-9]+$/, "No special characters allowed");


export const emailVerification = z.string().email({message:"Invalid email format"});
export const passwordVerification = z.string().min(6,"password should be minimum 6 charecters");

export const signUpSchema=z
    .object({
        userName:userNameValidation,
        email:emailVerification,
        password:passwordVerification


    })