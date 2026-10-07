const root = document.documentElement;
const toast = document.querySelector('.toast');
let toastTimer;

function announce(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2400);
}

const wallpaperTrigger = document.querySelector('.wallpaper-trigger');
const wallpaperMenu = document.querySelector('.wallpaper-menu');
const wallpaperLabels = { 'blood-moon': 'Blood moon', 'night-flight': 'Night flight', eclipse: 'Eclipse' };

wallpaperTrigger.addEventListener('click', () => {
  const open = wallpaperTrigger.getAttribute('aria-expanded') === 'true';
  wallpaperTrigger.setAttribute('aria-expanded', String(!open));
  wallpaperMenu.hidden = open;
});

wallpaperMenu.querySelectorAll('[data-wallpaper-choice]').forEach((choice) => {
  choice.addEventListener('click', () => {
    const wallpaper = choice.dataset.wallpaperChoice;
    root.dataset.wallpaper = wallpaper;
    wallpaperTrigger.querySelector('.wallpaper-label').textContent = wallpaperLabels[wallpaper];
    wallpaperMenu.querySelectorAll('[data-wallpaper-choice]').forEach((item) => item.setAttribute('aria-checked', String(item === choice)));
    wallpaperTrigger.setAttribute('aria-expanded', 'false');
    wallpaperMenu.hidden = true;
    announce(`${wallpaperLabels[wallpaper]} atmosphere selected`);
  });
});

document.addEventListener('click', (event) => {
  if (!wallpaperMenu.contains(event.target) && !wallpaperTrigger.contains(event.target)) {
    wallpaperMenu.hidden = true;
    wallpaperTrigger.setAttribute('aria-expanded', 'false');
  }
});

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  menuToggle.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
  mainNav.classList.toggle('is-open', !open);
});
mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mainNav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
}));

document.querySelectorAll('[data-theme-choice]').forEach((choice) => {
  choice.addEventListener('click', () => {
    const theme = choice.dataset.themeChoice;
    document.querySelectorAll('[data-theme-choice]').forEach((item) => {
      item.classList.toggle('is-active', item === choice);
      item.setAttribute('aria-pressed', String(item === choice));
    });
    document.querySelector('.preview-window').dataset.previewTheme = theme;
  });
});

document.querySelectorAll('[data-category]').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('[data-category]').forEach((item) => {
      item.classList.toggle('is-active', item === tab);
      item.setAttribute('aria-selected', String(item === tab));
    });
    const category = tab.dataset.category;
    document.querySelectorAll('.collection-card').forEach((card) => {
      card.hidden = category !== 'all' && card.dataset.kind !== category;
    });
  });
});

document.querySelectorAll('.save-card').forEach((button) => {
  button.addEventListener('click', () => {
    const saved = button.getAttribute('aria-pressed') === 'true';
    button.setAttribute('aria-pressed', String(!saved));
    button.textContent = saved ? '♡' : '♥';
    announce(saved ? 'Removed from your saved collection' : 'Saved to your collection');
  });
});

document.querySelectorAll('[data-style]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-style]').forEach((item) => {
      item.classList.toggle('is-selected', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
    document.querySelector('.studio-preview').dataset.stylePreview = button.dataset.style;
  });
});

document.querySelectorAll('[data-accent]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-accent]').forEach((item) => {
      item.classList.toggle('is-selected', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
    document.querySelector('.studio-preview').style.setProperty('--preview-accent', button.dataset.accent);
  });
});

const radiusRange = document.querySelector('#radius-range');
radiusRange.addEventListener('input', () => {
  document.querySelector('.studio-preview').style.setProperty('--preview-radius', `${radiusRange.value}px`);
  document.querySelector('.range-value').textContent = `${radiusRange.value}px`;
});

const motionToggle = document.querySelector('#motion-toggle');
motionToggle.addEventListener('click', () => {
  const enabled = motionToggle.getAttribute('aria-checked') !== 'true';
  motionToggle.setAttribute('aria-checked', String(enabled));
  motionToggle.classList.toggle('is-on', enabled);
  document.querySelector('.studio-preview').classList.toggle('is-motion', enabled);
});

document.querySelector('.copy-code').addEventListener('click', async () => {
  const code = '<Button variant="nocturne" accent="crimson" radius={12}>Get started</Button>';
  try {
    await navigator.clipboard.writeText(code);
    announce('Component snippet copied');
  } catch {
    announce('Preview ready to customize');
  }
});

document.querySelector('.custom-color').addEventListener('click', () => announce('Custom color picker is coming to the studio'));
document.querySelector('.select-like').addEventListener('click', () => announce('More component types are coming soon'));
document.querySelector('.preview-toolbar button').addEventListener('click', () => announce('Responsive preview controls are coming soon'));
document.querySelector('.sort-control').addEventListener('click', () => announce('Showing the newest additions first'));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });
document.querySelectorAll('[data-reveal]').forEach((element) => revealObserver.observe(element));

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('[data-reveal]').forEach((element) => element.classList.add('is-visible'));
} else {
  document.querySelectorAll('.preview-window, .studio-panel').forEach((element) => {
    element.addEventListener('pointermove', (event) => {
      const bounds = element.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      if (element.classList.contains('preview-window')) element.style.transform = `rotateY(${x * -4}deg) rotateX(${y * 3}deg) translateY(-2px)`;
    });
    element.addEventListener('pointerleave', () => {
      if (element.classList.contains('preview-window')) element.style.removeProperty('transform');
    });
  });
}
