import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET(req: Request) {
  await dbConnect();

  // example: get email from cookie or header
  const email = "get from session";

  const user = await User.findOne({ email }).select("-password");

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(user);
}
