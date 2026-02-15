import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const restaurant_id = searchParams.get("restaurant_id");

    if (!restaurant_id) {
      return NextResponse.json(
        { message: "Restaurant ID required" },
        { status: 400 }
      );
    }

    const orders = await Order.find({
      restaurant_id: restaurant_id,
    }).sort({ created_at: -1 });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
