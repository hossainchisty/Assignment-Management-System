import app from './app';
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from './config/db';
dotenv.config();


// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI as string);

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});