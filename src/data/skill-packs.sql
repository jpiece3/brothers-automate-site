-- ─────────────────────────────────────────────────────────────────────────
-- skill_pack_signups
-- Email captures from /resources/skill-packs (Operator's Catalog).
-- Run this once in the brothersautomate Supabase project (SQL Editor).
-- ─────────────────────────────────────────────────────────────────────────

create table if not exists public.skill_pack_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now(),
  source text not null default 'skill-packs-resource-page',
  user_agent text,
  referrer text
);

-- one row per unique email — duplicate submits should be detected and treated as success on the client
create unique index if not exists skill_pack_signups_email_unique
  on public.skill_pack_signups (lower(email));

create index if not exists skill_pack_signups_created_at_idx
  on public.skill_pack_signups (created_at desc);

-- RLS: anon can INSERT only. Cannot SELECT, UPDATE, or DELETE.
alter table public.skill_pack_signups enable row level security;

drop policy if exists "anon insert skill pack signups" on public.skill_pack_signups;
create policy "anon insert skill pack signups"
  on public.skill_pack_signups
  for insert
  to anon
  with check (
    -- basic email sanity check at the DB level
    email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    and length(email) <= 320
    and length(coalesce(user_agent, '')) <= 500
    and length(coalesce(referrer, '')) <= 500
  );

-- (Optional) grant SELECT to a "leads_admin" role if/when you set one up.
-- For now, only the service role / dashboard sees the rows.

-- Verify:
-- select count(*) from public.skill_pack_signups;
