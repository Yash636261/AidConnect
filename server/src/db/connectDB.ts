import mongoose from 'mongoose';
import dotev from 'dotenv';

dotev.config();
export const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGODB_URL;
    if (!mongoUrl) {
      throw new Error('MONGODB_URL is not defined in the environment variables');
    }
    const conn = await mongoose.connect(mongoUrl, {
        dbName: "JivanSarthi",
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('An unknown error occurred');
    }
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
