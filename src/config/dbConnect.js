import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`✅ MongoDB Connected: ${connection.connection.host} / ${connection.connection.name}`);
    } catch (error) {
        console.error("❌ Error connecting to database:", error.message);
        process.exit(1); // Exit process with failure
    }
};

export default dbConnect;

