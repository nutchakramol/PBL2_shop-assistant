import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Restaurant from "@/models/Restaurant";
import mongoose from "mongoose";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");

    if (!user_id) {
      return NextResponse.json(
        { message: "User ID required" },
        { status: 400 }
      );
    }

    // Convert string → ObjectId
    const objectId = new mongoose.Types.ObjectId(user_id);

    // 1️⃣ Find user
    const user = await User.findById(objectId);

    // 2️⃣ Find restaurant linked by user_id
    const restaurant = await Restaurant.findOne({
      user_id: objectId,
    });

    return NextResponse.json({
      username: user?.username,
      ownerName: restaurant?.ownerName,
      restaurantName: restaurant?.name,   // ✅ add this
      email: user?.email,
      restaurant_id: restaurant?._id,     // better use _id
      location: restaurant?.location,
      tableCount: restaurant?.tableCount,
    });

  } catch (error) {
    console.error("PROFILE ERROR:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
