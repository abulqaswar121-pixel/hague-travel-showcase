create type public.app_role as enum ('admin', 'staff', 'customer');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create or replace function public.is_staff(_user_id uuid)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role in ('admin','staff')) $$;

create policy "Own profile read" on public.profiles for select to authenticated using (auth.uid() = id or public.is_staff(auth.uid()));
create policy "Own profile insert" on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "Own profile update" on public.profiles for update to authenticated using (auth.uid() = id);
create policy "Own roles read" on public.user_roles for select to authenticated using (auth.uid() = user_id or public.has_role(auth.uid(),'admin'));

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name) values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'));
  insert into public.user_roles (user_id, role) values (new.id, 'customer');
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  end if;
  return new;
end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  reference text not null,
  service text not null,
  full_name text,
  email text,
  phone text,
  details jsonb not null default '{}'::jsonb,
  status text not null default 'New',
  user_id uuid,
  created_at timestamptz not null default now()
);
grant insert on public.enquiries to anon;
grant select, insert, update, delete on public.enquiries to authenticated;
grant all on public.enquiries to service_role;
alter table public.enquiries enable row level security;
create policy "Anyone can send an enquiry" on public.enquiries for insert to anon, authenticated with check (status = 'New' and (user_id is null or user_id = auth.uid()));
create policy "Owner or staff read enquiries" on public.enquiries for select to authenticated using (user_id = auth.uid() or public.is_staff(auth.uid()));
create policy "Staff update enquiries" on public.enquiries for update to authenticated using (public.is_staff(auth.uid()));
create policy "Admin delete enquiries" on public.enquiries for delete to authenticated using (public.has_role(auth.uid(),'admin'));

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  reference text not null,
  package_slug text not null,
  package_title text not null,
  full_name text not null,
  email text not null,
  phone text not null,
  travellers int not null default 1,
  room text,
  payment_method text,
  total_ngn numeric not null default 0,
  deposit_ngn numeric not null default 0,
  paid_ngn numeric not null default 0,
  notes text,
  status text not null default 'Pending',
  user_id uuid,
  created_at timestamptz not null default now()
);
grant insert on public.bookings to anon;
grant select, insert, update, delete on public.bookings to authenticated;
grant all on public.bookings to service_role;
alter table public.bookings enable row level security;
create policy "Anyone can request a booking" on public.bookings for insert to anon, authenticated with check (status = 'Pending' and paid_ngn = 0 and (user_id is null or user_id = auth.uid()));
create policy "Owner or staff read bookings" on public.bookings for select to authenticated using (user_id = auth.uid() or public.is_staff(auth.uid()));
create policy "Staff update bookings" on public.bookings for update to authenticated using (public.is_staff(auth.uid()));
create policy "Admin delete bookings" on public.bookings for delete to authenticated using (public.has_role(auth.uid(),'admin'));