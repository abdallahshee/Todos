import mongoose from "mongoose"


export const connectDB=async()=>{
    if(mongoose.connection.readyState>=1){
        console.log('Connection already exist');
        return mongoose.connection

    }else{
        const DB_URL=process.env.DATABASE_URL ||""
        const con =await mongoose.connect(DB_URL)
        console.log('DB IS CONNECTED');
        return con
    }
}