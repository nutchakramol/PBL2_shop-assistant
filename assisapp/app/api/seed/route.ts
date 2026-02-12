import mongoose from "mongoose";

export async function GET() {
  await mongoose.connect(process.env.MONGODB_URI!, {
    dbName: process.env.MONGODB_NAME,
  });

  const TestSchema = new mongoose.Schema({
    name: String,
  });

  const Test =
    mongoose.models.Test || mongoose.model("Test", TestSchema);

  await Test.create({ name: "hello mongo" });

  return Response.json({ message: "Data inserted ✅" });
}
