import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Restaurant from "@/models/Restaurant";
import { getUserFromToken } from "@/lib/auth";

export async function GET() {
  await dbConnect();

  const user = await getUserFromToken();

  if (!user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const restaurant = await Restaurant.findOne({
    user_id: user.id,
  });

  if (!restaurant) {
    return NextResponse.json(
      { message: "Restaurant not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(restaurant);
}
