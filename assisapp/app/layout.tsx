import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import topbar from "@/component/topbar";


const inter = Inter({
  subsets: ["latin"],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {topbar()}
        {children}
      </body>
    </html>
  );
}

