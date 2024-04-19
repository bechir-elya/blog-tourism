import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('connected');
    } catch (error) {
        console.log(error);
    }
}