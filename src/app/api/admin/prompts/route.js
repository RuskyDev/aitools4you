import { supabase } from "@/utils/supabase/client";
import sharp from "sharp";
import { randomUUID } from "crypto";

async function checkAuth(req) {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return { error: "Unauthorized" };

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);
  if (error || !user) return { error: "Unauthorized" };

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || profile?.role !== "admin")
    return { error: "Unauthorized" };

  return { user };
}

export async function GET(req) {
  const auth = await checkAuth(req);
  if (auth.error)
    return new Response(JSON.stringify({ error: auth.error }), { status: 401 });
  const { data, error } = await supabase
    .from("Prompts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(req) {
  const auth = await checkAuth(req);
  if (auth.error)
    return new Response(JSON.stringify({ error: auth.error }), { status: 401 });

  const formData = await req.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const content = formData.get("content");
  const tags = JSON.parse(formData.get("tags") || "[]");
  const imageFile = formData.get("image");

  if (!title || !content || tags.length === 0)
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
    });

  const limitedTags = tags.slice(0, 3);
  let imageUrl = null;

  if (imageFile) {
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const webpBuffer = await sharp(buffer).webp().toBuffer();
    const fileName = `${randomUUID()}.webp`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("Images")
      .upload(`prompts/${fileName}`, webpBuffer, {
        cacheControl: "3600",
        upsert: false,
        contentType: "image/webp",
      });

    if (uploadError)
      return new Response(JSON.stringify({ error: uploadError.message }), {
        status: 400,
      });

    const { data: publicUrlData } = supabase.storage
      .from("Images")
      .getPublicUrl(`prompts/${fileName}`);

    imageUrl = publicUrlData.publicUrl;
  }

  const { data, error } = await supabase
    .from("Prompts")
    .insert([
      { title, description, content, tags: limitedTags, image_url: imageUrl },
    ])
    .select();

  if (error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });

  return new Response(JSON.stringify(data), { status: 200 });
}
