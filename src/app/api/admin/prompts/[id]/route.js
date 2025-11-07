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

export async function PATCH(req, context) {
  const auth = await checkAuth(req);
  if (auth.error)
    return new Response(JSON.stringify({ error: auth.error }), { status: 401 });

  const { id } = await context.params;
  const formData = await req.formData();
  const updates = {};
  
  for (const [key, value] of formData.entries()) {
    if (key === "image") {
      const file = value;
      const fileName = `${crypto.randomUUID()}.webp`;
      const buffer = Buffer.from(await file.arrayBuffer());
      const webpBuffer = await import("sharp").then(s => s.default(buffer).webp().toBuffer());
      
      const { error: uploadError } = await supabase.storage
        .from("Images")
        .upload(`prompts/${fileName}`, webpBuffer, {
          cacheControl: "3600",
          upsert: false,
          contentType: "image/webp",
        });
      if (uploadError) return new Response(JSON.stringify({ error: uploadError.message }), { status: 400 });

      const { data: publicUrlData } = supabase.storage
        .from("Images")
        .getPublicUrl(`prompts/${fileName}`);
      updates.image_url = publicUrlData.publicUrl;
    } else if (key === "tags") {
      updates[key] = JSON.parse(value);
    } else {
      updates[key] = value;
    }
  }

  const { error } = await supabase.from("Prompts").update(updates).eq("id", id);
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

export async function DELETE(req, context) {
  const auth = await checkAuth(req);
  if (auth.error)
    return new Response(JSON.stringify({ error: auth.error }), { status: 401 });

  const { id } = await context.params;
  const { error } = await supabase.from("Prompts").delete().eq("id", id);

  if (error)
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}