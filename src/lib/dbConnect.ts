import mongoose from "mongoose";

type connectionObject = {
  isConnected?: number;
};

const connection: connectionObject = {};

const dbconnect = async (): Promise<void> => {
  if (connection.isConnected) {
    console.log("the database is already connected");
    return
  }
  try {
   const db= await mongoose.connect(process.env.MONGODB_URI||'',{})
   connection.isConnected=db.connections[0].readyState
    console.log("the db is connected succesfully");
        
  } catch (error) {
    console.log(error)
    process.exit(1)
    
  }
};


export default dbconnect;