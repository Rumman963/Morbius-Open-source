# Morbius

Morbius is being built as a customizable component and page library. The app uses Next.js App Router, React, TypeScript, Tailwind CSS, and Bun. Supabase Free is the planned database and authentication service.

## Run locally

From this folder, run:

```powershell
bun install
bun run dev
```

Open <http://127.0.0.1:3000>. Create a production build with `bun run build`; start that build locally with `bun run start`. Run `bun run typecheck` to check the TypeScript files.

## Connect a free Supabase project

1. Create a project on Supabase's Free plan.
2. Copy `.env.example` to `.env.local` and fill in the project URL and publishable key from the Supabase project settings.
3. Apply the SQL migration in `supabase/migrations` using the Supabase SQL Editor.

The schema includes profiles, a component catalog, creator-owned collections, and saved components. Row Level Security is enabled so users cannot edit one another's work. Premium catalog items stay private until subscription entitlements are implemented. Never put a Supabase secret/service-role key in browser code.

The current landing page and studio controls are a visual prototype; sign-in, persistence, component publishing, and billing still need to be connected to the database. No paid services are required to develop locally.
