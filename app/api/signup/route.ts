import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Signup from "@/models/Signup";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    await dbConnect();
    console.log("Current DB:", mongoose.connection.name);
    const body = await req.json();
    const { name, username, email, password } = body;

    const existingUser = await Signup.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Signup.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "Signup successful" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
