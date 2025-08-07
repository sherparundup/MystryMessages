import dbconnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model"; 
import bcrypt from "bcrypt"
import { apiResponse } from "@/types/apiResponse";
import {VerificationEmialSender} from "@/helper/sendVerificationEmail"
import { success } from "zod";
import { messageSchema } from "@/schemas/messageSchema";

export async function POST(request:Request){
    await dbconnect();
    try {
        const {userName,email,password}=await request.json();
        const IsThereExistingUserByThisUsername=await UserModel.findOne({
            userName,
            isVerified:true
        })
        const IsThereExistingUserByThisEmail=await UserModel.findOne({
            email,
            isVerified:true
        })
        if(IsThereExistingUserByThisEmail){
            return Response.json({success:false,message:"User with this email  already exist"},
                {status:400}
            )

        }
        if(!IsThereExistingUserByThisUsername){
            const HashedPassword=await bcrypt.hash(password,10);
            
            const NewUser=await  UserModel.create({
                userName,
                email,
                password:HashedPassword
            })
            return Response.json({
                success:true,
                message:"the user has signup succesfully"
            })
        }
        return Response.json({success:false,message:"User with this userName  already exist"},
            {status:400}
        )
    } catch (error) {
        console.log(error);
        console.log("error registering user");
        return Response.json({ 
            success:false,
            message:"error on registering user",

        },{
            status:500
        })
        
        
    }


}