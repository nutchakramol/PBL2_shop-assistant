import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Menu from "@/models/Menu";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const restaurant_id = searchParams.get("restaurant_id");

    if (!restaurant_id) {
      return NextResponse.json(
        { message: "Restaurant ID required" },
        { status: 400 }
      );
    }

    const menus = await Menu.find({ restaurant_id })
      .sort({ category: 1 });

    return NextResponse.json(menus);
  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    const { restaurant_id, name, category, price, image } = body;

    if (!restaurant_id || !name || !category || !price) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newMenu = await Menu.create({
      restaurant_id,
      name,
      category,
      price,
      image: image || "",
      // is_available automatically true from model default
    });

    return NextResponse.json(newMenu, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
