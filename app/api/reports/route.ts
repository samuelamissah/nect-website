import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Allow service to accept queued reports from SW or client
    const { reference, report_type, anonymous, full_name, phone, email, location, description, photo_url } = body;
    const { error } = await supabase.from('reports').insert({
      reference, report_type, anonymous, full_name, phone, email, location, description, photo_url, status: 'Submitted'
    });
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
