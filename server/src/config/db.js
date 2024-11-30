import mongoose from 'mongoose';

const connectDB = async () => {
    console.log(process.env.MONGO_URI)
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongoDB connected");
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
