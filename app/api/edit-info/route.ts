import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Signup from "@/models/Signup";
import Restaurant from "@/models/Restaurant";

export async function GET(req: Request) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get("user_id");

  const user = await Signup.findById(user_id);
  const restaurant = await Restaurant.findOne({ user_id });

  if (!user || !restaurant) {
    return NextResponse.json(
      { message: "Not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    username: user.username,
    name: user.name,
    location: restaurant.location,
    tableCount: restaurant.tableCount,
  });
}

export async function PUT(req: Request) {
  await dbConnect();

  const body = await req.json();
  const { user_id, username, name, location, tableCount } = body;

  // Update Signup
  await Signup.findByIdAndUpdate(user_id, {
    username,
    name,
  });

  // Update Restaurant
  await Restaurant.findOneAndUpdate(
    { user_id },
    {
      ownerName: name,   // 🔴 sync with Signup.name
      location,
      tableCount,
    }
  );

  return NextResponse.json({ message: "Updated successfully" });
}
