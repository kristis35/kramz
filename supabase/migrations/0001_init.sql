-- kramz.lt MVP: laukiančiųjų sąrašas + paprasta analitika.
-- Paleiskite Supabase SQL Editor'iuje arba `supabase db push`.

create extension if not exists citext;

create table if not exists public.waitlist_signups (
  id                bigint generated always as identity primary key,
  email             citext not null unique,
  answers           jsonb  not null default '{}'::jsonb,  -- apklausos atsakymai {klausimo_id: reikšmė}
  consent_privacy   boolean not null,
  consent_marketing boolean not null default false,
  consent_version   text not null,
  utm_source        text,
  utm_medium        text,
  utm_campaign      text,
  referrer          text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz
);

create table if not exists public.events (
  id           bigint generated always as identity primary key,
  type         text not null check (type in ('page_view', 'cta_click', 'form_start', 'signup')),
  path         text,
  referrer     text,
  utm_source   text,
  utm_medium   text,
  utm_campaign text,
  created_at   timestamptz not null default now()
);

create index if not exists events_type_created_idx on public.events (type, created_at);
create index if not exists signups_created_idx on public.waitlist_signups (created_at desc);

-- RLS įjungtas be jokių politikų: anoniminiai / naršyklės klientai negali nei skaityti,
-- nei rašyti. Visi įrašai daromi tik serveryje su service_role raktu.
alter table public.waitlist_signups enable row level security;
alter table public.events enable row level security;
