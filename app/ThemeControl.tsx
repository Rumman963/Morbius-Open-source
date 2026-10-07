"use client";

import { useEffect, useState, type ReactNode } from "react";

type ThemeChoice = "system" | "light" | "dark";

const choices: { value: ThemeChoice; label: string; icon: ReactNode }[] = [
  {
    value: "system",
    label: "Use system appearance",
    icon: <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></>,
  },
  {
    value: "light",
    label: "Use light appearance",
    icon: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>,
  },
  {
    value: "dark",
    label: "Use dark appearance",
    icon: <path d="M20.4 15.2A8.5 8.5 0 0 1 8.8 3.6 8.8 8.8 0 1 0 20.4 15.2Z" />,
  },
];

function applyTheme(choice: ThemeChoice) {
  const isDark = choice === "dark" ||
    (choice === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.dataset.themeChoice = choice;
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
}

export default function ThemeControl() {
  const [choice, setChoice] = useState<ThemeChoice>("system");

  useEffect(() => {
    const saved = window.localStorage.getItem("morbius-theme");
    const initial: ThemeChoice = saved === "light" || saved === "dark" ? saved : "system";
    setChoice(initial);
    applyTheme(initial);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const updateSystemTheme = () => {
      if (window.localStorage.getItem("morbius-theme") !== "light" && window.localStorage.getItem("morbius-theme") !== "dark") {
        applyTheme("system");
      }
    };
    media.addEventListener("change", updateSystemTheme);
    return () => media.removeEventListener("change", updateSystemTheme);
  }, []);

  function selectTheme(next: ThemeChoice) {
    setChoice(next);
    window.localStorage.setItem("morbius-theme", next);
    applyTheme(next);
  }

  return (
    <div className="theme-control" role="group" aria-label="Website color theme">
      {choices.map(({ value, label, icon }) => (
        <button
          aria-label={label}
          aria-pressed={choice === value}
          className="theme-control-button"
          key={value}
          onClick={() => selectTheme(value)}
          title={label}
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icon}</svg>
        </button>
      ))}
    </div>
  );
}
