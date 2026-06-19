import type { Metadata } from "next";
import { Playfair_Display, Crimson_Pro, Outfit, Space_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const crimson = Crimson_Pro({ subsets: ["latin"], variable: "--font-crimson" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "JanPrashna Admin Dashboard",
  description: "AI-Powered Citizen Question Intelligence Platform Dashboard",
};

import { Sidebar } from "../components/layout/Sidebar";
import { Header } from "../components/layout/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${crimson.variable} ${outfit.variable} ${spaceMono.variable}`}>
      <body className="antialiased font-sans flex h-screen overflow-hidden bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6 bg-background">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
