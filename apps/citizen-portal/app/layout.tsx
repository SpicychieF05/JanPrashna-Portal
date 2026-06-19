import type { Metadata } from "next";
import { Playfair_Display, Crimson_Pro, Outfit, Space_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const crimson = Crimson_Pro({ subsets: ["latin"], variable: "--font-crimson" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "JanPrashna Portal",
  description: "AI-Powered Citizen Question Intelligence Platform for West Bengal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${crimson.variable} ${outfit.variable} ${spaceMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
