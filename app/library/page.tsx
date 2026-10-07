"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

type CatalogItem = {
  id: string;
  title: string;
  description: string;
  category: "Component" | "Block" | "Page";
  framework: "React" | "Next.js";
  style: "Glass" | "Editorial" | "Minimal" | "Signal";
  creator: string;
  accent: string;
  visual: string;
  previewTitle: string;
  previewCopy: string;
  previewAction: string;
  code: string;
};

const catalog: CatalogItem[] = [
  {
    id: "crimson-button",
    title: "Crimson launch button",
    description: "A glossy, high-contrast action button with a soft lift on hover.",
    category: "Component",
    framework: "React",
    style: "Glass",
    creator: "Morbius",
    accent: "#cf182b",
    visual: "button",
    previewTitle: "Make an entrance.",
    previewCopy: "One clear action. A little extra shine.",
    previewAction: "Launch project ↗",
    code: `export function CrimsonButton() {
  return (
    <button className="rounded-xl bg-gradient-to-br from-rose-500 to-red-700 px-5 py-3 font-semibold text-white shadow-lg shadow-red-950/20 transition hover:-translate-y-0.5 hover:shadow-xl">
      Launch project <span aria-hidden="true">↗</span>
    </button>
  );
}`,
  },
  {
    id: "after-hours-auth",
    title: "After-hours sign in",
    description: "A calm, welcoming sign-in panel with room for your own auth flow.",
    category: "Block",
    framework: "Next.js",
    style: "Glass",
    creator: "Morbius",
    accent: "#bf1429",
    visual: "auth",
    previewTitle: "Welcome back.",
    previewCopy: "Your next idea is waiting after dark.",
    previewAction: "Continue with email",
    code: `export function SignInCard() {
  return (
    <form className="w-full max-w-sm rounded-3xl border border-white/70 bg-white/75 p-8 shadow-2xl shadow-rose-950/10 backdrop-blur-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-700">Welcome back</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">Enter the after hours.</h2>
      <label className="mt-7 block text-sm text-zinc-700" htmlFor="email">Email</label>
      <input className="mt-2 w-full rounded-xl border border-zinc-200 bg-white/80 px-4 py-3 outline-none focus:border-red-500" id="email" type="email" placeholder="you@example.com" />
      <button className="mt-5 w-full rounded-xl bg-red-700 px-4 py-3 font-semibold text-white transition hover:bg-red-600" type="submit">Continue</button>
    </form>
  );
}`,
  },
  {
    id: "soft-pricing",
    title: "The soft launch pricing block",
    description: "A transparent plan card for introducing a free tier and what comes next.",
    category: "Block",
    framework: "React",
    style: "Editorial",
    creator: "Mira V.",
    accent: "#c92b3e",
    visual: "pricing",
    previewTitle: "Start with the essentials.",
    previewCopy: "Free to explore. Room to grow.",
    previewAction: "Choose this plan",
    code: `export function PricingCard() {
  return (
    <article className="max-w-sm rounded-3xl border border-zinc-200 bg-white p-7 shadow-xl shadow-zinc-900/5">
      <p className="text-sm font-medium text-red-700">Free forever</p>
      <h2 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950">$0<span className="text-base font-normal text-zinc-500"> / month</span></h2>
      <p className="mt-3 text-sm leading-6 text-zinc-600">Everything you need to find your starting point.</p>
      <button className="mt-7 w-full rounded-xl border border-zinc-300 px-4 py-3 font-semibold text-zinc-900 transition hover:border-red-400 hover:text-red-700">Explore the library</button>
    </article>
  );
}`,
  },
  {
    id: "midnight-stats",
    title: "Midnight stats panel",
    description: "A compact dashboard card for activity, progress, or a small set of metrics.",
    category: "Component",
    framework: "Next.js",
    style: "Minimal",
    creator: "Ari K.",
    accent: "#a91d30",
    visual: "stats",
    previewTitle: "Your little corner of night.",
    previewCopy: "A clean home for the numbers that matter.",
    previewAction: "+12.8% this month",
    code: `export function StatsCard() {
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
}`,
  },
  {
    id: "creature-hero",
    title: "Creature feature hero",
    description: "A bold landing-page opener with a strong headline and two paths forward.",
    category: "Page",
    framework: "React",
    style: "Signal",
    creator: "Morbius",
    accent: "#d21c32",
    visual: "hero",
    previewTitle: "Make something unmistakably yours.",
    previewCopy: "A hero section built to set the tone from the first scroll.",
    previewAction: "Explore the collection",
    code: `export function CreatureHero() {
  return (
    <section className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-white via-rose-50 to-zinc-100 px-8 py-20 text-center shadow-xl shadow-red-950/5 sm:px-16">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-red-700">A collection for builders</p>
      <h1 className="mx-auto mt-5 max-w-3xl text-5xl font-semibold tracking-tight text-zinc-950 sm:text-7xl">Make it your creature.</h1>
      <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-600">Find a starting point, shape it your way, and make something worth looking at.</p>
      <a className="mt-9 inline-flex rounded-xl bg-red-700 px-6 py-3 font-semibold text-white shadow-lg shadow-red-900/20 transition hover:-translate-y-0.5" href="#collection">Explore the collection ↗</a>
    </section>
  );
}`,
  },
  {
    id: "orbit-profile",
    title: "Orbit profile card",
    description: "A creator profile surface with a warm glass treatment and clear follow action.",
    category: "Component",
    framework: "React",
    style: "Glass",
    creator: "Nia R.",
    accent: "#c51b31",
    visual: "profile",
    previewTitle: "Made by the many.",
    previewCopy: "A small profile card for the people behind the work.",
    previewAction: "View creator",
    code: `export function CreatorCard() {
  return (
    <article className="flex items-center gap-4 rounded-2xl border border-white/80 bg-white/70 p-5 shadow-xl shadow-zinc-900/5 backdrop-blur-2xl">
      <div className="grid size-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-rose-200 to-red-600 text-lg font-semibold text-white">N</div>
      <div className="min-w-0 flex-1"><h2 className="font-semibold text-zinc-950">Nia R.</h2><p className="mt-1 text-sm text-zinc-500">Independent maker · 8 pieces</p></div>
      <button className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 transition hover:border-red-400 hover:text-red-700" type="button">Follow</button>
    </article>
  );
}`,
  },
];

