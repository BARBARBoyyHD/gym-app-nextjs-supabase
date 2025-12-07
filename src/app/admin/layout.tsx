import type { Metadata } from "next";
import { Poppins as PoppinsFont } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import AdminRootLayout from "./adminRootLayout";
import { TanstackProvider } from "@/utils/ReactQueryProviders";

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
    <TanstackProvider>
      <AdminRootLayout>{children}</AdminRootLayout>
    </TanstackProvider>
  );
}
