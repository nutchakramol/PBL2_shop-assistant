import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hasMongoUri: !!process.env.MONGODB_URI,
    value: process.env.MONGODB_URI ?? "NOT FOUND",
  });
}
