import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Restaurant from "@/models/Restaurant";

function generateRestaurantId(count: number) {
  return `ABC${String(count + 1).padStart(4, "0")}`;
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { ownerName, restaurantLocation, tableCount } = body;

    // count existing restaurants
    const count = await Restaurant.countDocuments();

    const restaurant_Id = generateRestaurantId(count);

    const newRestaurant = await Restaurant.create({
      restaurant_Id,
      ownerName,
      restaurantLocation,
      tableCount,
    });

    return NextResponse.json(
      { message: "Restaurant saved successfully", restaurant_Id },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
