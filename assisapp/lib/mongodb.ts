import mongoose from "mongoose";

const mongodbUri = process.env.MONGODB_URI as string;
const mongodbName = process.env.MONGODB_NAME as string;

if (!mongodbUri || !mongodbName) {
  throw new Error("MongoDB URI and name must be provided in environment variables.");
}

// Global cache to prevent multiple connections in development
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export default async function connectDb() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongodbUri, { 
      dbName: mongodbName 
    }).then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
    console.log("Connected to MongoDB successfully.");
    return cached.conn;
  } catch (err) {
    cached.promise = null;
    console.error("MongoDB connection error:", err);
    throw err;
  }
}