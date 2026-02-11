import connectDb from "@/lib/mongodb";
import Product from "@/models/Product";

// 1. Define what the data looks like (TypeScript interface)
interface IProduct {
  _id: any;
  name: string;
  price: number;
}

// 2. YOU MUST USE 'export default' HERE
export default async function TestMenuPage() {
  try {
    // Connect to DB
    await connectDb();

    // Fetch products and convert to plain objects
    // Use .lean() to make it easier for Next.js to handle the data
    const products = await Product.find({}).lean() as IProduct[];

    return (
      <div className="p-10 font-sans">
        <h1 className="text-3xl font-bold mb-6">Database Connection Test</h1>
        
        {products.length === 0 ? (
          <p className="text-amber-600 bg-amber-50 p-4 rounded">
            Connected! But no items found. Make sure your collection name matches.
          </p>
        ) : (
          <div className="grid gap-4">
            {products.map((item) => (
              <div key={item._id.toString()} className="border p-4 rounded shadow-sm">
                <p className="font-bold text-lg">{item.name}</p>
                <p className="text-green-700">${item.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error: any) {
    return (
      <div className="p-10 text-red-500">
        <h1>Database Error</h1>
        <p>{error.message}</p>
      </div>
    );
  }
}