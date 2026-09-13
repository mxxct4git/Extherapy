create extension if not exists pgcrypto;

create table if not exists public.membership_applications (
  id uuid primary key default gen_random_uuid(),
  reference_number text not null unique,
  status text not null default 'submitted'
    check (status in ('submitted', 'under_review', 'approved', 'rejected', 'withdrawn')),
  preferred_language text not null default 'zh'
    check (preferred_language in ('zh', 'en')),
  name_chinese text,
  name_english text not null,
  gender text not null
    check (gender in ('female', 'male', 'non_binary', 'prefer_not_to_say')),
  date_of_birth date not null,
  contact_number text not null,
  email text not null,
  residential_address text not null,
  mailing_address text not null,
  membership_type text not null
    check (membership_type in ('ordinary', 'professional')),
  professional_background text,
  declaration_accepted boolean not null
    check (declaration_accepted = true),
  declaration_version text not null,
  signed_at timestamptz not null,
  signature_storage_path text not null,
  signature_mime_type text not null default 'image/webp',
  signature_size_bytes integer not null
    check (signature_size_bytes > 0 and signature_size_bytes <= 512000),
  payment_status text not null default 'pending'
    check (payment_status in ('pending', 'proof_submitted', 'confirmed', 'waived')),
  payment_reference text,
  payment_receipt_storage_path text,
  payment_receipt_mime_type text,
  payment_receipt_size_bytes integer
    check (payment_receipt_size_bytes is null or payment_receipt_size_bytes > 0),
  payment_receipt_uploaded_at timestamptz,
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id) on delete set null,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint membership_name_chinese_length check (char_length(coalesce(name_chinese, '')) <= 120),
  constraint membership_name_english_length check (char_length(name_english) between 1 and 120),
  constraint membership_phone_length check (char_length(contact_number) between 6 and 30),
  constraint membership_email_length check (char_length(email) between 3 and 254),
  constraint membership_residential_address_length check (char_length(residential_address) between 1 and 500),
  constraint membership_mailing_address_length check (char_length(mailing_address) between 1 and 500),
  constraint membership_background_length check (char_length(coalesce(professional_background, '')) <= 2000)
);

create index if not exists membership_applications_email_submitted_idx
  on public.membership_applications (email, submitted_at desc);
create index if not exists membership_applications_status_submitted_idx
  on public.membership_applications (status, submitted_at desc);

create or replace function public.set_membership_application_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_membership_application_updated_at on public.membership_applications;
create trigger set_membership_application_updated_at
before update on public.membership_applications
for each row execute function public.set_membership_application_updated_at();

alter table public.membership_applications enable row level security;

revoke all on table public.membership_applications from anon, authenticated;
grant select, update on table public.membership_applications to authenticated;

drop policy if exists "Membership admins can read applications" on public.membership_applications;
create policy "Membership admins can read applications"
on public.membership_applications
for select
to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'membership_admin');

drop policy if exists "Membership admins can update applications" on public.membership_applications;
create policy "Membership admins can update applications"
on public.membership_applications
for update
to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'membership_admin')
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'membership_admin');

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'membership-signatures',
  'membership-signatures',
  false,
  512000,
  array['image/webp', 'image/png']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'membership-payment-receipts',
  'membership-payment-receipts',
  false,
  5242880,
  array['image/webp', 'image/png', 'image/jpeg', 'application/pdf']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Membership admins can read signatures" on storage.objects;
create policy "Membership admins can read signatures"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'membership-signatures'
  and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'membership_admin'
);

drop policy if exists "Membership admins can read payment receipts" on storage.objects;
create policy "Membership admins can read payment receipts"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'membership-payment-receipts'
  and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'membership_admin'
);

comment on table public.membership_applications is
  'Private CMETA membership applications. Public submissions are accepted only through the submit-membership Edge Function.';
