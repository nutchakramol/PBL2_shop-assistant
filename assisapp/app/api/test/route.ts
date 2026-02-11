import { NextResponse } from "next/server";
import connectDb from "@/lib/mongodb"; // Adjust this if @ alias isn't set up
import Product from "@/models/Product"; // This points to your new folder

export async function GET() {
  try {
    await connectDb();
    
    // This will return an empty array [] if the collection is empty,
    // which is better than a "Bad Auth" error!
    const products = await Product.find({});
    
    return NextResponse.json({ success: true, data: products });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}