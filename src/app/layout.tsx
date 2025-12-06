import type { Metadata } from "next";
import { Poppins as PoppinsFont } from "next/font/google";
import "./globals.css";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <TanstackProvider>{children}</TanstackProvider>
      </body>
    </html>
  );
}
