import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Restaurant from "@/models/Restaurant";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ registered: false });
    }

    const restaurant = await Restaurant.findOne({ email });

    if (!restaurant) {
      return NextResponse.json({ registered: false });
    }

    return NextResponse.json({
      registered: true,
      restaurant_id: restaurant.restaurant_id,
    });

  } catch (error) {
    console.error("CHECK ERROR:", error);
    return NextResponse.json(
      { registered: false },
      { status: 500 }
    );
  }
}
