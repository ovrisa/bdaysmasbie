/* ════════════════════════════════════════
   script.js — Birthday Website
   ════════════════════════════════════════ */

/* ─── 1. GENERATE STARS ─── */
const starsEl = document.getElementById('stars');
for (let i = 0; i < 80; i++) {
  const s = document.createElement('div');
  s.classList.add('star');
  const size = Math.random() * 2.5 + 0.5;
  s.style.cssText = `
    width:${size}px; height:${size}px;
    top:${Math.random() * 100}%;
    left:${Math.random() * 100}%;
    --dur:${(Math.random() * 4 + 2).toFixed(1)}s;
    --op:${(Math.random() * 0.6 + 0.2).toFixed(2)};
    animation-delay:${(Math.random() * 6).toFixed(1)}s;
  `;
  starsEl.appendChild(s);
}

/* ─── 2. HERO PHOTO: entrance → float ─── */
const photoWrap = document.querySelector('.hero-photo-wrap');
setTimeout(() => {
  photoWrap.classList.add('loaded');
}, 1600);

/* ─── 3. BUILD CALENDAR ─── */
// March 2026 starts on Sunday (startDay = 0), 31 days total
const calGrid    = document.querySelector('.cal-grid');
const startDay   = 0;
const totalDays  = 31;
const birthdayDay = 13;

// Remove static placeholder highlight if any
const existingHighlight = calGrid.querySelector('.highlight');
if (existingHighlight) existingHighlight.remove();

// Empty cells before day 1
for (let i = 0; i < startDay; i++) {
  const empty = document.createElement('div');
  empty.className = 'cal-day empty';
  calGrid.appendChild(empty);
}

// Day cells
for (let d = 1; d <= totalDays; d++) {
  const cell = document.createElement('div');
  cell.className = 'cal-day' + (d === birthdayDay ? ' highlight' : '');
  cell.textContent = d;
  calGrid.appendChild(cell);
}

/* ─── 4. SCROLL REVEAL ─── */
const revealEls = document.querySelectorAll('.reveal');
const revealIO  = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealIO.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealIO.observe(el));

/* ─── 5. PARALLAX ON SCROLL ─── */
const heroPhoto  = document.querySelector('.hero-photo-wrap');
const heroBg     = document.querySelector('.hero-bg');
const calWrap    = document.getElementById('calWrap');
const bdayCard   = document.getElementById('bdayCard');

window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  const vh = window.innerHeight;

  // Hero photo drifts up gently as you scroll away
  if (heroPhoto && sy < vh) {
    heroPhoto.style.transform = `translateY(${sy * 0.12}px)`;
  }

  // Hero background parallax (slower than content)
  if (heroBg && sy < vh) {
    heroBg.style.transform = `translateY(${sy * 0.25}px)`;
  }

  // Calendar section: left/right counter drift
  const calSection = document.getElementById('calendar-section');
  if (calSection && calWrap && bdayCard) {
    const rect = calSection.getBoundingClientRect();
    if (rect.top < vh && rect.bottom > 0) {
      const progress = (vh - rect.top) / (vh + rect.height);
      const offset   = (progress - 0.5) * 30;
      if (calWrap.classList.contains('visible')) {
        calWrap.style.transform = `translateX(${-offset * 0.6}px)`;
      }
      if (bdayCard.classList.contains('visible')) {
        bdayCard.style.transform = `translateX(${offset * 0.6}px)`;
      }
    }
  }

  // Wishes section: vertical float (photo up, content down)
  const wishSection = document.getElementById('wishes');
  const wishPhoto   = document.getElementById('wishPhoto');
  const wishContent = document.getElementById('wishContent');
  if (wishSection && wishPhoto && wishContent) {
    const rect = wishSection.getBoundingClientRect();
    if (rect.top < vh && rect.bottom > 0) {
      const progress = (vh - rect.top) / (vh + rect.height);
      const offset   = (progress - 0.5) * 40;
      if (wishPhoto.classList.contains('visible')) {
        wishPhoto.style.transform = `translateY(${-offset * 0.4}px)`;
      }
      if (wishContent.classList.contains('visible')) {
        wishContent.style.transform = `translateY(${offset * 0.3}px)`;
      }
    }
  }

}, { passive: true });