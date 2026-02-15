import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Restaurant from "@/models/Restaurant";

export async function GET() {
  try {
    await dbConnect();

    const restaurant = await Restaurant.findOne();

    if (restaurant) {
      return NextResponse.json({ registered: true });
    } else {
      return NextResponse.json({ registered: false });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
