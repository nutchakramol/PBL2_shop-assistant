import * as jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUserFromToken() {
  const cookieStore = await cookies();  // ✅ await here
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    return jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { id: string };
  } catch {
    return null;
  }
}
