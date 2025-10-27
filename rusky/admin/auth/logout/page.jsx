'use client'

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/utils/supabase/client";

export default function LogoutPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [loggingOut, setLoggingOut] = useState(true);

  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut();
      setLoggingOut(false);
      router.replace("/admin/auth/login");
    };

    logout();
  }, [router]);

  if (loggingOut) {
    // Bypass Layout redirect checks by rendering null
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <p className="text-muted-foreground">Logging out...</p>
    </div>
  );
}
