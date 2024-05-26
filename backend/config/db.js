import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://ChatApp:Shantanu20@cluster0.z4qikax.mongodb.net/food-del"
    ).then(()=>{
        console.log("DB connected");
    })
}