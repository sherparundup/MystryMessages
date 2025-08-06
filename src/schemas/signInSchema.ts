import { email, z } from "zod";
export const emailVerification = z.string().email("Invalid email format");
export const passwordVerification = z
  .string()
  .min(6, "password should be minimum 6 charecters");

export const signUpSchema = z.object({
  email: emailVerification,
  password: passwordVerification,
});
