'use client'

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./components/Sidebar";
import ProfileIcon from "./components/ProfileIcon";
import Dropdown from "./components/Dropdown";
import { supabase } from "@/utils/supabase/client";

export default function Layout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [session, setSession] = useState(null);

  const showAdminUI = !pathname.startsWith("/admin/auth");

  const profileItems = [
    {
      label: "Logout",
      onClick: async () => {
        await supabase.auth.signOut();
        router.replace("/admin/auth/login");
      },
    },
  ];

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      // Logged-in users should not access /admin/auth/*
      if (pathname.startsWith("/admin/auth") && session) {
        router.replace("/admin/dashboard");
        return;
      }

      // Protect /admin/dashboard/* pages
      if (pathname.startsWith("/admin/dashboard")) {
        if (!session) {
          router.replace("/admin/auth/login");
          return;
        }

        // Check if user is admin
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();

        if (error || profile?.role !== "admin") {
          router.replace("/admin/auth/login");
          return;
        }
      }

      setCheckingAuth(false);
    };

    checkAuth();
  }, [pathname, router]);

  if (checkingAuth) return null;

  return (
    <div className="flex min-h-screen bg-background">
      {showAdminUI && <Sidebar />}
      <div className={`${showAdminUI ? "ml-[280px]" : "ml-0"} flex-1 flex flex-col relative`}>
        {showAdminUI && (
          <div className="absolute top-4 right-4 z-10">
            <Dropdown
              label={<ProfileIcon name={session?.user?.email || "John Doe"} />}
              items={profileItems}
            />
          </div>
        )}
        <main>{children}</main>
      </div>
    </div>
  );
}
