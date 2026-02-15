import { redirect } from "next/navigation";
import { getUserFromToken } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromToken();

  if (!user) {
    redirect("/signin");
  }

  return <>{children}</>;
}
