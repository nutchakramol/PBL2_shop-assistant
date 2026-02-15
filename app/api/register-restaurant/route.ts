import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Restaurant from "@/models/Restaurant";
import Signup from "@/models/Signup";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { ownerName, restaurantLocation, tableCount, email } = body;

    // 1️⃣ Find user by email
    const user = await Signup.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // 2️⃣ Generate next restaurant ID
    const count = await Restaurant.countDocuments();
    const nextNumber = count + 1;

    const restaurant_id =
      "ABC" + String(nextNumber).padStart(4, "0");

    // 3️⃣ Create restaurant
    const newRestaurant = await Restaurant.create({
      restaurant_id,
      user_id: user._id,   // ✅ Now safe
      ownerName,
      location: restaurantLocation,
      tableCount,
      email,
    });

    return NextResponse.json(newRestaurant, { status: 201 });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
