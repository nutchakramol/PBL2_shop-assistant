import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Signup from "@/models/Signup";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { username, password } = body;

    const user = await Signup.findOne({ username });
    console.log("Current DB:", mongoose.connection.name);

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        message: "Login successful",
        userId: user._id,
        restaurantId: user.restaurant_id
      },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