const categories = ["Everything", "Components", "Blocks", "Pages"] as const;
type CategoryFilter = (typeof categories)[number];

function PreviewArtwork({ item }: { item: CatalogItem }) {
  return (
    <div className={`library-art library-art--${item.visual}`} style={{ "--art-accent": item.accent } as CSSProperties}>
      <div className="library-art-glint" aria-hidden="true" />
      <span className="library-art-kicker">{item.category} / {item.style}</span>
      <svg className="library-art-bat" viewBox="0 0 140 72" aria-hidden="true">
        <path d="M70 32c-8-17-26-27-47-26 9 8 11 19 8 29C20 25 10 22 0 23c14 8 19 19 21 32 11-10 23-13 37-8 4 8 8 14 12 17 4-3 8-9 12-17 14-5 26-2 37 8 2-13 7-24 21-32-10-1-20 2-31 12-3-10-1-21 8-29-21-1-39 9-47 26Z" />
      </svg>
      <div className="library-art-content">
        <span className="library-art-mark">M</span>
        <h3>{item.previewTitle}</h3>
        <p>{item.previewCopy}</p>
        <span className="library-art-action">{item.previewAction} <b aria-hidden="true">↗</b></span>
      </div>
      <span className="library-art-index" aria-hidden="true">M / 0{catalog.indexOf(item) + 1}</span>
    </div>
  );
}

