/* ============ SWDL SALON — multi-page interactions & auto-play ============ */
(function () {
  'use strict';

  /* ---------- Generic auto-playing crossfade slider ---------- */
  function autoSlider(slidesSel, dotsSel, interval, prevBtn, nextBtn) {
    const slides = Array.from(document.querySelectorAll(slidesSel));
    const dotsWrap = dotsSel ? document.querySelector(dotsSel) : null;
    if (!slides.length) return;

    let index = 0;
    let timer = null;

    // Build dots if only an empty wrapper was provided
    let dots = [];
    if (dotsWrap) {
      dots = Array.from(dotsWrap.querySelectorAll('.dot'));
      if (!dots.length) {
        slides.forEach((_, i) => {
          const d = document.createElement('button');
          d.className = 'dot' + (i === 0 ? ' active' : '');
          d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
          dotsWrap.appendChild(d);
        });
        dots = Array.from(dotsWrap.querySelectorAll('.dot'));
      }
    }

    function go(n) {
      slides[index].classList.remove('active');
      if (dots[index]) dots[index].classList.remove('active');
      index = (n + slides.length) % slides.length;
      slides[index].classList.add('active');
      if (dots[index]) dots[index].classList.add('active');
    }

    function play() {
      stop();
      timer = setInterval(() => go(index + 1), interval);
    }
    function stop() { if (timer) clearInterval(timer); }

    dots.forEach((d, i) => d.addEventListener('click', () => { go(i); play(); }));
    if (prevBtn) prevBtn.addEventListener('click', () => { go(index - 1); play(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { go(index + 1); play(); });

    // Pause when tab is hidden to save resources, resume on return
    document.addEventListener('visibilitychange', () => {
      document.hidden ? stop() : play();
    });

    play();
  }

  /* ---------- Hero slideshow (auto-plays every 5s) — home only ---------- */
  autoSlider('.hero-slide', '#heroDots', 5000,
    document.getElementById('heroPrev'),
    document.getElementById('heroNext'));

  /* ---------- Featured slideshow (auto-plays every 4s) — home & gallery ---------- */
  autoSlider('.feature-slide', '#featureDots', 4000);

  /* ---------- Infinite auto-scrolling marquee — gallery page ---------- */
  const track = document.getElementById('marqueeTrack');
  if (track) {
    // Duplicate slides so the -50% translate loops seamlessly
    track.innerHTML += track.innerHTML;
  }

  /* ---------- Lightbox (marquee + photo grid) ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  if (lightbox) {
    const closeBox = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    };

    [track, document.querySelector('.photo-grid')].forEach((container) => {
      if (!container) return;
      container.addEventListener('click', (e) => {
        const img = e.target.closest('img');
        if (!img) return;
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeBox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeBox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeBox(); });
  }

  /* ---------- Navbar: shadow on scroll, mobile menu & active page ---------- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  });

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => navLinks.classList.remove('open'))
    );
  }

  // Highlight the current page in the navigation
  const currentPage = (location.pathname.split('/').pop() || 'index.html').split('?')[0] || 'index.html';
  const navAnchors = document.querySelectorAll('.nav-links a');
  navAnchors.forEach((a) => {
    const href = (a.getAttribute('href') || '').split('/').pop();
    if (href === currentPage) a.classList.add('active');
  });

  /* ---------- Contact form (demo handler) ---------- */
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  if (form && note) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      note.textContent = '✔ Thank you! Your message has been noted — we will get back to you shortly.';
      form.reset();
      setTimeout(() => { note.textContent = ''; }, 6000);
    });
  }

  /* ---------- Footer year (every page) ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
