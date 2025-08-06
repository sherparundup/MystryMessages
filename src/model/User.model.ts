import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  message: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends Document {
  userName: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  message: Message[];
}

const UserSchema: Schema<User> = new Schema({
  userName: {
    type: String,
    required: [true, "username is required"],
  },
  email: {
    type: String,
    required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please use a valid email",
    ],
  },
  password: {
    type: String,
    required: true,
  },
  verifyCode: {
    type: String,
    required: [true, "VerifyCode is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "verifyCodeExpiry is required"],
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  isAcceptingMessage: {
    type: Boolean,
    required: true,
    default: true,
  },
  message: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});


const UserModel=(mongoose.models.User as mongoose.Model<User>)||mongoose.model<User>("User",UserSchema)

export default UserModel;