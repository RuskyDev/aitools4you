'use client'

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/utils/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [logoSrc, setLogoSrc] = useState("/ai-tools-4-you-logo.svg");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    const userId = data.user.id;
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();

    setLoading(false);

    if (profileError || profile?.role !== "admin") {
      await supabase.auth.signOut();
      setErrorMsg("Access denied. You are not an admin.");
      return;
    }

    // Redirect to dashboard; Supabase stores session in browser automatically
    window.location.href = "/admin/dashboard";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background gap-4">
      <img
        src={logoSrc}
        alt="Logo"
        className="w-16 h-auto"
        onClick={() => setLogoSrc("/ai-tools-4-you-logo.png")}
      />
      <input
        type="text"
        placeholder="Username or Email"
        value={email}
        maxLength={50} 
        onChange={(e) => setEmail(e.target.value)}
        className="px-3 py-2 border border-border rounded focus:outline-none focus:ring focus:ring-primary w-80"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        maxLength={20} 
        onChange={(e) => setPassword(e.target.value)}
        className="px-3 py-2 border border-border rounded focus:outline-none focus:ring focus:ring-primary w-80"
      />
      {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
      <button
        onClick={handleLogin}
        disabled={loading}
        className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary-foreground hover:text-primary transition w-80 disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      <Link href="/" className="text-sm text-primary hover:underline">
        &larr; Go back to home page
      </Link>
    </div>
  );
}
