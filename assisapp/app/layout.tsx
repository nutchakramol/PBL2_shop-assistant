import type { Metadata } from "next";
import "./globals.css";
import Topbar from "@/component/topbar";
import { CartProvider } from "@/contexts/cartcontext";
import localFont from "next/font/local";

// Geist Sans
const geistSans = localFont({
  src: "./fonts/Geist-Regular.woff2",
  variable: "--font-geist-sans",
});

// Geist Mono
const geistMono = localFont({
  src: "./fonts/GeistMono-Regular.woff2",
  variable: "--font-geist-mono",
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          <Topbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
