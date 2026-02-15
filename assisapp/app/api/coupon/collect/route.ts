import { NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import User from "@/models/user";
import { Types } from "mongoose";

const COOLDOWN_HOURS = 5;

export async function POST(req: Request) {
  const { userId, code } = await req.json();

  if (!userId || !code) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  await connectDb();

  const user = await User.findById(new Types.ObjectId(userId));
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const now = new Date();
  const coupon = user.coupons.find((c: any) => c.code === code);

  if (coupon) {
    if (coupon.nextAvailableAt && coupon.nextAvailableAt > now) {
      return NextResponse.json({
        success: false,
        message: "wait 5 hours",
      });
    }

    coupon.count += 1;
    coupon.nextAvailableAt = new Date(
      now.getTime() + COOLDOWN_HOURS * 60 * 60 * 1000
    );
  } else {
    user.coupons.push({
      code,
      count: 1,
      nextAvailableAt: new Date(
        now.getTime() + COOLDOWN_HOURS * 60 * 60 * 1000
      ),
    });
  }

  await user.save();

  return NextResponse.json({
    success: true,
    message: " 🎉 alredy collected",
  });
}