export default function LibraryPage() {
  const [category, setCategory] = useState<CategoryFilter>("Everything");
  const [query, setQuery] = useState("");
  const [framework, setFramework] = useState("Any framework");
  const [style, setStyle] = useState("Any style");
  const [sort, setSort] = useState("Featured");
  const [selected, setSelected] = useState<CatalogItem | null>(null);
  const [notice, setNotice] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const items = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = catalog.filter((item) => {
      const categoryMatch = category === "Everything" || `${item.category}s` === category;
      const frameworkMatch = framework === "Any framework" || item.framework === framework;
      const styleMatch = style === "Any style" || item.style === style;
      const searchMatch = !normalizedQuery || [item.title, item.description, item.category, item.framework, item.style, item.creator]
        .some((value) => value.toLowerCase().includes(normalizedQuery));
      return categoryMatch && frameworkMatch && styleMatch && searchMatch;
    });

    if (sort === "A–Z") return filtered.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "Newest") return filtered.reverse();
    return filtered;
  }, [category, framework, query, sort, style]);

  useEffect(() => {
    if (!selected) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selected]);

  useEffect(() => {
    const focusSearch = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  async function copyCode(item: CatalogItem) {
    try {
      await navigator.clipboard.writeText(item.code);
      setNotice(`${item.title} code copied`);
    } catch {
      setNotice("Clipboard access is unavailable in this browser.");
    }
    window.setTimeout(() => setNotice(""), 2400);
  }

  function clearFilters() {
    setCategory("Everything");
    setQuery("");
    setFramework("Any framework");
    setStyle("Any style");
    setSort("Featured");
  }

  return (
    <main className="library-page">
      <div className="library-page-atmosphere" aria-hidden="true">
        <span className="library-orb library-orb--one" />
        <span className="library-orb library-orb--two" />
        <span className="library-surface-grain" />
      </div>

      <header className="library-header">
        <Link className="library-brand" href="/" aria-label="Morbius home">
          <span className="library-brand-bat" aria-hidden="true">✦</span>
          <span>MORBIUS<span>.</span></span>
        </Link>
        <nav className="library-header-links" aria-label="Library navigation">
          <span className="library-breadcrumb">THE COLLECTION <i>/</i> COMPONENT LIBRARY</span>
          <Link href="/#studio">Studio <span aria-hidden="true">↗</span></Link>
        </nav>
        <Link className="library-header-cta" href="/#join">Join the night shift <span aria-hidden="true">↗</span></Link>
      </header>

      <section className="library-intro" aria-labelledby="library-title">
        <div className="library-intro-copy">
          <p className="library-eyebrow"><span /> THE MORBIUS LIBRARY <i>/</i> MADE TO REMIX</p>
          <h1 id="library-title">Find your <span>form.</span></h1>
          <p className="library-lede">A growing collection of interface pieces. Find a starting point, preview it, and make the code yours.</p>
        </div>
        <div className="library-count-card" aria-live="polite">
          <span className="library-count-number">{items.length.toString().padStart(2, "0")}</span>
          <span className="library-count-copy">pieces in this<br />first collection</span>
          <svg viewBox="0 0 140 72" aria-hidden="true"><path d="M70 32c-8-17-26-27-47-26 9 8 11 19 8 29C20 25 10 22 0 23c14 8 19 19 21 32 11-10 23-13 37-8 4 8 8 14 12 17 4-3 8-9 12-17 14-5 26-2 37 8 2-13 7-24 21-32-10-1-20 2-31 12-3-10-1-21 8-29-21-1-39 9-47 26Z" /></svg>
        </div>
      </section>

      <section className="library-tools" aria-label="Search and filter the component library">
        <label className="library-search">
          <span aria-hidden="true">⌕</span>
          <input ref={searchInputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search components, blocks, styles..." aria-label="Search the library" />
          <kbd>Ctrl / ⌘ K</kbd>
        </label>
        <div className="library-selects">
          <label className="library-select-wrap"><span className="sr-only">Filter by framework</span><select value={framework} onChange={(event) => setFramework(event.target.value)}><option>Any framework</option><option>React</option><option>Next.js</option></select><i aria-hidden="true">⌄</i></label>
          <label className="library-select-wrap"><span className="sr-only">Filter by visual style</span><select value={style} onChange={(event) => setStyle(event.target.value)}><option>Any style</option><option>Glass</option><option>Editorial</option><option>Minimal</option><option>Signal</option></select><i aria-hidden="true">⌄</i></label>
          <label className="library-select-wrap"><span className="sr-only">Sort results</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option>Featured</option><option>A–Z</option><option>Newest</option></select><i aria-hidden="true">⌄</i></label>
        </div>
      </section>

      <div className="library-category-row">
        <div className="library-category-tabs" role="tablist" aria-label="Filter by content type">
          {categories.map((filter) => (
            <button key={filter} className={category === filter ? "is-active" : ""} type="button" role="tab" aria-selected={category === filter} onClick={() => setCategory(filter)}>{filter}<span>{filter === "Everything" ? catalog.length : catalog.filter((item) => `${item.category}s` === filter).length}</span></button>
          ))}
        </div>
        <p className="library-results-count">Showing <strong>{items.length}</strong> of {catalog.length} pieces</p>
      </div>

      {items.length > 0 ? (
        <section className="library-grid" aria-label="Component results">
          {items.map((item, index) => (
            <article className="library-card" key={item.id} style={{ "--card-delay": `${index * 55}ms` } as CSSProperties}>
              <PreviewArtwork item={item} />
              <div className="library-card-content">
                <div className="library-card-heading">
                  <div><p className="library-card-meta">{item.category} <i>·</i> {item.framework}</p><h2>{item.title}</h2></div>
                  <span className="library-free-badge">FREE</span>
                </div>
                <p className="library-card-description">{item.description}</p>
                <div className="library-card-bottom">
                  <span className="library-creator"><i>{item.creator.slice(0, 1)}</i> by {item.creator}</span>
                  <div className="library-card-actions">
                    <button className="library-preview-button" type="button" onClick={() => setSelected(item)}>Preview</button>
                    <button className="library-copy-button" type="button" onClick={() => void copyCode(item)}><span aria-hidden="true">&lt;/&gt;</span> Copy code</button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <div className="library-empty-state">
          <span aria-hidden="true">✳</span>
          <h2>No pieces in this orbit.</h2>
          <p>Try another search or clear a filter to see more of the collection.</p>
          <button type="button" onClick={clearFilters}>Clear all filters</button>
        </div>
      )}

      <footer className="library-footer">
        <Link className="library-brand" href="/" aria-label="Morbius home"><span className="library-brand-bat" aria-hidden="true">✦</span><span>MORBIUS<span>.</span></span></Link>
        <p>Find a spark. Shape it your way. <i>Built after dark.</i></p>
        <span className="library-footer-mark">M / 001 · OPEN COLLECTION</span>
      </footer>

      {selected && (
        <div className="library-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
          <section className="library-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="library-modal-header"><div><p className="library-card-meta">{selected.category} <i>·</i> {selected.framework} <i>·</i> {selected.style}</p><h2 id="modal-title">{selected.title}</h2></div><button type="button" className="library-modal-close" onClick={() => setSelected(null)} aria-label="Close component preview">×</button></div>
            <div className="library-modal-preview"><PreviewArtwork item={selected} /></div>
            <div className="library-code-heading"><div><span>COMPONENT SOURCE</span><small>Copy and adapt it for your project.</small></div><button className="library-copy-button" type="button" onClick={() => void copyCode(selected)}><span aria-hidden="true">&lt;/&gt;</span> Copy code</button></div>
            <pre className="library-code"><code>{selected.code}</code></pre>
          </section>
        </div>
      )}

      <div className="library-live-notice" role="status" aria-live="polite">{notice}</div>
    </main>
  );
}
