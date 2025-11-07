import { supabase } from "@/utils/supabase/client";

async function checkAuth(req) {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return { error: "Unauthorized" };

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return { error: "Unauthorized" };

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || profile?.role !== "admin") return { error: "Unauthorized" };

  return { user };
}

export async function GET(req) {
  const auth = await checkAuth(req);
  if (auth.error)
    return new Response(JSON.stringify({ error: auth.error }), { status: 401 });

  const { data, error } = await supabase
    .from("Tags")
    .select("id, name, type, created_at")
    .order("name");

  if (error)
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });

  return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(req) {
  const auth = await checkAuth(req);
  if (auth.error)
    return new Response(JSON.stringify({ error: auth.error }), { status: 401 });

  const { name, type } = await req.json();
  if (!name)
    return new Response(JSON.stringify({ error: "Name is required" }), { status: 400 });

  const { data: existing } = await supabase
    .from("Tags")
    .select("id")
    .eq("name", name)
    .maybeSingle();

  if (existing)
    return new Response(JSON.stringify({ error: "A tag with this name already exists" }), { status: 409 });

  const tagTypes = Array.isArray(type) ? type : [type];

  const { data, error } = await supabase.from("Tags").insert([{ name, type: tagTypes }]);
  if (error)
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });

  return new Response(JSON.stringify(data), { status: 200 });
}

export async function PATCH(req) {
  const auth = await checkAuth(req);
  if (auth.error)
    return new Response(JSON.stringify({ error: auth.error }), { status: 401 });

  const { id, name, type } = await req.json();
  if (!id)
    return new Response(JSON.stringify({ error: "Tag ID is required" }), { status: 400 });

  const { data: existing } = await supabase.from("Tags").select("id").eq("id", id).single();
  if (!existing)
    return new Response(JSON.stringify({ error: "Tag not found" }), { status: 404 });

  const { data: duplicate } = await supabase
    .from("Tags")
    .select("id")
    .eq("name", name)
    .neq("id", id)
    .maybeSingle();

  if (duplicate)
    return new Response(JSON.stringify({ error: "A tag with this name already exists" }), { status: 409 });

  const tagTypes = Array.isArray(type) ? type : [type];

  const { data, error } = await supabase
    .from("Tags")
    .update({ name, type: tagTypes })
    .eq("id", id);

  if (error)
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });

  return new Response(JSON.stringify(data), { status: 200 });
}

export async function DELETE(req) {
  const auth = await checkAuth(req);
  if (auth.error)
    return new Response(JSON.stringify({ error: auth.error }), { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id)
    return new Response(JSON.stringify({ error: "Tag ID is required" }), { status: 400 });

  const { data: existing } = await supabase.from("Tags").select("id").eq("id", id).single();
  if (!existing)
    return new Response(JSON.stringify({ error: "Tag not found" }), { status: 404 });

  const { data, error } = await supabase.from("Tags").delete().eq("id", id);
  if (error)
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });

  return new Response(JSON.stringify(data), { status: 200 });
}
