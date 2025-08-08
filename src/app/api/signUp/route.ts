import dbconnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import bcrypt from "bcrypt";
import { apiResponse } from "@/types/apiResponse";
import { VerificationEmialSender } from "@/helper/sendVerificationEmail";
import { success } from "zod";
import { messageSchema } from "@/schemas/messageSchema";
import { use } from "react";

export async function POST(request: Request) {
  await dbconnect();
  try {
    const { userName, email, password } = await request.json();
    const IsThereExistingUserByThisUsername = await UserModel.findOne({
      userName,
      isVerified: true,
    });
    const IsThereExistingUserByThisEmail = await UserModel.findOne({
      email,
      isVerified: true,
    });
    if (IsThereExistingUserByThisEmail) {
      return Response.json(
        { success: false, message: "User with this email  already exist" },
        { status: 400 }
      );
    }
    if (!IsThereExistingUserByThisUsername) {
      const HashedPassword = await bcrypt.hash(password, 10);
      const Expirydate = new Date();
      Expirydate.setHours(Expirydate.getHours() + 1);
      const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

      const NewUser = await UserModel.create({
        userName,
        email,
        password: HashedPassword,
        verifyCode,
        verifyCodeExpiry: Expirydate,
        isVerified: false,
        isAcceptingMessage: true,
        message: [],
      });
      //SENDING MAIL HERE
      const SendingEmail = await VerificationEmialSender(
        email,
        userName,
        verifyCode
      );
      if (!SendingEmail.success) {
        return Response.json(
          { success: false, message: SendingEmail.message },
          { status: 500 }
        );
      }
      return Response.json(
        {
          success: true,
          message: "the user has signup succesfully",
        },
        { status: 200 }
      );
    }
    return Response.json(
      { success: false, message: "User with this userName  already exist" },
      { status: 400 }
    );
  } catch (error) {
    console.log(error);
    console.log("error registering user");
    return Response.json(
      {
        success: false,
        message: "error on registering user",
      },
      {
        status: 500,
      }
    );
  }
}
