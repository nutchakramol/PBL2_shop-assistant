import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Topbar from "@/component/topbar"; 
import { CartProvider } from "@/contexts/cartcontext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen bg-[#fcf5ed] text-slate-900`}
      >
        {/* BACKGROUND LAYER 
            - fixed: stays in place while scrolling
            - inset-0: covers the whole screen
            - -z-10: stays behind everything
            - pointer-events-none: ensures buttons are still clickable
        */}
        <div 
          className="fixed inset-0 -z-6 w-full h-full pointer-events-none overflow-hidden"
          style={{ 
            backgroundImage: `url('/background-curve.svg')`, 
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat'
          }}
        />

        <CartProvider>
          {/* Topbar usually sits at the top (z-index should be high, like z-50) */}
          <Topbar />
          
          {/* MAIN CONTENT 
              - pt-24: adds padding at the top so the Topbar doesn't cover your content
          */}
          <main className="relative z-10   max-w-12xl mx-auto">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}