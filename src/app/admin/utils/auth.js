import { supabase } from "@/utils/supabase/client";

export const checkSession = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
};

export const getAuthHeaders = (session) => {
  if (!session) return {};
  return { Authorization: `Bearer ${session.access_token}` };
};