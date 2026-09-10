/* ==============================================
   FIRDAUS J. ARIFIN - 8-BIT PORTFOLIO
   ============================================== */

'use strict';

/* ============ LOADING SCREEN ============ */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loadingScreen').classList.add('hidden');
  }, 2500);
});

/* ============ CUSTOM CURSOR ============ */
const cursor = document.getElementById('cursor');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.2;
  cursorY += (mouseY - cursorY) * 0.2;
  if (cursor) {
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
  }
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .skill-card, .project-card, .pet-mage').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cursor) {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
      cursor.style.background = '#ff006e';
    }
  });
  el.addEventListener('mouseleave', () => {
    if (cursor) {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.background = 'var(--accent-2)';
    }
  });
});

/* ============ NAVBAR SCROLL ============ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveLink();
});

/* ============ HAMBURGER MENU ============ */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

/* ============ ACTIVE LINK ON SCROLL ============ */
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 150;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);

    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

/* ============ TYPING EFFECT ============ */
const typingText = document.getElementById('typingText');
const phrases = [
  '> Firdaus J. Arifin',
  '> Mahasiswa Sistem Informasi',
  '> Semester 5 | GPA 3.92',
  '> Universitas Pamulang Serang',
  '> Web & Mobile Developer'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typingText) return;
  
  const current = phrases[phraseIndex];
  
  if (isDeleting) {
    typingText.textContent = current.substring(0, charIndex--);
  } else {
    typingText.textContent = current.substring(0, charIndex++);
  }

  let speed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === current.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 500;
  }

  setTimeout(typeEffect, speed);
}
setTimeout(typeEffect, 3000);

/* ============ COUNTER ANIMATION ============ */
const counters = document.querySelectorAll('.stat-num');
let countersStarted = false;

function animateCounters() {
  counters.forEach(counter => {
    const target = +counter.dataset.count;
    const divisor = counter.dataset.divide ? +counter.dataset.divide : 1;
    const increment = target / 60;
    let current = 0;

    const update = () => {
      current += increment;
      if (current < target) {
        const val = current / divisor;
        counter.textContent = divisor > 1 ? val.toFixed(2) : Math.floor(val);
        requestAnimationFrame(update);
      } else {
        const val = target / divisor;
        counter.textContent = divisor > 1 ? val.toFixed(2) : target;
      }
    };
    update();
  });
}

/* ============ STAT BARS ============ */
const statBars = document.querySelectorAll('.fill');
let barsStarted = false;

function animateBars() {
  statBars.forEach(bar => {
    bar.style.width = bar.dataset.width + '%';
  });
}

/* ============ INTERSECTION OBSERVER ============ */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (!countersStarted && entry.target.classList.contains('hero-stats')) {
        countersStarted = true;
        animateCounters();
      }
      if (!barsStarted && entry.target.classList.contains('about-grid')) {
        barsStarted = true;
        animateBars();
      }
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.hero-stats, .about-grid, .skill-card, .project-card, .social-card')
  .forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s, transform 0.6s';
    observer.observe(el);
  });

/* ============ THEME TOGGLE ============ */
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    themeToggle.textContent = next === 'dark' ? '🌙' : '☀️';
    localStorage.setItem('theme', next);
  });

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
  }
}

/* ============ SOUND TOGGLE ============ */
const soundToggle = document.getElementById('soundToggle');
const bgm = document.getElementById('bgm');
let soundOn = false;

if (soundToggle && bgm) {
  soundToggle.addEventListener('click', () => {
    soundOn = !soundOn;
    if (soundOn) {
      bgm.volume = 0.3;
      bgm.play().catch(() => console.log('Autoplay diblokir'));
      soundToggle.textContent = '🔊';
    } else {
      bgm.pause();
      soundToggle.textContent = '🔇';
    }
  });
}

/* ============ FORM SUBMIT ============ */
/* ============ FORMSPREE AJAX INTEGRATION ============ */
(function() {
  window.formspree = window.formspree || function() {
    (formspree.q = formspree.q || []).push(arguments);
  };
  formspree('initForm', {
    formElement: '#contactForm',
    formId: 'xldwpbko' // ⚠️ GANTI dengan Form ID kamu
  });
})();

/* ==============================================
   MAGE PET CONTROLLER
   ============================================== */

const petMage = document.getElementById('petMage');
const mageSprite = document.getElementById('mageSprite');
const fireSprite = document.getElementById('fireSprite');
const scoreValue = document.getElementById('scoreValue');

let spellCount = 0;
let isAttacking = false;

/* ============ AUTO-DETECT SPRITES ============ */
(async () => {
  const checkSprite = (url) => new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
  
  const hasMage = await checkSprite('assets/images/mage-front.png');
  console.log(hasMage ? '✅ Mage pet loaded' : '⚠️ Mage PNG tidak ditemukan');
  
  if (!hasMage && petMage) {
    petMage.style.display = 'none';
  }
})();

