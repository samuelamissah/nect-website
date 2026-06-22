import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import { slugify } from "@/app/lib/slugify";
import { createArticleOgImage } from "@/app/lib/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

function resolveArticleId(rawId: string) {
  const uuidMatch = String(rawId || "").match(
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/
  );

  if (uuidMatch) return uuidMatch[0];
  if (rawId && rawId.includes("-")) return rawId.split("-")[0];
  return rawId;
}

export default async function Image({ params }: { params: { id: string } }) {
  const id = resolveArticleId(params.id);

  const { data: article } = await supabaseAdmin
    .from("news")
    .select("title, excerpt, category")
    .eq("id", id)
    .single();

  return createArticleOgImage({
    title: article?.title || "NECT News",
    excerpt: article?.excerpt || "National Engineering Coordinating Team",
    category: article?.category || "News",
  });
}