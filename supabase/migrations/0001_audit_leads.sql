-- Free AI Audit lead capture
-- Stores a row per completed audit (the email-gated step in /api/audit-submit).
-- Run in the Supabase SQL editor or via `supabase db push`.

create extension if not exists "pgcrypto";

create table if not exists public.audit_leads (
  id                uuid primary key default gen_random_uuid(),
  name              text not null,
  email             text not null,
  phone             text,
  business          text,
  business_type     text,
  pain_point        text,
  scanned_url       text,
  audit_score       integer,
  recommendations   jsonb,
  report_source     text,
  source            text default 'free-ai-audit',
  created_at        timestamptz not null default now()
);

create index if not exists audit_leads_created_at_idx on public.audit_leads (created_at desc);
create index if not exists audit_leads_email_idx on public.audit_leads (email);

-- Row Level Security: the public site uses the anon key, so allow anonymous
-- INSERTs only. No anon SELECT/UPDATE/DELETE, leads stay private and are read
-- with the service role from the dashboard / internal tooling.
alter table public.audit_leads enable row level security;

drop policy if exists "audit_leads_anon_insert" on public.audit_leads;
create policy "audit_leads_anon_insert"
  on public.audit_leads
  for insert
  to anon
  with check (true);
