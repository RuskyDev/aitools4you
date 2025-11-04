import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    const { data: prompts, error: promptError } = await supabase
      .from("Prompts")
      .select("id, title, description, content, tags, created_at")
      .order("created_at", { ascending: false });

    if (promptError) throw promptError;

    const { data: allTags, error: tagError } = await supabase
      .from("Tags")
      .select("id, name");

    if (tagError) throw tagError;

    const tagMap = allTags.reduce((acc, tag) => {
      acc[tag.id] = tag.name;
      return acc;
    }, {});

    const formatted = prompts.map((p) => {
      const tagArray =
        typeof p.tags === "string"
          ? JSON.parse(p.tags)
          : Array.isArray(p.tags)
          ? p.tags
          : [];

      const tagNames = tagArray.map((t) => tagMap[t] || "Unknown");

      return {
        id: slugify(p.title || "untitled"),
        title: p.title,
        description: p.description,
        content: p.content,
        tags: tagNames,
        created_at: p.created_at,
      };
    });

    if (slug) {
      const prompt = formatted.find((p) => p.id === slug);
      if (!prompt)
        return NextResponse.json({ error: "Prompt not found" }, { status: 404 });
      return NextResponse.json(prompt, { status: 200 });
    }

    return NextResponse.json(formatted, { status: 200 });
  } catch (err) {
    console.error("Error fetching prompts:", err);
    return NextResponse.json({ error: "Failed to fetch prompts" }, { status: 500 });
  }
}
