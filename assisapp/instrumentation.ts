export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const connectDb = (await import("./lib/mongodb")).default;
    await connectDb();
  }
}