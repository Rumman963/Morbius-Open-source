"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type CSSProperties, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { componentDraftSchema, type ComponentDraft } from "@/lib/validation/studio";

const initialDraft: ComponentDraft = {
  title: "",
  description: "",
  category: "component",
  framework: "React",
  styling: "Tailwind CSS",
  sourceCode: "export function MyComponent() {\n  return <button>Make it yours</button>;\n}",
  style: "Glass",
  accent: "#972424",
};

const batPath = "M90 41C78 16 53 3 22 5c13 12 16 28 11 43C18 33 8 29 0 29c20 12 28 27 30 48 16-15 33-19 54-12 2 12 4 19 6 22 2-3 4-10 6-22 21-7 38-3 54 12 2-21 10-36 30-48-8 0-18 4-33 19-5-15-2-31 11-43-31-2-56 11-68 36Z";

function makeSlug(title: string) {
  const base = title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 64);
  return `${base || "untitled-component"}-${crypto.randomUUID().slice(0, 8)}`;
}

export default function StudioPage() {
  const router = useRouter();
  const [draft, setDraft] = useState<ComponentDraft>(initialDraft);
  const [authState, setAuthState] = useState<"loading" | "ready" | "signed-out">("loading");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState<{ kind: "error" | "success"; text: string } | null>(null);

  useEffect(() => {
    let active = true;

    async function checkUser() {
      try {
        const { data: { user } } = await createClient().auth.getUser();
        if (!active) return;
        setAuthState(user ? "ready" : "signed-out");
      } catch {
        if (active) setAuthState("signed-out");
      }
    }

    void checkUser();
    return () => { active = false; };
  }, []);

  function update<K extends keyof ComponentDraft>(key: K, value: ComponentDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  async function save(status: "draft" | "published") {
    setNotice(null);

    const parsed = componentDraftSchema.safeParse(draft);
    if (!parsed.success) {
      setNotice({ kind: "error", text: parsed.error.issues[0]?.message ?? "Check the component details." });
      return;
    }

    setIsSubmitting(true);
    try {
      const supabase = createClient();
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) {
        router.push("/signin");
        return;
      }

      const { error } = await supabase.from("components").insert({
        creator_id: user.id,
        slug: makeSlug(parsed.data.title),
        title: parsed.data.title,
        description: parsed.data.description,
        category: parsed.data.category,
        framework: parsed.data.framework,
        styling: parsed.data.styling,
        source_code: parsed.data.sourceCode,
        preview_config: {
          style: parsed.data.style,
          accent: parsed.data.accent,
          visual: parsed.data.category === "page" ? "hero" : parsed.data.category === "block" ? "auth" : "button",
          previewTitle: parsed.data.title,
          previewCopy: parsed.data.description || "A new piece from the Morbius studio.",
          previewAction: "Make it yours ↗",
        },
        status,
        access: "free",
      });
      if (error) throw error;

      if (status === "published") {
        router.push("/library");
        router.refresh();
        return;
      }
      setNotice({ kind: "success", text: "Draft saved. You can keep refining it here." });
    } catch (error) {
      setNotice({ kind: "error", text: error instanceof Error ? error.message : "Your component could not be saved." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="studio-page">
      <div className="studio-page-atmosphere" aria-hidden="true"><span /><span /><i /></div>
      <header className="studio-header">
        <Link className="library-brand" href="/" aria-label="Morbius home"><span className="brand-bat-symbol" aria-hidden="true"><svg viewBox="0 0 180 92"><path d={batPath} /></svg></span><span className="brand-script">Morbius</span></Link>
        <nav className="studio-header-nav" aria-label="Studio navigation"><Link href="/library">Library</Link><span>STUDIO</span></nav>
        <Link className="library-header-cta" href="/library">Exit studio <span aria-hidden="true">↗</span></Link>
      </header>

      <section className="studio-intro" aria-labelledby="studio-title">
        <div><p className="library-eyebrow"><span /> CREATOR STUDIO</p><h1 id="studio-title">Make a <em>piece.</em></h1><p>Draft it quietly. Publish it when it is ready.</p></div>
        <div className={`studio-auth-status studio-auth-status--${authState}`}><i />{authState === "loading" ? "Checking your session" : authState === "ready" ? "Ready to create" : "Sign in to publish"}</div>
      </section>

      {authState === "signed-out" ? (
        <section className="studio-gate"><svg viewBox="0 0 180 92" aria-hidden="true"><path d={batPath} /></svg><h2>The studio is yours after sign in.</h2><Link className="studio-primary" href="/signin">Sign in <span aria-hidden="true">↗</span></Link></section>
      ) : (
        <form className="studio-composer" onSubmit={(event) => { event.preventDefault(); void save("draft"); }}>
          <section className="studio-form-panel" aria-label="Component details">
            <div className="studio-panel-label"><span>01</span> DETAILS</div>
            <label className="studio-field studio-field--full"><span>Title</span><input value={draft.title} maxLength={120} onChange={(event) => update("title", event.target.value)} placeholder="e.g. Crimson launch button" /></label>
            <label className="studio-field studio-field--full"><span>What does it do?</span><textarea value={draft.description} maxLength={2000} onChange={(event) => update("description", event.target.value)} placeholder="A short, useful description." rows={3} /></label>
            <div className="studio-field-grid">
              <label className="studio-field"><span>Type</span><select value={draft.category} onChange={(event) => update("category", event.target.value as ComponentDraft["category"])}><option value="component">Component</option><option value="block">Block</option><option value="page">Page</option></select></label>
              <label className="studio-field"><span>Framework</span><select value={draft.framework} onChange={(event) => update("framework", event.target.value as ComponentDraft["framework"])}><option>React</option><option>Next.js</option><option>HTML</option></select></label>
              <label className="studio-field"><span>Styling</span><select value={draft.styling} onChange={(event) => update("styling", event.target.value as ComponentDraft["styling"])}><option>Tailwind CSS</option><option>CSS</option><option>shadcn/ui</option></select></label>
            </div>
            <div className="studio-field-grid studio-field-grid--two">
              <label className="studio-field"><span>Visual language</span><select value={draft.style} onChange={(event) => update("style", event.target.value as ComponentDraft["style"])}><option>Glass</option><option>Minimal</option><option>Editorial</option><option>Signal</option></select></label>
              <label className="studio-field"><span>Accent</span><span className="studio-color-input"><input value={draft.accent} onChange={(event) => update("accent", event.target.value)} aria-label="Accent hex code" /><input type="color" value={draft.accent} onChange={(event) => update("accent", event.target.value)} aria-label="Choose accent color" /></span></label>
            </div>
            <label className="studio-field studio-field--full"><span>Source code</span><textarea className="studio-code-input" value={draft.sourceCode} onChange={(event) => update("sourceCode", event.target.value)} spellCheck="false" rows={14} /></label>
          </section>

          <aside className="studio-preview-panel" aria-label="Component preview">
            <div className="studio-preview-top"><span>LIVE PREVIEW</span><i>•</i><small>{draft.style}</small></div>
            <div className="studio-preview-canvas" style={{ "--studio-accent": draft.accent } as CSSProperties}>
              <span className="studio-canvas-kicker">{draft.category.toUpperCase()} / {draft.framework.toUpperCase()}</span><svg viewBox="0 0 180 92" aria-hidden="true"><path d={batPath} /></svg><div><strong>{draft.title || "Your component"}</strong><p>{draft.description || "Give your next reusable piece a clear purpose."}</p><button type="button">Make it yours <span>↗</span></button></div>
            </div>
            <p className="studio-preview-note">Preview sets the visual metadata used in the library card.</p>
            {notice && <p className={`studio-notice studio-notice--${notice.kind}`} role={notice.kind === "error" ? "alert" : "status"}>{notice.text}</p>}
            <div className="studio-submit-actions"><button className="studio-secondary" type="submit" disabled={isSubmitting || authState !== "ready"}>{isSubmitting ? "Saving…" : "Save draft"}</button><button className="studio-primary" type="button" disabled={isSubmitting || authState !== "ready"} onClick={() => void save("published")}>Publish <span aria-hidden="true">↗</span></button></div>
          </aside>
        </form>
      )}
    </main>
  );
}
