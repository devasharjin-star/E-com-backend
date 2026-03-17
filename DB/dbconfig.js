import mongoose from "mongoose";

const connectToDb=async(req,res)=>{
    try{
        const connectDb=await mongoose.connect(process.env.MONGO_URI)
        if(connectDb){
            console.log("DB connected")
        }
    }catch(e){
        console.log(e)
        process.exit(1)
    }
}

export default connectToDb;