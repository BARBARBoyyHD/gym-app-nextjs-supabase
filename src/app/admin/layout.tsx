import type { Metadata } from "next";
import { Poppins as PoppinsFont } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";

// INISIALISASI FONT
const poppins = PoppinsFont({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "LiftUp Gym",
  description: "Modern Gym & Fitness Platform",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased bg-black text-white`}>
        <Navbar />
        <div className="max-w-6xl mx-auto px-4">{children}</div>
      </body>
    </html>
  );
}
