import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Menu from "@/models/Menu";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await context.params; // ✅ FIX HERE
    const body = await req.json();

    const updated = await Menu.findByIdAndUpdate(
      id,
      body,
      { returnDocument: "after" } // ✅ replace deprecated `new: true`
    );

    return NextResponse.json(updated);

  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
