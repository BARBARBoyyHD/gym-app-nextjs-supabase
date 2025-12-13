"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  FaUserFriends,
  FaCreditCard,
  FaDollarSign,
  FaChartBar,
  FaUserCircle,
  FaSignOutAlt,
  FaGraduationCap,
} from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLogout } from "@/hooks/useLogout";

export function AppSidebar() {
  const pathname = usePathname();
  const { logout } = useLogout();

  // Nav items for the admin sidebar
  const navItems = [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: FaChartBar,
    },
    {
      title: "Members",
      url: "/admin/members",
      icon: FaUserFriends,
    },
    {
      title: "Create Member",
      url: "/admin/members/create",
      icon: FaUserCircle,
    },
    {
      title: "Membership Plans",
      url: "/admin/membership-plans",
      icon: FaCreditCard,
    },
    {
      title: "Memberships",
      url: "/admin/memberships",
      icon: FaDollarSign,
    },
    {
      title: "Courses",
      url: "/admin/courses",
      icon: FaGraduationCap,
    },
    {
      title: "Payments",
      url: "/admin/payments",
      icon: FaDollarSign,
    },
  ];

  return (
    <Sidebar className="border-r border-brand/30 bg-black/60 text-black">
      <SidebarHeader className="p-4 border-b border-brand/30 bg-black/90">
        <div className="flex items-center gap-3">
          <div className="bg-brand w-10 h-10 rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-xl">LU</span>
          </div>
          <div>
            <p className="text-lg font-bold text-white">
              Lift<span className="text-brand">Up</span>
            </p>
            <p className="text-xs text-white">Admin Dashboard</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-black/90">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`${
                        isActive
                          ? "bg-brand text-brand font-semibold text-black "
                          : "bg-brand-hover font-semibold text-white"
                      } transition-colors duration-200 w-full text-left`}
                    >
                      <Link href={item.url}>
                        <item.icon className="size-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto ">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="bg-brand-hover text-white w-full text-left">
                  <Link href="/admin/profile">
                    <FaUserCircle className="size-5" />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => logout()}
                  className="bg-brand-hover text-white w-full text-left"
                >
                  <FaSignOutAlt className="size-5" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
