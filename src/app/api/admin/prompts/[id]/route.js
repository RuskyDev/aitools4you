import { supabase } from "@/utils/supabase/client";

export async function PATCH(req, { params }) {
  const { id } = params;
  const { title, description, content, tags } = await req.json();

  const limitedTags = Array.isArray(tags) ? tags.slice(0, 3) : [];

  const { data, error } = await supabase
    .from("Prompts")
    .update({ title, description, content, tags: limitedTags })
    .eq("id", id)
    .select();

  if (error)
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });

  return new Response(JSON.stringify(data), { status: 200 });
}

export async function DELETE(req, { params }) {
  const { id } = params;

  const { error } = await supabase.from("Prompts").delete().eq("id", id);

  if (error)
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
