import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
mongoose.set("strictQuery", false);
let connectDB = () =>{
    mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log("Connected to MongoDB");
      });
}


export default connectDB