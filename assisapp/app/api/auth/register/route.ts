import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/users";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { username, email, password, full_name } = body;

    // ✅ Validation
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    // ✅ Check existing user
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      full_name
    });

    // ✅ Create JWT
    const token = signToken({ userId: user._id });

    return NextResponse.json({
      user,
      token
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
