import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogout = () => {
  const router = useRouter();
  const supabase = createClient();

  const logout = async () => {
    try {
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw new Error(error.message);
      }

      // Explicitly clear Supabase cookies that start with "sb"
      // Get all cookies and remove those starting with "sb-"
      document.cookie.split(";").forEach(cookie => {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();

        if (name.startsWith("sb-")) {
          // Remove the cookie by setting expiration to past date
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
        }
      });

      // Also clear any other Supabase-related cookies
      const cookiesToClear = [
        "sb-access-token",
        "sb-refresh-token",
        "sb-uid",
        "sb-state",
        "sb-gym-app-auth-token", // Adjust this to your specific Supabase project name
      ];

      cookiesToClear.forEach(cookieName => {
        document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
      });

      // Clear localStorage items that might contain Supabase data
      if (typeof window !== 'undefined' && window.localStorage) {
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('sb:')) {
            localStorage.removeItem(key);
          }
        });
      }

      // Show success message
      toast.success("Successfully logged out!");

      // Redirect to login page
      router.push("/auth/login");
      router.refresh(); // Refresh to ensure state is updated
    } catch (error: any) {
      console.error("Logout error:", error);
      toast.error(error.message || "An error occurred during logout");
    }
  };

  return { logout };
};