-- Run this SQL in your Supabase SQL Editor to set up the CMS completely.

-- 1. Create Storage Buckets
insert into storage.buckets (id, name, public) values ('nect-media', 'nect-media', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('nect-resources', 'nect-resources', true) on conflict (id) do nothing;

-- Allow public access to read files
create policy "Public Access" on storage.objects for select using ( bucket_id in ('nect-media', 'nect-resources') );

-- Allow authenticated users (or anyone for this demo) to upload
create policy "Upload Access" on storage.objects for insert with check ( bucket_id in ('nect-media', 'nect-resources') );
create policy "Delete Access" on storage.objects for delete using ( bucket_id in ('nect-media', 'nect-resources') );


-- 2. Create/Update News Table
CREATE TABLE IF NOT EXISTS public.news (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT,
    category TEXT,
    excerpt TEXT,
    content TEXT,
    image_url TEXT,
    author TEXT DEFAULT 'Admin',
    status TEXT DEFAULT 'Published',
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Create Videos Table
CREATE TABLE IF NOT EXISTS public.videos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT,
    category TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. Create Resources Table
CREATE TABLE IF NOT EXISTS public.resources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT,
    description TEXT,
    file_url TEXT NOT NULL,
    file_type TEXT,
    file_size TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. Create/Update Reports Table
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    reference TEXT UNIQUE,
    report_type TEXT,
    anonymous BOOLEAN DEFAULT true,
    full_name TEXT,
    phone TEXT,
    email TEXT,
    location TEXT,
    description TEXT,
    photo_url TEXT,
    status TEXT DEFAULT 'Submitted',
    assigned_to TEXT,
    internal_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 6. Create Audit Logs Table
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_name TEXT,
    action TEXT,
    module TEXT,
    ip_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 7. Create Homepage Content Table
CREATE TABLE IF NOT EXISTS public.homepage_content (
    id TEXT PRIMARY KEY, -- e.g., 'hero_title', 'about_text'
    value TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Disable Row Level Security temporarily for ease of use in the CMS (or set up proper policies)
ALTER TABLE public.news DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_content DISABLE ROW LEVEL SECURITY;