-- Supabase SQL schema for meeting room bookings

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  meeting_title text not null,
  date date not null,
  start_time time not null,
  end_time time not null,
  created_at timestamptz default now()
);
