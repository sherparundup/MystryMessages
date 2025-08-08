import { resend } from "@/lib/resend";
import { apiResponse } from "@/types/apiResponse";
import VerificationEmail from "../../emails/verificationEmail";
export const VerificationEmialSender = async (
  email: string,
  username: string,
  verifyCode: string
): Promise<apiResponse> => {
  try {
    await resend.emails.send({
      from: `${process.env.ADMIN_EMAIL}`,
      to: "hehehhahahaha@gmail.vom", // ✅ send to the actual user
      subject: "Verify your email",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: "Send the email succesfully" };
  } catch (Error) {
    console.log("erooor sending the email");
    console.log(Error);
    return { success: false, message: "failed to senf the email " };
  }
};
