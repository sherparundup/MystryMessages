import {Message} from "@/model/User.model"
export interface apiResponse{

    success:boolean,
    message:string,
    isAccepting?:boolean,
    messages?:Array<Message>
}