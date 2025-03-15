import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB connected: ${connection.connection.host},${connection.connection.name}`);
    } catch (error) {
        console.log("Error in connecting to database", error);
    }
};

export default dbConnect;