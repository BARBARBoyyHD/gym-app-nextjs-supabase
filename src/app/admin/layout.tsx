import type { Metadata } from "next";
import "../globals.css";
import AdminRootLayout from "./adminRootLayout";
import { TanstackProvider } from "@/utils/ReactQueryProviders";

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
