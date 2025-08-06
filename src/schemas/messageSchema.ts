import {z} from "zod"

export const messageSchema = z.object({
    message:z.string().min(1,"the message must be atleast 1 word").max(300,"the max length of the message must be less then 300 word")
    
    
  
});
