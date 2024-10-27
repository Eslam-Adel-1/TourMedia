import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB connection is established");
    } else if (mongoose.connection.readyState === 0) {
      console.log("MongoDB connection is disconnected");
    } else if (mongoose.connection.readyState === 2) {
      console.log("MongoDB is connecting");
    } else if (mongoose.connection.readyState === 3) {
      console.log("MongoDB is disconnecting");
    }
  } catch (err) {
    console.error(err.message);
  }
};
