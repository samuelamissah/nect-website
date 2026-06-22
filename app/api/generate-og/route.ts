import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import { createArticleOgImage } from "@/app/lib/og";
import { slugify } from "@/app/lib/slugify";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const title = String(body.title || "").trim();
    const excerpt = String(body.excerpt || "").trim();
    const category = String(body.category || "News").trim();
    const id = String(body.id || "").trim();

    if (!title || !id) {
      return NextResponse.json({ ok: false, error: "Missing title or id." }, { status: 400 });
    }

    const imageResponse = createArticleOgImage({ title, excerpt, category });
    const arrayBuffer = await imageResponse.arrayBuffer();
    const fileExt = "png";
    const filePath = `news-og/${id}-${slugify(title)}.${fileExt}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from("nect-media")
      .upload(filePath, arrayBuffer, { contentType: "image/png" });

    if (uploadError) {
      return NextResponse.json({ ok: false, error: uploadError.message }, { status: 500 });
    }

    const { data: urlData } = supabaseAdmin.storage
      .from("nect-media")
      .getPublicUrl(filePath);

    if (!urlData?.publicUrl) {
      return NextResponse.json({ ok: false, error: "Could not get public URL." }, { status: 500 });
    }

    return NextResponse.json({ ok: true, ogImageUrl: urlData.publicUrl });
  } catch (error) {
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
