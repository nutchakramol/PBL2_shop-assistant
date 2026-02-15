import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Restaurant from "@/models/Restaurant";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { ownerName, restaurantLocation, tableCount, email } = body;
    
    const count = await Restaurant.countDocuments();

    // 2️⃣ Generate next ID
    const nextNumber = count + 1;

    const restaurant_id =
      "ABC" + String(nextNumber).padStart(4, "0");

    const newRestaurant = await Restaurant.create({
      restaurant_id,
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
