const COLORS = ['#b3c6e0', '#f7e7ce', '#e0e7ef', '#f5f5f5', '#d1bfa7', '#7fa8d6', '#f7b2ad', '#ffe7a3', '#b7e2c7', '#f7c59f', '#d6b3e0', '#f9f9f9'];
let styleSheet = null;
let particleCount = 0;

function ensureStyleSheet() {
  if (!styleSheet) {
    const el = document.createElement('style');
    document.head.appendChild(el);
    styleSheet = el;
  }
}

function addKeyframe(id, drift, spin) {
  ensureStyleSheet();
  styleSheet.textContent += `@keyframes fall-${id} {
    0%   { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
    4%   { opacity: 1; }
    65%  { opacity: 1; }
    88%  { opacity: 0.35; }
    100% { transform: translateY(108vh) translateX(${drift}px) rotate(${spin}deg); opacity: 0; }
  }`;
}

function launchConfetti() {
  const container = document.createElement('div');
  container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;overflow:hidden;';
  document.body.appendChild(container);

  // Bentuk bulat (circle only)

  for (let i = 0; i < 80; i++) {
    const id = ++particleCount;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    // Bulat: diameter seragam
    const size = 12 + Math.random() * 10; // 12-22px
    const delay = Math.random() * 1.2;
    const duration = 2.8 + Math.random() * 1.2;
    const drift = (Math.random() - 0.5) * 80;
    const spin = 120 + Math.random() * 120;

    addKeyframe(id, drift, spin);

    const el = document.createElement('div');
    el.style.cssText = `
      position: absolute;
      top: -30px;
      opacity: 0;
      left: ${Math.random() * 100}vw;
      width: ${size}px;
      height: ${size}px;
      background-color: ${color};
      border-radius: 50%;
      animation: fall-${id} ${duration}s ${delay}s linear forwards;
      filter: brightness(1);
      box-shadow: 0 0 2px ${color}33;
    `;

    container.appendChild(el);
  }

  // Cleanup otomatis setelah selesai
  setTimeout(() => {
    container.remove();
    if (styleSheet) styleSheet.textContent = '';
  }, 8000);
}

window.addEventListener('DOMContentLoaded', launchConfetti);