import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const VOUCHER_COST: Record<string, number> = {
  gift1: 200,
  gift2: 300,
  gift3: 500,
  gift4: 1000,
};

export async function POST(req: Request) {
  const { userId, gift } = await req.json();

  const cost = VOUCHER_COST[gift];
  if (!cost) {
    return NextResponse.json({ error: "Invalid gift" }, { status: 400 });
  }

  const db = await connectDB();
  const users = db.collection("users");

  const user = await users.findOne({ _id: new ObjectId(userId) });

  if (!user || user.points < cost) {
    return NextResponse.json({ error: "Not enough points" }, { status: 400 });
  }

  await users.updateOne(
    { _id: new ObjectId(userId) },
    {
      $inc: {
        [`vouchers.${gift}`]: 1,
        points: -cost,
      },
      $set: { updated_at: new Date() },
    }
  );

  return NextResponse.json({ message: "Voucher purchased" });
}
