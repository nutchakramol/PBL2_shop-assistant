import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Restaurant from "@/models/Restaurant";

export async function GET(req: Request) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get("user_id");

  const user = await User.findById(user_id);
  const restaurant = await Restaurant.findOne({ user_id });

  if (!user || !restaurant) {
    return NextResponse.json(
      { message: "Not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    username: user.username,
    ownerName: user.name,        // clearer naming
    shopName: restaurant.name,   // ✅ add this
    location: restaurant.location,
    tableCount: restaurant.tableCount,
  });
}

export async function PUT(req: Request) {
  await dbConnect();

  const body = await req.json();
  const { user_id, username, ownerName, shopName, location, tableCount } = body;

  // Update User
  await User.findByIdAndUpdate(user_id, {
    username,
    name: ownerName,
  });

  // Update Restaurant
  await Restaurant.findOneAndUpdate(
    { user_id },
    {
      ownerName,
      name: shopName,   // ✅ update shop name
      location,
      tableCount,
    }
  );

  return NextResponse.json({ message: "Updated successfully" });
}
