import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Signup from "@/models/Signup";

export async function GET(req: Request) {
  await dbConnect();

  // example: get email from cookie or header
  const email = "get from session";

  const user = await Signup.findOne({ email }).select("-password");

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(user);
}
