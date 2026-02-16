import type { Metadata } from "next";
import "./globals.css";
import Topbar from "@/component/topbar";
import { CartProvider } from "@/contexts/cartcontext";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AssisApp",
  description: "Restaurant Ordering System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <CartProvider>
          <Topbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
