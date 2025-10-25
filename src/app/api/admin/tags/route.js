import { supabase } from "@/utils/supabase/client";

export async function GET() {
  const { data, error } = await supabase.from("Tags").select("*").order("name");
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(req) {
  const { name } = await req.json();
  if (!name) return new Response(JSON.stringify({ error: "Name is required" }), { status: 400 });
  const { data, error } = await supabase.from("Tags").insert([{ name }]);
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  return new Response(JSON.stringify(data), { status: 200 });
}
