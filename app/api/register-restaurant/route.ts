import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Restaurant from "@/models/Restaurant";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { ownerName, name ,restaurantLocation, tableCount, email } = body;


    const user = await User.findOne({ email });
    const restaurants = await Restaurant.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const newRestaurant = await Restaurant.create({ 
      user_id: user._id,   // ✅ Now safe
      ownerName,
      name,
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
