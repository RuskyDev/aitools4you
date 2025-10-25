import { supabase } from "@/utils/supabase/client";

export async function PATCH(req, { params }) {
  const { id } = params;
  const { name } = await req.json();
  const { data, error } = await supabase.from("Tags").update({ name }).eq("id", id);
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  return new Response(JSON.stringify(data), { status: 200 });
}

export async function DELETE(req, { params }) {
  const { id } = params;
  const { data, error } = await supabase.from("Tags").delete().eq("id", id);
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  return new Response(JSON.stringify(data), { status: 200 });
}
