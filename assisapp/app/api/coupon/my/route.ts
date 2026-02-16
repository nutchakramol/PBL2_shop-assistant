import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/users";
import { verifyToken } from "@/lib/jwt";

export async function GET(req: Request) {
  try {
    await connectDB();

    // ✅ ตรวจ JWT
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded: any = verifyToken(token);

    if (!decoded?.userId) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (!user.coupons) {
      user.coupons = [];
    }

    // 🔥 ลบคูปองหมดอายุ
    user.coupons = user.coupons.filter(
      (v: any) => new Date(v.expiresAt) > new Date()
    );

    await user.save();

    // 🔥 รวม count ตาม code
    const grouped: any = {};

    user.coupons.forEach((v: any) => {
      if (!grouped[v.code]) {
        grouped[v.code] = {
          code: v.code,
          count: 0,
          nextAvailableAt: null,
        };
      }

      grouped[v.code].count += 1;

      // คำนวณ cooldown จากใบล่าสุด
      const nextTime = new Date(
        new Date(v.collectedAt).getTime() +
          5 * 60 * 60 * 1000
      );

      if (
        !grouped[v.code].nextAvailableAt ||
        nextTime >
          new Date(grouped[v.code].nextAvailableAt)
      ) {
        grouped[v.code].nextAvailableAt = nextTime;
      }
    });

    return NextResponse.json({
      success: true,
      coupons: Object.values(grouped),
      total: user.coupons.length,
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
