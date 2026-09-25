-- Run this in the Supabase SQL Editor after creating the four tables.
-- Public users can submit data; only the server-side owner session can read it.

alter table public.quick_enquiries enable row level security;
alter table public.contact_messages enable row level security;
alter table public.trip_quotes enable row level security;
alter table public.ratings enable row level security;

drop policy if exists "Allow public quick enquiry submissions" on public.quick_enquiries;
create policy "Allow public quick enquiry submissions"
on public.quick_enquiries for insert to anon with check (true);

drop policy if exists "Allow public contact message submissions" on public.contact_messages;
create policy "Allow public contact message submissions"
on public.contact_messages for insert to anon with check (true);

drop policy if exists "Allow public trip quote submissions" on public.trip_quotes;
create policy "Allow public trip quote submissions"
on public.trip_quotes for insert to anon with check (true);

drop policy if exists "Allow public rating submissions" on public.ratings;
create policy "Allow public rating submissions"
on public.ratings for insert to anon with check (true);