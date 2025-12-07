"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { AppSidebar } from "@/components/SideBarAdmin";
import React from "react";

interface ClientAdminLayoutProps {
  children: React.ReactNode;
}

/**
 * ClientAdminLayout wraps the core admin content with the Sidebar
 * provider, the sidebar component, and applies the background/glass
 * pane styling, ensuring these stateful elements are client-rendered.
 */
export default function AdminRootLayout({
  children,
}: ClientAdminLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main
        className={`
          antialiased 
          bg-image-full 
          min-h-screen 
          flex-1 
          relative 
           backdrop-blur-lg bg-black/10"
           pl-0
        `}
      >
        {/* The glass pane effect wrapper */}
        <div className="min-h-screen ">
          <SidebarTrigger />
          {children}
        </div>
        <Toaster richColors position="top-right" />
      </main>
    </SidebarProvider>
  );
}