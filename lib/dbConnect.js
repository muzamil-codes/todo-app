import mongoose from "mongoose";

export const dbConnect = async () => {
    try {
        const connected = await mongoose.connect(process.env.MONGODB_URI)
        if (connected) {
            console.log("DB CONNECTED SUCCESSFULLY")
        }
    } catch (error) {
        console.log(error)
    }
};
