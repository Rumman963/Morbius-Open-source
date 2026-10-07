"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { LiquidGlass } from "@creativoma/liquid-glass";
import ThemeControl from "@/app/ThemeControl";
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
          text: "Check your inbox for the confirmation link to join the Morbius.",
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
        <div className="auth-topbar-actions">
          <ThemeControl />
          <Link className="auth-back-link" href="/library">Library <span aria-hidden="true">↗</span></Link>
        </div>
      </header>

      <div className="auth-layout">
        <section className="auth-story" aria-label="About Morbius">
          <div className="auth-kicker"><span /> MORBIUS</div>
          <h1>{isSignUp ? <>Make it<br /><em>yours.</em></> : <>Welcome<br /><em>back.</em></>}</h1>
          <p>{isSignUp ? "Save and customize your favorite pieces." : "Your library is waiting."}</p>
        </section>

        <LiquidGlass as="section" className="auth-card" contentClassName="auth-card-content" backdropBlur={18} displacementScale={28} tintColor="var(--glass-tint)" aria-labelledby="auth-heading">
          <div className="auth-card-orb" aria-hidden="true" />
          <div className="auth-card-head">
            <span className="auth-card-eyebrow">{isSignUp ? "CREATE ACCOUNT" : "SIGN IN"}</span>
            <h2 id="auth-heading">{isSignUp ? "Get started." : "Welcome back."}</h2>
          </div>

          <button
            className="auth-google-button"
            disabled={isSubmitting || isGoogleSubmitting}
            onClick={handleGoogleSignIn}
            type="button"
          >
            <span className="auth-google-mark" aria-hidden="true">
              <svg viewBox="0 0 32 32" focusable="false">
                <path d="M30.42 16.83c0-1.03-.092-2.017-.264-2.966H16.5v5.61h7.804c-.336 1.81-1.358 3.347-2.894 4.375v3.637h4.686c2.742-2.524 4.324-6.242 4.324-10.657z" fill="#4285F4" />
                <path d="M16.5 31c3.915 0 7.197-1.298 9.596-3.513L21.41 23.85c-1.298.87-2.96 1.383-4.91 1.383-3.777 0-6.973-2.55-8.113-5.978H3.542v3.757C5.928 27.752 10.832 31 16.5 31z" fill="#34A853" />
                <path d="M8.387 19.255c-.29-.87-.455-1.8-.455-2.755 0-.956.165-1.885.455-2.755V9.988H3.542C2.56 11.946 2 14.16 2 16.5s.56 4.554 1.542 6.512z" fill="#FBBC05" />
                <path d="M16.5 7.767c2.13 0 4.04.732 5.543 2.168l4.16-4.158C23.69 3.437 20.407 2 16.5 2 10.832 2 5.928 5.25 3.542 9.988l4.845 3.757c1.14-3.427 4.336-5.978 8.113-5.978z" fill="#EA4335" />
              </svg>
            </span>
            <span>{isGoogleSubmitting ? "Connecting to Google…" : "Continue with Google"}</span>
            <span className="auth-google-arrow" aria-hidden="true">↗</span>
          </button>
          <div className="auth-divider"><span>OR</span></div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {isSignUp && (
              <label className="auth-field">
                <span>Your name</span>
                <input
                  autoComplete="name"
                  name="displayName"
                  onChange={(event) => setDisplayName(event.target.value)}
                  placeholder="Your name"
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
                placeholder="name@example.com"
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
                placeholder={isSignUp ? "8+ characters" : "Password"}
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
        </LiquidGlass>
      </div>

      <footer className="auth-footer"><span>© MORBIUS 2026</span><Link href="/">Home ↑</Link></footer>
    </main>
  );
}