/* ============ SET DIRECTION ============ */
function setDirection(dir) {
  if (isAttacking || !mageSprite) return;
  mageSprite.dataset.direction = dir;
}

/* ============ MOUSE TRACKING ============ */
if (petMage) {
  document.addEventListener('mousemove', (e) => {
    if (!petMage || isAttacking) return;
    
    const rect = petMage.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    
    if (Math.abs(dx) > Math.abs(dy)) {
      setDirection(dx > 0 ? 'right' : 'left');
    } else {
      setDirection(dy > 0 ? 'front' : 'back');
    }
    
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 250 && !isAttacking && fireSprite) {
      fireSprite.classList.add('charging');
    } else if (fireSprite) {
      fireSprite.classList.remove('charging');
    }
  });

  /* ============ CLICK → ATTACK ============ */
  petMage.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isAttacking) return;
    isAttacking = true;
    
    const rect = petMage.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    
    if (Math.abs(dx) > Math.abs(dy)) {
      mageSprite.dataset.direction = dx > 0 ? 'right' : 'left';
    } else {
      mageSprite.dataset.direction = dy > 0 ? 'front' : 'back';
    }
    
    fireSprite.classList.remove('charging');
    fireSprite.classList.add('attacking');
    
    spawnEmbers(10);
    spawnFireball(e.clientX, e.clientY);
    
    spellCount++;
    if (scoreValue) {
      scoreValue.textContent = spellCount;
      scoreValue.classList.remove('bump');
      void scoreValue.offsetWidth;
      scoreValue.classList.add('bump');
    }
    
    if (spellCount % 10 === 0) {
      showAchievement(`🔥 ${spellCount} SPELLS!`);
    }
    
    setTimeout(() => {
      isAttacking = false;
      fireSprite.classList.remove('attacking');
    }, 800);
  });
}

