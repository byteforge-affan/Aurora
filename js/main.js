/* ================================================
   AURORA – main.js
   ================================================ */

'use strict';

/* ---------- Navbar Scroll ---------- */
(function () {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ---------- Back-to-top ---------- */
(function () {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ---------- Scroll Reveal ---------- */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();

/* ---------- Hero Load Animation ---------- */
(function () {
  const hero = document.getElementById('hero');
  if (!hero) return;
  window.addEventListener('load', () => hero.classList.add('loaded'));
})();

/* ---------- Typing Animation ---------- */
(function () {
  const el = document.getElementById('typedText');
  if (!el) return;
  const words = ['Digital Experiences', 'Creative Solutions', 'Brand Identity', 'Future Visions'];
  let wi = 0, ci = 0, deleting = false;

  const cursor = document.createElement('span');
  cursor.className = 'typed-cursor';
  el.parentNode.insertBefore(cursor, el.nextSibling);

  function type() {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.substring(0, ci + 1);
      ci++;
      if (ci === word.length) { setTimeout(() => { deleting = true; type(); }, 1800); return; }
    } else {
      el.textContent = word.substring(0, ci - 1);
      ci--;
      if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(type, deleting ? 60 : 110);
  }
  setTimeout(type, 1200);
})();

/* ---------- Stat Counter ---------- */
(function () {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.round(current) + suffix;
        if (current >= target) clearInterval(timer);
      }, 16);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => io.observe(c));
})();

/* ---------- Gallery Filter ---------- */
(function () {
  const btns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.masonry-item');
  if (!btns.length) return;
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      items.forEach(item => {
        const match = cat === 'all' || item.dataset.category === cat;
        item.style.display = match ? 'block' : 'none';
      });
    });
  });
})();

/* ---------- Lightbox ---------- */
(function () {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  const lbImg = lb.querySelector('.lightbox-img');
  const close = lb.querySelector('.lightbox-close');

  document.querySelectorAll('[data-lightbox]').forEach(item => {
    item.addEventListener('click', () => {
      lbImg.src = item.dataset.lightbox;
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
  const closeLb = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };
  close.addEventListener('click', closeLb);
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });
})();

/* ---------- Contact Form Validation ---------- */
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const showError = (id, msg) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
  };
  const clearError = (id) => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('show');
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name  = form.querySelector('#name');
    const email = form.querySelector('#email');
    const subj  = form.querySelector('#subject');
    const msg   = form.querySelector('#message');

    clearError('nameErr');
    clearError('emailErr');
    clearError('subjectErr');
    clearError('messageErr');

    if (!name.value.trim() || name.value.trim().length < 2) {
      showError('nameErr', 'Please enter your full name (min 2 characters).');
      valid = false;
    }
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRx.test(email.value.trim())) {
      showError('emailErr', 'Please enter a valid email address.');
      valid = false;
    }
    if (subj && (!subj.value.trim() || subj.value.trim().length < 3)) {
      showError('subjectErr', 'Please enter a subject (min 3 characters).');
      valid = false;
    }
    if (!msg.value.trim() || msg.value.trim().length < 20) {
      showError('messageErr', 'Message must be at least 20 characters.');
      valid = false;
    }

    if (valid) {
      const btn = form.querySelector('.submit-btn');
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check me-2"></i>Message Sent!';
      btn.style.background = '#22c55e';
      btn.disabled = true;
      setTimeout(() => {
        form.reset();
        btn.innerHTML = orig;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }
  });

  // Real-time clear
  form.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', () => {
      const errId = el.id + 'Err';
      clearError(errId);
    });
  });
})();

/* ---------- Smooth Active Nav Link ---------- */
(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* ---------- Navbar Mobile Close on Click ---------- */
(function () {
  const collapse = document.querySelector('.navbar-collapse');
  if (!collapse) return;
  collapse.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const bsCollapse = bootstrap.Collapse.getInstance(collapse);
      if (bsCollapse) bsCollapse.hide();
    });
  });
})();
