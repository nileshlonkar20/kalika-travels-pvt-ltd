-- Run this in the Supabase SQL Editor.
-- It extends the existing enquiries table for every website form.

alter table public.enquiries
  add column if not exists email text,
  add column if not exists message text,
  add column if not exists from_location text,
  add column if not exists to_location text,
  add column if not exists source text not null default 'callback';

update public.enquiries
set source = 'callback'
where source is null;

alter table public.enquiries enable row level security;

drop policy if exists "Allow public enquiry submissions" on public.enquiries;
create policy "Allow public enquiry submissions"
on public.enquiries
for insert
to anon
with check (true);