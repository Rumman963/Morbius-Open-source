import Script from "next/script";
import type { CSSProperties } from "react";

export default function Home() {
  return (
    <>
<div className="site-atmosphere" aria-hidden="true">
      <div className="atmosphere-grain"></div>
      <div className="moon-halo"></div>
      <div className="bat-flock bat-flock--one">
        <svg viewBox="0 0 140 72"><path d="M70 32c-8-17-26-27-47-26 9 8 11 19 8 29C20 25 10 22 0 23c14 8 19 19 21 32 11-10 23-13 37-8 4 8 8 14 12 17 4-3 8-9 12-17 14-5 26-2 37 8 2-13 7-24 21-32-10-1-20 2-31 12-3-10-1-21 8-29-21-1-39 9-47 26Z" /></svg>
      </div>
      <div className="bat-flock bat-flock--two">
        <svg viewBox="0 0 140 72"><path d="M70 32c-8-17-26-27-47-26 9 8 11 19 8 29C20 25 10 22 0 23c14 8 19 19 21 32 11-10 23-13 37-8 4 8 8 14 12 17 4-3 8-9 12-17 14-5 26-2 37 8 2-13 7-24 21-32-10-1-20 2-31 12-3-10-1-21 8-29-21-1-39 9-47 26Z" /></svg>
      </div>
      <div className="bat-flock bat-flock--three">
        <svg viewBox="0 0 140 72"><path d="M70 32c-8-17-26-27-47-26 9 8 11 19 8 29C20 25 10 22 0 23c14 8 19 19 21 32 11-10 23-13 37-8 4 8 8 14 12 17 4-3 8-9 12-17 14-5 26-2 37 8 2-13 7-24 21-32-10-1-20 2-31 12-3-10-1-21 8-29-21-1-39 9-47 26Z" /></svg>
      </div>
      <span className="eye-pair eye-pair--a"></span>
      <span className="eye-pair eye-pair--b"></span>
    </div>

    <header className="site-header">
      <a className="brand" href="#top" aria-label="Morbius home">
        <span className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 54 34"><path d="M27 13C22 3 12 1 3 2c4 4 5 9 4 14-4-4-7-5-7-5 5 7 8 12 8 19 5-5 10-7 16-4 1 3 2 5 3 6 1-1 2-3 3-6 6-3 11-1 16 4 0-7 3-12 8-19 0 0-3 1-7 5-1-5 0-10 4-14-9-1-19 1-24 11Z" /></svg>
        </span>
        <span className="brand-name">MORBIUS<span className="brand-period">.</span></span>
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        <a href="#collection">Collection</a>
        <a href="#studio">Studio</a>
        <a href="#community">Community</a>
        <a href="#plans">Plans</a>
      </nav>
      <div className="header-actions">
        <button className="wallpaper-trigger" type="button" aria-label="Change background atmosphere" aria-haspopup="true" aria-expanded="false">
          <span className="wallpaper-dot"></span><span className="wallpaper-label">Blood moon</span><span className="chevron" aria-hidden="true">⌄</span>
        </button>
        <a className="header-signin" href="#join">Sign in</a>
        <a className="button button--small button--red" href="#collection">Enter the library <span aria-hidden="true">↗</span></a>
      </div>
      <button className="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false"><span></span><span></span></button>
    </header>

    <div className="wallpaper-menu" role="menu" aria-label="Choose an atmosphere" hidden>
      <button role="menuitemradio" aria-checked="true" data-wallpaper-choice="blood-moon"><i className="wallpaper-swatch swatch-moon"></i><span><b>Blood moon</b><small>Red haze · slow drift</small></span><span className="choice-check">✓</span></button>
      <button role="menuitemradio" aria-checked="false" data-wallpaper-choice="night-flight"><i className="wallpaper-swatch swatch-flight"></i><span><b>Night flight</b><small>Wing shadows · ember trails</small></span><span className="choice-check">✓</span></button>
      <button role="menuitemradio" aria-checked="false" data-wallpaper-choice="eclipse"><i className="wallpaper-swatch swatch-eclipse"></i><span><b>Eclipse</b><small>Deep violet · dim orbit</small></span><span className="choice-check">✓</span></button>
    </div>

    <main id="top">
      <section className="hero section-shell" aria-labelledby="hero-title">
        <div className="hero-copy" data-reveal>
          <div className="eyebrow"><span className="eyebrow-line"></span> THE COMPONENT ECOSYSTEM</div>
          <h1 id="hero-title">Make it<br /><span className="title-outline">your</span> <span className="title-red">creature.</span></h1>
          <p className="hero-lede">A living library of interface components, full-page blocks, and tools to shape them your way.</p>
          <div className="hero-actions">
            <a className="button button--red" href="#collection">Explore the collection <span aria-hidden="true">↗</span></a>
            <a className="button button--ghost" href="#studio"><span className="play-icon" aria-hidden="true">▶</span> Enter the studio</a>
          </div>
          <div className="hero-proof"><span className="avatar-stack" aria-hidden="true"><i>M</i><i>V</i><i>+</i></span><span>Made for builders who make it their own.</span></div>
        </div>

        <div className="hero-stage" data-reveal data-delay="140">
          <div className="stage-orbit stage-orbit--outer"></div>
          <div className="stage-orbit stage-orbit--inner"></div>
          <div className="stage-crosshair stage-crosshair--one"></div><div className="stage-crosshair stage-crosshair--two"></div>
          <div className="stage-caption"><span className="live-indicator"></span> LIVE PREVIEW <span className="caption-slash">/</span> BUTTON SYSTEM</div>
          <div className="preview-window" data-preview-theme="ember">
            <div className="preview-window-bar"><div className="window-dots"><i></i><i></i><i></i></div><span>morbius / button-lab</span><button className="window-more" type="button" aria-label="More preview options">···</button></div>
            <div className="preview-content">
              <div className="preview-eyebrow">BUTTON / PRIMARY</div>
              <h2>One component.<br /><span>Endless direction.</span></h2>
              <p>Choose a style. Make it yours. Ship it.</p>
              <button className="demo-button" type="button">Launch project <span aria-hidden="true">↗</span></button>
              <div className="preview-meta"><span><i className="tiny-check">✓</i> keyboard ready</span><span>react · tailwind</span></div>
            </div>
            <div className="preview-theme-switch" role="group" aria-label="Change component preview style">
              <button className="theme-choice is-active" data-theme-choice="ember" aria-pressed="true"><i className="theme-dot dot-ember"></i>Ember</button>
              <button className="theme-choice" data-theme-choice="acid" aria-pressed="false"><i className="theme-dot dot-acid"></i>Acid</button>
              <button className="theme-choice" data-theme-choice="frost" aria-pressed="false"><i className="theme-dot dot-frost"></i>Frost</button>
            </div>
          </div>
          <div className="floating-chip chip-code"><span className="code-icon">&lt;/&gt;</span><span>Copy, install<br /><b>or remix</b></span></div>
          <div className="floating-chip chip-motion"><span className="pulse-ring"></span><span>Motion<br /><b>tuned by you</b></span></div>
          <span className="stage-index">01 <span>/</span> 03</span>
        </div>
        <a className="scroll-cue" href="#collection"><span className="scroll-line"></span> SCROLL TO DISCOVER</a>
      </section>

      <section className="ticker" aria-label="Morbius capabilities"><div className="ticker-track"><span>BUILT TO BE REMIXED</span><i>✳</i><span>YOUR STACK, YOUR RULES</span><i>✳</i><span>COMPONENTS WITH CHARACTER</span><i>✳</i><span>BUILT TO BE REMIXED</span><i>✳</i><span>YOUR STACK, YOUR RULES</span><i>✳</i><span>COMPONENTS WITH CHARACTER</span><i>✳</i></div></section>

      <section className="collection section-shell" id="collection" aria-labelledby="collection-title">
        <div className="section-heading" data-reveal>
          <div><div className="eyebrow"><span className="eyebrow-line"></span> THE COLLECTION</div><h2 id="collection-title">Find your <span className="title-red">form.</span></h2></div>
          <p>Primitives, patterns, and whole page sections. Start with a spark, leave with something unmistakably yours.</p>
        </div>
        <div className="collection-toolbar" data-reveal>
          <div className="category-tabs" role="tablist" aria-label="Filter component collection">
            <button className="category-tab is-active" role="tab" aria-selected="true" data-category="all">Everything <span>24</span></button>
            <button className="category-tab" role="tab" aria-selected="false" data-category="components">Components <span>12</span></button>
            <button className="category-tab" role="tab" aria-selected="false" data-category="blocks">Blocks <span>08</span></button>
            <button className="category-tab" role="tab" aria-selected="false" data-category="pages">Pages <span>04</span></button>
          </div>
          <button className="sort-control" type="button">Recently added <span aria-hidden="true">⌄</span></button>
        </div>
        <div className="collection-grid">
          <article className="collection-card card-featured" data-kind="blocks" data-reveal>
            <div className="card-visual visual-auth"><span className="visual-label">BLOCK / AUTH</span><div className="auth-mini"><span className="mini-mark">M</span><small>WELCOME BACK</small><b>Enter the<br />after hours.</b><i className="mini-input"></i><i className="mini-submit">Continue <span>↗</span></i><small className="mini-footer">New here? Create account</small></div><span className="visual-index">01</span></div>
            <div className="card-info"><div><h3>After-hours sign in</h3><p>Auth block · React</p></div><button className="icon-button save-card" type="button" aria-label="Save After-hours sign in" aria-pressed="false">♡</button></div>
          </article>
          <article className="collection-card" data-kind="components" data-reveal data-delay="70">
            <div className="card-visual visual-buttons"><span className="visual-label">COMPONENT / BUTTONS</span><div className="button-stack"><button className="mini-btn mini-btn-red">Make an entrance <span>↗</span></button><button className="mini-btn mini-btn-outline">Keep it quiet</button><button className="mini-btn mini-btn-dark">Ghost mode <span>◌</span></button></div><span className="visual-index">02</span></div>
            <div className="card-info"><div><h3>Not-so-basic buttons</h3><p>Component · 6 variants</p></div><button className="icon-button save-card" type="button" aria-label="Save Not-so-basic buttons" aria-pressed="false">♡</button></div>
          </article>
          <article className="collection-card" data-kind="pages" data-reveal data-delay="140">
            <div className="card-visual visual-dashboard"><span className="visual-label">PAGE / DASHBOARD</span><div className="dash-mini"><aside><i></i><i></i><i></i><i></i></aside><div className="dash-body"><small>MONDAY, 02:14 AM</small><b>Your little<br />corner of night.</b><div className="dash-stats"><i></i><i></i><i></i></div><div className="dash-chart"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></div><span className="visual-index">03</span></div>
            <div className="card-info"><div><h3>Midnight overview</h3><p>Dashboard page · Next.js</p></div><button className="icon-button save-card" type="button" aria-label="Save Midnight overview" aria-pressed="false">♡</button></div>
          </article>
        </div>
        <div className="collection-footer" data-reveal><span><span className="footer-dot"></span> 24 pieces in the collection. More rising.</span><a className="text-link" href="#studio">Browse the library <span aria-hidden="true">→</span></a></div>
      </section>

      <section className="studio section-shell" id="studio" aria-labelledby="studio-title">
        <div className="studio-copy" data-reveal><div className="eyebrow"><span className="eyebrow-line"></span> THE MORBIUS STUDIO</div><h2 id="studio-title">Make it<br /><span className="title-red">morph.</span></h2><p>Change the shape, tone, and feel before it ever touches your codebase. Your choices travel with the component.</p><ul className="studio-features"><li><span>01</span> Pick a visual style</li><li><span>02</span> Tune color, type & motion</li><li><span>03</span> Preview. Copy. Make it yours.</li></ul><a className="button button--ghost" href="#join">Build a custom component <span aria-hidden="true">↗</span></a></div>
        <div className="studio-panel" data-reveal data-delay="120">
          <div className="studio-panel-head"><div className="studio-breadcrumb"><span className="studio-symbol">◈</span> STUDIO <span>/</span> CUSTOMIZE</div><div className="studio-state"><span className="live-indicator"></span> UNSAVED PREVIEW</div></div>
          <div className="studio-workspace">
            <aside className="studio-controls">
              <div className="control-group"><label>Component</label><button className="select-like" type="button">Button <span>⌄</span></button></div>
              <div className="control-group"><label>Visual language</label><div className="style-options"><button className="style-option is-selected" data-style="nocturne" aria-pressed="true"><span className="style-preview style-nocturne"></span><small>Nocturne</small></button><button className="style-option" data-style="signal" aria-pressed="false"><span className="style-preview style-signal"></span><small>Signal</small></button><button className="style-option" data-style="soft" aria-pressed="false"><span className="style-preview style-soft"></span><small>Soft form</small></button></div></div>
              <div className="control-group"><label>Accent color</label><div className="color-options" role="group" aria-label="Choose accent color"><button className="color-option is-selected" style={{ "--swatch": "#f0443e" } as CSSProperties} data-accent="#f0443e" aria-label="Crimson" aria-pressed="true"></button><button className="color-option" style={{ "--swatch": "#f6b80b" } as CSSProperties} data-accent="#f6b80b" aria-label="Acid yellow" aria-pressed="false"></button><button className="color-option" style={{ "--swatch": "#9b89ff" } as CSSProperties} data-accent="#9b89ff" aria-label="Electric violet" aria-pressed="false"></button><button className="color-option" style={{ "--swatch": "#f0eee8" } as CSSProperties} data-accent="#f0eee8" aria-label="Bone white" aria-pressed="false"></button><button className="custom-color" type="button" aria-label="Choose a custom color">＋</button></div></div>
              <div className="control-group"><div className="label-row"><label htmlFor="radius-range">Corner radius</label><span className="range-value">12px</span></div><input id="radius-range" type="range" min="0" max="24" defaultValue="12" /></div>
              <div className="control-group"><div className="label-row"><label htmlFor="motion-toggle">Motion preview</label><button className="toggle-switch is-on" id="motion-toggle" type="button" role="switch" aria-checked="true" aria-label="Toggle motion preview"><i></i></button></div></div>
              <div className="studio-controls-footer"><span><i className="tiny-check">✓</i> Accessible by default</span><span><i className="tiny-check">✓</i> Responsive-ready</span></div>
            </aside>
            <div className="studio-preview" data-style-preview="nocturne" style={{ "--preview-accent": "#f0443e", "--preview-radius": "12px" } as CSSProperties}>
              <div className="preview-toolbar"><span><i></i><i></i><i></i></span><small>DESKTOP PREVIEW</small><button type="button" aria-label="Preview on mobile">▯</button></div>
              <div className="preview-canvas"><div className="preview-card"><span className="canvas-kicker">YOUR COMPONENT, YOUR RULES</span><h3>Make something<br /><em>worth looking at.</em></h3><p>Small details. Big presence.</p><button className="canvas-button">Get started <span>↗</span></button><div className="canvas-credit"><span className="tiny-bat">✦</span> morbius / button-v1</div></div></div>
              <div className="preview-bottom"><span><i className="tiny-check">✓</i> Changes are yours to keep</span><button className="copy-code" type="button"><span>&lt;/&gt;</span> Copy code</button></div>
            </div>
          </div>
        </div>
      </section>

      <section className="manifesto" aria-label="Morbius philosophy"><div className="manifesto-bat" aria-hidden="true"><svg viewBox="0 0 180 92"><path d="M90 41C78 16 53 3 22 5c13 12 16 28 11 43C18 33 8 29 0 29c20 12 28 27 30 48 16-15 33-19 54-12 2 12 4 19 6 22 2-3 4-10 6-22 21-7 38-3 54 12 2-21 10-36 30-48-8 0-18 4-33 19-5-15-2-31 11-43-31-2-56 11-68 36Z" /></svg></div><div className="manifesto-inner" data-reveal><div className="eyebrow"><span className="eyebrow-line"></span> OUR KIND OF CREATION</div><p>“Good interfaces<br />have a <span>pulse.</span>”</p><span className="manifesto-note">MAKE SOMETHING THAT FEELS LIKE YOU.</span></div><div className="manifesto-side">M / 001<br /><span>EST. AFTER DARK</span></div></section>

      <section className="community section-shell" id="community" aria-labelledby="community-title">
        <div className="community-content" data-reveal><div className="eyebrow"><span className="eyebrow-line"></span> MADE BY THE MANY</div><h2 id="community-title">A little bit<br />of <span className="title-red">everyone.</span></h2><p>Discover work from independent makers, shape it for your project, or bring your own creature to the collection.</p><a className="text-link" href="#join">Meet the community <span aria-hidden="true">→</span></a></div>
        <div className="community-wall" data-reveal data-delay="100"><div className="maker-note note-one"><span>✳</span><b>Made to remix</b><small>Every piece comes with its source.</small></div><div className="maker-note note-two"><span>↗</span><b>Your work belongs here</b><small>Publish a component. Find your people.</small></div><div className="community-orbit"><div className="community-orbit-ring"></div><div className="maker maker-main">M</div><div className="maker maker-a">V</div><div className="maker maker-b">A</div><div className="maker maker-c">K</div><div className="maker maker-d">+</div><span className="orbit-label">THE NIGHT SHIFT</span></div><span className="wall-coordinate">40° 43' 55.3" N<br />73° 59' 11.2" W</span></div>
      </section>

      <section className="plans section-shell" id="plans" aria-labelledby="plans-title">
        <div className="plans-heading" data-reveal><div><div className="eyebrow"><span className="eyebrow-line"></span> YOUR NEXT CHAPTER</div><h2 id="plans-title">Start in the dark.<br /><span className="title-red">Go anywhere.</span></h2></div><p>Morbius will grow with you. The core library stays open; premium collections and creative tools make more room to play.</p></div>
        <div className="plan-strip" data-reveal><div className="plan-intro"><span className="plan-status"><i></i> EARLY ACCESS</span><h3>Join the first wave.</h3><p>We’re building Morbius in the open. Get early access updates when the library and studio are ready.</p><a className="button button--red" href="#join">Get on the list <span aria-hidden="true">↗</span></a></div><div className="plan-includes"><span>WHAT'S COMING</span><ul><li><i>✓</i> A growing free component collection</li><li><i>✓</i> Choose your framework and visual style</li><li><i>✓</i> Customize and export your own components</li><li><i>✳</i> Premium collections for subscribers</li></ul></div><div className="plan-glow" aria-hidden="true"></div></div>
      </section>

      <section className="final-cta section-shell" id="join" data-reveal><div className="final-eyes" aria-hidden="true"><span></span><span></span></div><div className="eyebrow"><span className="eyebrow-line"></span> THIS IS YOUR INVITATION</div><h2>Come out<br />after <span className="title-red">dark.</span></h2><a className="button button--red" href="mailto:hello@morbius.design?subject=Morbius%20early%20access">Get early access <span aria-hidden="true">↗</span></a><span className="final-note">NO SPAM. JUST THE GOOD STUFF FROM THE NIGHT SHIFT.</span></section>
    </main>

    <footer className="site-footer"><a className="brand footer-brand" href="#top"><span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 54 34"><path d="M27 13C22 3 12 1 3 2c4 4 5 9 4 14-4-4-7-5-7-5 5 7 8 12 8 19 5-5 10-7 16-4 1 3 2 5 3 6 1-1 2-3 3-6 6-3 11-1 16 4 0-7 3-12 8-19 0 0-3 1-7 5-1-5 0-10 4-14-9-1-19 1-24 11Z" /></svg></span><span className="brand-name">MORBIUS<span className="brand-period">.</span></span></a><span className="footer-copy">A component ecosystem for interfaces with a pulse.</span><div className="footer-links"><a href="#collection">Library</a><a href="#studio">Studio</a><a href="#plans">Plans</a><a href="mailto:hello@morbius.design">Contact</a></div><span className="footer-mark">© MORBIUS 2026 <i>·</i> BUILT AFTER DARK</span></footer>
    <div className="toast" role="status" aria-live="polite"></div>
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  );
}
