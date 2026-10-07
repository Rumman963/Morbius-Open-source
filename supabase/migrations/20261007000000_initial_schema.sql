-- Morbius catalog foundation. Apply through Supabase migrations once a project is connected.

create type public.component_status as enum ('draft', 'published');
create type public.component_access as enum ('free', 'pro');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null unique check (char_length(username) between 3 and 32),
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.components (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references auth.users (id) on delete cascade,
  slug text not null check (char_length(slug) between 2 and 80),
  title text not null check (char_length(title) between 2 and 120),
  description text not null default '' check (char_length(description) <= 2000),
  category text not null,
  framework text not null default 'react',
  styling text not null default 'css',
  source_code text not null default '',
  preview_config jsonb not null default '{}'::jsonb,
  status public.component_status not null default 'draft',
  access public.component_access not null default 'free',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (creator_id, slug)
);

create table public.collections (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  title text not null check (char_length(title) between 2 and 100),
  description text not null default '' check (char_length(description) <= 1000),
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.collection_components (
  collection_id uuid not null references public.collections (id) on delete cascade,
  component_id uuid not null references public.components (id) on delete cascade,
  position integer not null default 0,
  added_at timestamptz not null default now(),
  primary key (collection_id, component_id)
);

create table public.saved_components (
  user_id uuid not null references auth.users (id) on delete cascade,
  component_id uuid not null references public.components (id) on delete cascade,
  saved_at timestamptz not null default now(),
  primary key (user_id, component_id)
);

create index components_public_catalog_idx
  on public.components (category, created_at desc)
  where status = 'published' and access = 'free';

create index components_creator_idx on public.components (creator_id, updated_at desc);
create index collections_owner_idx on public.collections (owner_id, updated_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger components_set_updated_at
  before update on public.components
  for each row execute function public.set_updated_at();

create trigger collections_set_updated_at
  before update on public.collections
  for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.components enable row level security;
alter table public.collections enable row level security;
alter table public.collection_components enable row level security;
alter table public.saved_components enable row level security;

-- Profile cards expose only public creator metadata; users can edit their own profile.
create policy "Public profiles are readable"
  on public.profiles for select
  using (true);

create policy "Users create their own profile"
  on public.profiles for insert to authenticated
  with check (id = (select auth.uid()));

create policy "Users update their own profile"
  on public.profiles for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

-- Premium source stays private until a verified subscription entitlement is added.
create policy "Public can read published free components"
  on public.components for select
  using (status = 'published' and access = 'free');

create policy "Creators can read their own components"
  on public.components for select to authenticated
  using (creator_id = (select auth.uid()));

create policy "Creators can add their own components"
  on public.components for insert to authenticated
  with check (creator_id = (select auth.uid()));

create policy "Creators can update their own components"
  on public.components for update to authenticated
  using (creator_id = (select auth.uid()))
  with check (creator_id = (select auth.uid()));

create policy "Creators can delete their own components"
  on public.components for delete to authenticated
  using (creator_id = (select auth.uid()));

create policy "Users read their own or public collections"
  on public.collections for select
  using (is_public or owner_id = (select auth.uid()));

create policy "Users create their own collections"
  on public.collections for insert to authenticated
  with check (owner_id = (select auth.uid()));

create policy "Users update their own collections"
  on public.collections for update to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()));

create policy "Users delete their own collections"
  on public.collections for delete to authenticated
  using (owner_id = (select auth.uid()));

create policy "Collection items follow collection visibility"
  on public.collection_components for select
  using (
    exists (
      select 1 from public.collections
      where collections.id = collection_id
        and (collections.is_public or collections.owner_id = (select auth.uid()))
    )
  );

create policy "Owners manage collection items"
  on public.collection_components for all to authenticated
  using (
    exists (
      select 1 from public.collections
      where collections.id = collection_id
        and collections.owner_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1 from public.collections
      where collections.id = collection_id
        and collections.owner_id = (select auth.uid())
    )
  );

create policy "Users view their saved components"
  on public.saved_components for select to authenticated
  using (user_id = (select auth.uid()));

create policy "Users save their own components"
  on public.saved_components for insert to authenticated
  with check (user_id = (select auth.uid()));

create policy "Users remove their own saved components"
  on public.saved_components for delete to authenticated
  using (user_id = (select auth.uid()));
