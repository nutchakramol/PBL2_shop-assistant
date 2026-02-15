import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDb from "@/lib/mongodb";
import menu from "@/models/menu";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ restID: string }> }
) {
  try {
    // ✅ Connect DB
    await connectDb();

    // ✅ Await params (IMPORTANT in new Next.js)
    const { restID } = await params;

    console.log("Requested Restaurant ID:", restID);

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(restID)) {
      return NextResponse.json(
        { error: "Invalid restaurant ID" },
        { status: 400 }
      );
    }

    // ✅ Convert to ObjectId (SAFE FIX)
    const objectId = new mongoose.Types.ObjectId(restID);

    // ✅ Query Menu
    const menuItems = await menu.find({
      restaurant_id: objectId,
      is_available: true, // remove if you want ALL items
    });

    console.log("Menus Found:", menuItems);

    return NextResponse.json(menuItems);

  } catch (error) {
    console.error("MENU API ERROR:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
