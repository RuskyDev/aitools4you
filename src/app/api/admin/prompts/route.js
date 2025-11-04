import { supabase } from "@/utils/supabase/client";

export async function GET() {
  const { data, error } = await supabase
    .from("Prompts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error)
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });

  return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(req) {
  const { title, description, content, tags } = await req.json();

  if (!title || !content || !Array.isArray(tags) || tags.length === 0)
    return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });

  const limitedTags = tags.slice(0, 3);

  const { data, error } = await supabase
    .from("Prompts")
    .insert([{ title, description, content, tags: limitedTags }])
    .select();

  if (error)
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });

  return new Response(JSON.stringify(data), { status: 200 });
}
