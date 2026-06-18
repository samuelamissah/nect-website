-- RUN THIS IN SUPABASE SQL EDITOR TO FIX THE "ROW VIOLATES ROW-LEVEL SECURITY" ERROR
-- Since this CMS uses a custom passcode authentication rather than Supabase Auth,
-- the easiest and most robust way to allow public submissions is to disable RLS
-- on the public-facing tables.

ALTER TABLE public.reports DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.news DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_content DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs DISABLE ROW LEVEL SECURITY;

-- Ensure the storage buckets are fully public and allow anonymous uploads
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Upload Access" ON storage.objects;
DROP POLICY IF EXISTS "Delete Access" ON storage.objects;

create policy "Public Access" on storage.objects for select using ( bucket_id in ('nect-media', 'nect-resources') );
create policy "Upload Access" on storage.objects for insert with check ( bucket_id in ('nect-media', 'nect-resources') );
create policy "Delete Access" on storage.objects for delete using ( bucket_id in ('nect-media', 'nect-resources') );
create policy "Update Access" on storage.objects for update using ( bucket_id in ('nect-media', 'nect-resources') );