import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/users";
import { verifyToken } from "@/lib/jwt";

export async function POST(req: Request) {
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

    const { code } = await req.json();

    if (!code) {
      return NextResponse.json(
        { error: "Missing code" },
        { status: 400 }
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

    // 🔥 ลบคูปองเสีย + หมดอายุออกก่อน  <-- แก้ตรงนี้
    user.coupons = user.coupons.filter(
      (v: any) =>
        v &&
        v.code &&
        v.collectedAt &&
        v.expiresAt &&
        new Date(v.expiresAt) > new Date()
    );

    // 🔥 หาใบล่าสุดของ code นี้
    const sameCodeCoupons = user.coupons.filter(
      (v: any) => v.code === code
    );

    let nextAvailableAt = null;

    if (sameCodeCoupons.length > 0) {
      const latest = sameCodeCoupons.reduce((a: any, b: any) =>
        new Date(a.collectedAt) > new Date(b.collectedAt) ? a : b
      );

      const nextTime = new Date(
        new Date(latest.collectedAt).getTime() +
          5 * 60 * 60 * 1000
      );

      if (nextTime > new Date()) {
        return NextResponse.json(
          {
            error: "กรุณารอ 5 ชั่วโมงก่อนเก็บอีกครั้ง",
            nextAvailableAt: nextTime,
          },
          { status: 400 }
        );
      }
    }

    // ✅ เพิ่มคูปองใหม่
    user.coupons.push({
      code,
      collectedAt: new Date(),
      expiresAt: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ), // หมดอายุ 30 วัน
    });


    // 🔥 CLEAN vouchers ที่เสียออก (เพิ่มตรงนี้)
    if (user.vouchers) {
      user.vouchers = user.vouchers.filter(
        (v: any) =>
          v &&
          v.code &&
          v.collectedAt &&
          v.expiresAt
      );
    }

    await user.save();

    // 🔥 นับจำนวนของ code นี้
    const count = user.coupons.filter(
      (v: any) => v.code === code
    ).length;

    return NextResponse.json({
      success: true,
      code,
      count,
      total: user.coupons.length, // <-- แก้ตรงนี้
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
