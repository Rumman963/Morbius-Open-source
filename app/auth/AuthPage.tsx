"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { signInSchema, signUpSchema } from "@/lib/validation/auth";

type AuthPageProps = { mode: "signin" | "signup" };

const batPath =
  "M70 32c-8-17-26-27-47-26 9 8 11 19 8 29C20 25 10 22 0 23c14 8 19 19 21 32 11-10 23-13 37-8 4 8 8 14 12 17 4-3 8-9 12-17 14-5 26-2 37 8 2-13 7-24 21-32-10-1-20 2-31 12-3-10-1-21 8-29-21-1-39 9-47 26Z";

function Bat({ className }: { className: string }) {
  return (
    <span className={`auth-bat ${className}`} aria-hidden="true">
      <svg viewBox="0 0 140 72" focusable="false">
        <path d={batPath} />
      </svg>
    </span>
  );
}

function MorbiusMark() {
  return (
    <svg viewBox="0 0 64 42" aria-hidden="true" focusable="false">
      <path d="M32 16C25 4 14 2 3 3c5 5 6 11 4 17-5-5-8-6-8-6 6 8 9 14 9 23 6-6 12-8 19-5 2 4 3 6 5 8 2-2 3-4 5-8 7-3 13-1 19 5 0-9 3-15 9-23 0 0-3 1-8 6-2-6-1-12 4-17-11-1-22 1-29 13Z" />
      <circle cx="22" cy="23" r="1.7" />
      <circle cx="42" cy="23" r="1.7" />
    </svg>
  );
}

export default function AuthPage({ mode }: AuthPageProps) {
  const router = useRouter();
  const isSignUp = mode === "signup";
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [notice, setNotice] = useState<{ kind: "error" | "success"; text: string } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(null);

    const validation = isSignUp
      ? signUpSchema.safeParse({ displayName, email, password })
      : signInSchema.safeParse({ email, password });

    if (!validation.success) {
      setNotice({ kind: "error", text: validation.error.issues[0]?.message ?? "Check the form and try again." });
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createClient();
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: { display_name: displayName.trim() },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (error) throw error;
        if (data.session) {
          router.replace("/library");
          router.refresh();
          return;
        }
        setNotice({
          kind: "success",
          text: "Your account is nearly ready. Check your inbox for the confirmation link to join the library.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        router.replace("/library");
        router.refresh();
        return;
      }
    } catch (error) {
      setNotice({
        kind: "error",
        text: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleSignIn() {
    setNotice(null);
    setIsGoogleSubmitting(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) throw error;
    } catch (error) {
      setNotice({
        kind: "error",
        text: error instanceof Error ? error.message : "Google sign-in could not start. Please try again.",
      });
      setIsGoogleSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-wallpaper" aria-hidden="true">
        <span className="auth-wallpaper-grain" />
        <span className="auth-glow auth-glow--one" />
        <span className="auth-glow auth-glow--two" />
        <Bat className="auth-bat--one" />
        <Bat className="auth-bat--two" />
        <Bat className="auth-bat--three" />
        <Bat className="auth-bat--four" />
        <Bat className="auth-bat--five" />
        <span className="auth-eye-pair auth-eye-pair--one" />
        <span className="auth-eye-pair auth-eye-pair--two" />
      </div>

      <header className="auth-topbar">
        <Link className="auth-brand" href="/" aria-label="Morbius home">
          <span className="auth-brand-mark"><MorbiusMark /></span>
          <span className="auth-brand-word">MORBIUS</span>
        </Link>
        <Link className="auth-back-link" href="/library">Explore the library <span aria-hidden="true">↗</span></Link>
      </header>

      <div className="auth-layout">
        <section className="auth-story" aria-label="About Morbius">
          <div className="auth-kicker"><span /> YOUR NEXT BUILD STARTS HERE</div>
          <h1>{isSignUp ? <>Make room<br />for your <em>ideas.</em></> : <>Good to have<br />you <em>back.</em></>}</h1>
          <p>{isSignUp
            ? "Save the pieces you love, shape your own components, and build a library that feels like yours."
            : "Your saved components, custom collections, and next big idea are right where you left them."}</p>
          <div className="auth-story-foot"><span className="auth-story-bat"><MorbiusMark /></span><span>BUILT FOR THE THINGS YOU HAVEN’T MADE YET.</span></div>
        </section>

        <section className="auth-card" aria-labelledby="auth-heading">
          <div className="auth-card-orb" aria-hidden="true" />
          <div className="auth-card-head">
            <span className="auth-card-eyebrow">{isSignUp ? "CREATE YOUR ACCOUNT" : "WELCOME BACK"}</span>
            <h2 id="auth-heading">{isSignUp ? "Join the night shift." : "Enter the after hours."}</h2>
            <p>{isSignUp ? "A good place to start making things your own." : "Sign in to pick up where you left off."}</p>
          </div>

          <button
            className="auth-google-button"
            disabled={isSubmitting || isGoogleSubmitting}
            onClick={handleGoogleSignIn}
            type="button"
          >
            <span className="auth-google-mark" aria-hidden="true">G</span>
            <span>{isGoogleSubmitting ? "Connecting to Google…" : "Continue with Google"}</span>
            <span className="auth-google-arrow" aria-hidden="true">↗</span>
          </button>
          <div className="auth-divider"><span>OR CONTINUE WITH EMAIL</span></div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {isSignUp && (
              <label className="auth-field">
                <span>Your name</span>
                <input
                  autoComplete="name"
                  name="displayName"
                  onChange={(event) => setDisplayName(event.target.value)}
                  placeholder="What should we call you?"
                  required
                  value={displayName}
                />
              </label>
            )}
            <label className="auth-field">
              <span>Email address</span>
              <input
                autoComplete="email"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                type="email"
                value={email}
              />
            </label>
            <label className="auth-field">
              <span>Password</span>
              <input
                autoComplete={isSignUp ? "new-password" : "current-password"}
                minLength={isSignUp ? 8 : undefined}
                name="password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder={isSignUp ? "At least 8 characters" : "Your password"}
                required
                type="password"
                value={password}
              />
            </label>

            {notice && <p className={`auth-notice auth-notice--${notice.kind}`} role={notice.kind === "error" ? "alert" : "status"}>{notice.text}</p>}

            <button className="auth-submit" disabled={isSubmitting || isGoogleSubmitting} type="submit">
              <span>{isSubmitting ? "One moment…" : isSignUp ? "Create your account" : "Sign in"}</span>
              <span aria-hidden="true">↗</span>
            </button>
          </form>

          <div className="auth-switch">
            <span>{isSignUp ? "Already part of the night shift?" : "New to Morbius?"}</span>
            <Link href={isSignUp ? "/signin" : "/signup"}>{isSignUp ? "Sign in" : "Create an account"}</Link>
          </div>
          <div className="auth-card-bottom"><span className="auth-secure-dot" /> YOUR ACCOUNT. YOUR WORK. YOURS.</div>
        </section>
      </div>

      <footer className="auth-footer"><span>© MORBIUS 2026</span><span>MAKE SOMETHING THAT FEELS LIKE YOU.</span><Link href="/">BACK TO THE SURFACE ↑</Link></footer>
    </main>
  );
}
