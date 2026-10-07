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
  creator_id uuid references auth.users (id) on delete set null,
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

-- Seed the public starter catalog. A null creator_id marks Morbius-curated entries;
-- user-created components must always belong to an authenticated creator.
insert into public.components (
  creator_id, slug, title, description, category, framework, styling,
  source_code, preview_config, status, access
) values
(
  null, 'crimson-button', 'Crimson launch button',
  'A glossy, high-contrast action button with a soft lift on hover.',
  'component', 'React', 'Tailwind CSS',
  $source$export function CrimsonButton() {
  return (
    <button className="rounded-xl bg-gradient-to-br from-rose-500 to-red-700 px-5 py-3 font-semibold text-white shadow-lg shadow-red-950/20 transition hover:-translate-y-0.5">
      Launch project <span aria-hidden="true">↗</span>
    </button>
  );
}$source$,
  $json${"style":"Glass","visual":"button","accent":"#cf182b","previewTitle":"Make an entrance.","previewCopy":"One clear action. A little extra shine.","previewAction":"Launch project"}$json$::jsonb,
  'published', 'free'
),
(
  null, 'after-hours-auth', 'After-hours sign in',
  'A calm, welcoming sign-in panel with room for your own auth flow.',
  'block', 'Next.js', 'Tailwind CSS',
  $source$export function SignInCard() {
  return (
    <form className="w-full max-w-sm rounded-3xl border border-white/70 bg-white/75 p-8 shadow-2xl shadow-rose-950/10 backdrop-blur-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-700">Welcome back</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">Enter the after hours.</h2>
      <label className="mt-7 block text-sm text-zinc-700" htmlFor="email">Email</label>
      <input className="mt-2 w-full rounded-xl border border-zinc-200 bg-white/80 px-4 py-3 outline-none focus:border-red-500" id="email" type="email" placeholder="you@example.com" />
      <button className="mt-5 w-full rounded-xl bg-red-700 px-4 py-3 font-semibold text-white transition hover:bg-red-600" type="submit">Continue</button>
    </form>
  );
}$source$,
  $json${"style":"Glass","visual":"auth","accent":"#bf1429","previewTitle":"Welcome back.","previewCopy":"Your next idea is waiting after dark.","previewAction":"Continue with email"}$json$::jsonb,
  'published', 'free'
),
(
  null, 'soft-pricing', 'The soft launch pricing block',
  'A transparent plan card for introducing a free tier and what comes next.',
  'block', 'React', 'Tailwind CSS',
  $source$export function PricingCard() {
  return (
    <article className="max-w-sm rounded-3xl border border-zinc-200 bg-white p-7 shadow-xl shadow-zinc-900/5">
      <p className="text-sm font-medium text-red-700">Free forever</p>
      <h2 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950">$0 / month</h2>
      <p className="mt-3 text-sm leading-6 text-zinc-600">Everything you need to find your starting point.</p>
      <button className="mt-7 w-full rounded-xl border border-zinc-300 px-4 py-3 font-semibold text-zinc-900">Explore the library</button>
    </article>
  );
}$source$,
  $json${"style":"Editorial","visual":"pricing","accent":"#c92b3e","previewTitle":"Start with the essentials.","previewCopy":"Free to explore. Room to grow.","previewAction":"Choose this plan"}$json$::jsonb,
  'published', 'free'
),
(
  null, 'midnight-stats', 'Midnight stats panel',
  'A compact dashboard card for activity, progress, or a small set of metrics.',
  'component', 'Next.js', 'Tailwind CSS',
  $source$export function StatsCard() {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white/85 p-6 shadow-lg shadow-zinc-900/5 backdrop-blur-xl">
      <p className="text-sm text-zinc-500">Projects shipped</p>
      <div className="mt-3 flex items-end justify-between">
        <strong className="text-4xl font-semibold tracking-tight text-zinc-950">24</strong>
        <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700">+12.8%</span>
      </div>
      <div className="mt-6 h-2 overflow-hidden rounded-full bg-zinc-100"><div className="h-full w-3/4 rounded-full bg-gradient-to-r from-rose-400 to-red-700" /></div>
    </article>
  );
}$source$,
  $json${"style":"Minimal","visual":"stats","accent":"#a91d30","previewTitle":"Your little corner of night.","previewCopy":"A clean home for the numbers that matter.","previewAction":"+12.8% this month"}$json$::jsonb,
  'published', 'free'
),
(
  null, 'creature-hero', 'Creature feature hero',
  'A bold landing-page opener with a strong headline and two paths forward.',
  'page', 'React', 'Tailwind CSS',
  $source$export function CreatureHero() {
  return (
    <section className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-white via-rose-50 to-zinc-100 px-8 py-20 text-center shadow-xl shadow-red-950/5 sm:px-16">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-red-700">A collection for builders</p>
      <h1 className="mx-auto mt-5 max-w-3xl text-5xl font-semibold tracking-tight text-zinc-950 sm:text-7xl">Make it your creature.</h1>
      <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-600">Find a starting point, shape it your way, and make something worth looking at.</p>
      <a className="mt-9 inline-flex rounded-xl bg-red-700 px-6 py-3 font-semibold text-white shadow-lg" href="#collection">Explore the collection ↗</a>
    </section>
  );
}$source$,
  $json${"style":"Signal","visual":"hero","accent":"#d21c32","previewTitle":"Make something unmistakably yours.","previewCopy":"A hero section built to set the tone from the first scroll.","previewAction":"Explore the collection"}$json$::jsonb,
  'published', 'free'
),
(
  null, 'orbit-profile', 'Orbit profile card',
  'A creator profile surface with a warm glass treatment and clear follow action.',
  'component', 'React', 'Tailwind CSS',
  $source$export function CreatorCard() {
  return (
    <article className="flex items-center gap-4 rounded-2xl border border-white/80 bg-white/70 p-5 shadow-xl shadow-zinc-900/5 backdrop-blur-2xl">
      <div className="grid size-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-rose-200 to-red-600 text-lg font-semibold text-white">N</div>
      <div className="min-w-0 flex-1"><h2 className="font-semibold text-zinc-950">Nia R.</h2><p className="mt-1 text-sm text-zinc-500">Independent maker · 8 pieces</p></div>
      <button className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800" type="button">Follow</button>
    </article>
  );
}$source$,
  $json${"style":"Glass","visual":"profile","accent":"#c51b31","previewTitle":"Made by the many.","previewCopy":"A small profile card for the people behind the work.","previewAction":"View creator"}$json$::jsonb,
  'published', 'free'
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
