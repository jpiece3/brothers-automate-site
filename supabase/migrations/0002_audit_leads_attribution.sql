-- Additive migration: attribution + questionnaire metadata for audit_leads.
--
-- Adds two nullable columns so existing rows and the existing
-- /api/audit-submit insert keep working unchanged:
--   intent    - which offer the lead came through
--               (website_audit | workflow_audit | workflow_sprint | clinic_host)
--   metadata  - jsonb blob holding referral/UTM attribution and the
--               AI Workflow Scorecard answers
--
-- Target project: Brothers Automate (ghoomqpsgdtvffielnaq)
--   URL: https://ghoomqpsgdtvffielnaq.supabase.co
--
-- Run in that project's SQL Editor, or:
--   supabase link --project-ref ghoomqpsgdtvffielnaq
--   supabase db push

alter table public.audit_leads
  add column if not exists intent text,
  add column if not exists metadata jsonb;

comment on column public.audit_leads.intent is
  'Funnel intent: website_audit | workflow_audit | workflow_sprint | clinic_host';
comment on column public.audit_leads.metadata is
  'Attribution (ref/event/utm) and AI Workflow Scorecard answers';

-- The existing anon INSERT policy already covers new columns; no RLS changes.
