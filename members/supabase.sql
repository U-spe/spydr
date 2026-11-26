-- Spydr Members data layer
-- Run once in the Supabase SQL Editor for project bxsiniqhswmiokqshcgi.
-- Public profile fields are readable by signed-in members. Private activity and bookmarks are owner-only.

create extension if not exists pgcrypto;

create table if not exists public.member_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Member' check (char_length(display_name) between 1 and 28),
  avatar_url text,
  bio text not null default '' check (char_length(bio) <= 180),
  status text not null default 'online' check (status in ('online','away','busy','invisible')),
  accent text not null default '#d7d8dc',
  updated_at timestamptz not null default now()
);

create table if not exists public.member_bookmarks (
  user_id uuid not null references auth.users(id) on delete cascade,
  app_id text not null,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  primary key (user_id, app_id)
);

create table if not exists public.member_friend_requests (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references auth.users(id) on delete cascade,
  receiver_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending','accepted','declined')),
  created_at timestamptz not null default now(),
  responded_at timestamptz,
  constraint member_friend_request_not_self check (sender_id <> receiver_id)
);

create unique index if not exists member_friend_requests_pending_pair
  on public.member_friend_requests (sender_id, receiver_id) where status = 'pending';

create table if not exists public.member_friendships (
  user_id uuid not null references auth.users(id) on delete cascade,
  friend_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, friend_id),
  constraint member_friendship_not_self check (user_id <> friend_id)
);

create table if not exists public.member_activity (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  event_type text not null,
  detail text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists member_activity_user_created
  on public.member_activity (user_id, created_at desc);

alter table public.member_profiles enable row level security;
alter table public.member_bookmarks enable row level security;
alter table public.member_friend_requests enable row level security;
alter table public.member_friendships enable row level security;
alter table public.member_activity enable row level security;

drop policy if exists "Members can view profiles" on public.member_profiles;
create policy "Members can view profiles" on public.member_profiles
  for select to authenticated using (true);
drop policy if exists "Members can insert own profile" on public.member_profiles;
create policy "Members can insert own profile" on public.member_profiles
  for insert to authenticated with check (user_id = auth.uid());
drop policy if exists "Members can update own profile" on public.member_profiles;
create policy "Members can update own profile" on public.member_profiles
  for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "Members manage own bookmarks" on public.member_bookmarks;
create policy "Members manage own bookmarks" on public.member_bookmarks
  for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "Members view own friend requests" on public.member_friend_requests;
create policy "Members view own friend requests" on public.member_friend_requests
  for select to authenticated using (sender_id = auth.uid() or receiver_id = auth.uid());

drop policy if exists "Members view own friendships" on public.member_friendships;
create policy "Members view own friendships" on public.member_friendships
  for select to authenticated using (user_id = auth.uid());

drop policy if exists "Members manage own activity" on public.member_activity;
create policy "Members manage own activity" on public.member_activity
  for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

create or replace function public.member_send_friend_request(target_id uuid)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  actor_id uuid := auth.uid();
  reverse_request_id uuid;
begin
  if actor_id is null then
    raise exception 'Authentication required';
  end if;
  if target_id is null or target_id = actor_id then
    raise exception 'Invalid member ID';
  end if;
  if not exists (select 1 from public.member_profiles where user_id = target_id) then
    raise exception 'Member profile not found';
  end if;
  if exists (select 1 from public.member_friendships where user_id = actor_id and friend_id = target_id) then
    return 'friends';
  end if;

  select id into reverse_request_id
  from public.member_friend_requests
  where sender_id = target_id and receiver_id = actor_id and status = 'pending'
  limit 1;

  if reverse_request_id is not null then
    update public.member_friend_requests
      set status = 'accepted', responded_at = now()
      where id = reverse_request_id;
    insert into public.member_friendships (user_id, friend_id)
      values (actor_id, target_id), (target_id, actor_id)
      on conflict do nothing;
    return 'accepted';
  end if;

  insert into public.member_friend_requests (sender_id, receiver_id)
  values (actor_id, target_id)
  on conflict (sender_id, receiver_id) where status = 'pending' do nothing;
  return 'sent';
end;
$$;

create or replace function public.member_respond_friend_request(request_id uuid, accept boolean)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  actor_id uuid := auth.uid();
  request_row public.member_friend_requests%rowtype;
begin
  if actor_id is null then
    raise exception 'Authentication required';
  end if;
  select * into request_row
  from public.member_friend_requests
  where id = request_id and receiver_id = actor_id and status = 'pending'
  for update;

  if not found then
    raise exception 'Friend request not found';
  end if;

  update public.member_friend_requests
    set status = case when accept then 'accepted' else 'declined' end,
        responded_at = now()
    where id = request_id;

  if accept then
    insert into public.member_friendships (user_id, friend_id)
      values (actor_id, request_row.sender_id), (request_row.sender_id, actor_id)
      on conflict do nothing;
  end if;
  return accept;
end;
$$;

create or replace function public.member_remove_friend(target_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  actor_id uuid := auth.uid();
begin
  if actor_id is null then
    raise exception 'Authentication required';
  end if;
  delete from public.member_friendships
    where (user_id = actor_id and friend_id = target_id)
       or (user_id = target_id and friend_id = actor_id);
  return found;
end;
$$;

revoke all on function public.member_send_friend_request(uuid) from public;
revoke all on function public.member_respond_friend_request(uuid, boolean) from public;
revoke all on function public.member_remove_friend(uuid) from public;
grant execute on function public.member_send_friend_request(uuid) to authenticated;
grant execute on function public.member_respond_friend_request(uuid, boolean) to authenticated;
grant execute on function public.member_remove_friend(uuid) to authenticated;

create or replace function public.member_create_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.member_profiles (user_id, display_name)
  values (
    new.id,
    coalesce(nullif(left(new.raw_user_meta_data ->> 'display_name', 28), ''), split_part(new.email, '@', 1), 'Member')
  )
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists member_auth_user_created on auth.users;
create trigger member_auth_user_created
  after insert on auth.users
  for each row execute function public.member_create_profile();