/* ============ FIREBALL ============ */
function spawnFireball(targetX, targetY) {
  if (!petMage) return;
  
  const rect = petMage.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const startY = rect.top + rect.height / 2;
  
  const fireball = document.createElement('div');
  fireball.className = 'fireball-projectile';
  fireball.style.cssText = `
    position: fixed;
    left: ${startX}px;
    top: ${startY}px;
    width: 40px;
    height: 40px;
    background-image: url('assets/images/fire.png');
    background-size: 800% 100%;
    background-repeat: no-repeat;
    image-rendering: pixelated;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 9998;
    animation: fireballFly 0.5s steps(8) infinite;
    filter: drop-shadow(0 0 10px #ff6b1a);
  `;
  
  document.body.appendChild(fireball);
  
  const dx = targetX - startX;
  const dy = targetY - startY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const duration = Math.min(distance / 1.5, 600);
  
  fireball.animate([
    { transform: 'translate(-50%, -50%) scale(0.5)', opacity: 1 },
    { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1.5)`, opacity: 0.9 }
  ], {
    duration: duration,
    easing: 'cubic-bezier(0.4, 0, 0.6, 1)'
  });
  
  setTimeout(() => {
    fireball.remove();
    spawnExplosion(targetX, targetY);
  }, duration);
}

/* ============ EXPLOSION ============ */
function spawnExplosion(x, y) {
  const explosion = document.createElement('div');
  explosion.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    width: 60px;
    height: 60px;
    background-image: url('assets/images/fire.png');
    background-size: 800% 100%;
    background-repeat: no-repeat;
    image-rendering: pixelated;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 9997;
    animation: fireExplode 0.6s steps(8) 1;
  `;
  document.body.appendChild(explosion);
  
  for (let i = 0; i < 8; i++) {
    const ember = document.createElement('div');
    ember.className = 'ember-particle';
    ember.style.left = x + 'px';
    ember.style.top = y + 'px';
    ember.style.background = '#ffcc00';
    ember.style.boxShadow = '0 0 10px #ff6b1a';
    
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * 80 + 40;
    const edx = Math.cos(angle) * dist;
    const edy = Math.sin(angle) * dist;
    
    document.body.appendChild(ember);
    
    ember.animate([
      { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
      { transform: `translate(calc(-50% + ${edx}px), calc(-50% + ${edy}px)) scale(0)`, opacity: 0 }
    ], { duration: 700, easing: 'ease-out' });
    
    setTimeout(() => ember.remove(), 700);
  }
  
  setTimeout(() => explosion.remove(), 600);
}

/* ============ KEYFRAMES DINAMIS ============ */
const dynamicStyle = document.createElement('style');
dynamicStyle.textContent = `
  @keyframes fireballFly {
    from { background-position: 0% 0; }
    to   { background-position: -800% 0; }
  }
  @keyframes fireExplode {
    from { background-position: 0% 0; }
    to   { background-position: -800% 0; }
  }
  @keyframes achievementPop {
    0%   { transform: translate(-50%, 20px) scale(0.5); opacity: 0; }
    20%  { transform: translate(-50%, 0) scale(1.1); opacity: 1; }
    80%  { transform: translate(-50%, 0) scale(1); opacity: 1; }
    100% { transform: translate(-50%, -20px) scale(0.9); opacity: 0; }
  }
`;
document.head.appendChild(dynamicStyle);

/* ============ EMBER PARTICLES ============ */
function spawnEmbers(count) {
  if (!petMage) return;
  
  const rect = petMage.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  for (let i = 0; i < count; i++) {
    const ember = document.createElement('div');
    ember.className = 'ember-particle';
    
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 60 + 30;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    
    ember.style.left = centerX + 'px';
    ember.style.top = centerY + 'px';
    
    const colors = ['#ffcc00', '#ff6b1a', '#ff006e', '#fffbe6'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    ember.style.background = color;
    ember.style.boxShadow = `0 0 8px ${color}`;
    
    document.body.appendChild(ember);
    
    ember.animate([
      { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
      { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0)`, opacity: 0 }
    ], { duration: 600 + Math.random() * 400, easing: 'ease-out' });
    
    setTimeout(() => ember.remove(), 1000);
  }
}

/* ============ ACHIEVEMENT ============ */
function showAchievement(text) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    font-family: var(--font-pixel);
    font-size: 0.9rem;
    padding: 0.8rem 1.5rem;
    background: linear-gradient(135deg, #ff6b1a, #ff006e);
    color: white;
    border: 3px solid #ffcc00;
    box-shadow: 0 0 30px #ff6b1a;
    z-index: 9999;
    pointer-events: none;
    animation: achievementPop 1.5s ease-out;
  `;
  toast.textContent = text;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1500);
}

/* ============ SCROLL — arah mage ikut scroll ============ */
let scrollTimer;
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  if (isAttacking || !mageSprite) return;
  
  const currentY = window.scrollY;
  const delta = currentY - lastScrollY;
  
  if (Math.abs(delta) > 3) {
    setDirection(delta > 0 ? 'back' : 'front');
  }
  
  lastScrollY = currentY;
  
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => setDirection('front'), 500);
});

/* ============ PAUSE SAAT TAB TIDAK AKTIF ============ */
document.addEventListener('visibilitychange', () => {
  if (mageSprite) {
    mageSprite.style.animationPlayState = document.hidden ? 'paused' : 'running';
  }
  if (fireSprite) {
    fireSprite.style.animationPlayState = document.hidden ? 'paused' : 'running';
  }
});

/* ============ KONAMI CODE ============ */
const konamiCode = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
  'b','a'
];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      activateInfernoMode();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

function activateInfernoMode() {
  alert('🔥 INFERNO MODE! 🔥');
  
  let count = 0;
  const interval = setInterval(() => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    spawnFireball(x, y);
    spawnEmbers(5);
    if (count++ > 20) clearInterval(interval);
  }, 150);
  
  document.body.style.animation = 'rainbow 2s linear infinite';
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rainbow {
      0% { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
  
  setTimeout(() => {
    document.body.style.animation = '';
  }, 5000);
}

/* ============ CANVAS BACKGROUND ============ */
const canvas = document.getElementById('gameCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Pixel {
    constructor() {
      this.reset();
      this.y = Math.random() * canvas.height;
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = -10;
      this.size = Math.random() * 3 + 1;
      this.speed = Math.random() * 1.5 + 0.5;
      this.color = ['#6c5ce7', '#00f5d4', '#ff006e', '#ffbe0b'][Math.floor(Math.random() * 4)];
      this.opacity = Math.random() * 0.6 + 0.2;
    }
    update() {
      this.y += this.speed;
      if (this.y > canvas.height) this.reset();
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.fillRect(Math.floor(this.x), Math.floor(this.y), this.size, this.size);
      ctx.globalAlpha = 1;
    }
  }

  for (let i = 0; i < 80; i++) particles.push(new Pixel());

  function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateCanvas);
  }
  animateCanvas();
}

/* ============ SMOOTH SCROLL ============ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ============ CONSOLE ============ */
console.log('%c🎮 FIRDAUS J. ARIFIN - 8-BIT PORTFOLIO', 
  'color: #00f5d4; font-size: 20px; font-family: monospace; font-weight: bold;');
console.log('%c> Type ↑↑↓↓←→←→BA for INFERNO MODE! 🔥', 
  'color: #ffbe0b; font-size: 14px; font-family: monospace;');