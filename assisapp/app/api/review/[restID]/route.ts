import connectDb from "@/lib/mongodb";
import Review from "@/models/review";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ restID: string }> }
) {
  await connectDb();

  const { restID } = await context.params;

  try {
    const reviews = await Review.find({
      restaurant_id: new mongoose.Types.ObjectId(restID)
    }).sort({ createdAt: -1 });

    return Response.json(reviews);

  } catch (err) {
    console.error("REVIEW FETCH ERROR:", err);

    return Response.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
