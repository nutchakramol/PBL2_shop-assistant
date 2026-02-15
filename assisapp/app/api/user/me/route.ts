import { NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import User from "@/models/user";
import { Types } from "mongoose";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "No userId" }, { status: 400 });
  }

  await connectDb();

  const user = await User.findById(
    new Types.ObjectId(userId),
    { coupons: 1 }
  ).lean();

  return NextResponse.json(user);
}
