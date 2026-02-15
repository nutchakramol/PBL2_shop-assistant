import connectDb from "@/lib/mongodb";
import Review from "@/models/review";

export async function POST(req: Request) {
  try {
    await connectDb();

    const body = await req.json();

    const review = await Review.create(body);

    return Response.json(review);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to create review" }, { status: 500 });
  }
}
