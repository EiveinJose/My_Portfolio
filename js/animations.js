/* ==========================================================================
   EIVEN JOSE - ANIMATIONS CONTROLLER
   Typewriter, 3D card tilt, IntersectionObserver reveals & counter engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ---------------------------------------------------------
     1. TYPEWRITER EFFECT
     --------------------------------------------------------- */
  const typedTarget = document.getElementById('typed-text');
  if (typedTarget) {
    const phrases = [
      'Full-Stack Developer',
      'BCA Graduate',
      'React & Node.js Builder',
      'Creative UI/UX Engineer',
      'Cloud & API Architect',
      'Problem Solver'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 90;
    const eraseSpeed = 45;
    const holdDelay = 1800;

    function typeLoop() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typedTarget.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedTarget.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }

      let delta = isDeleting ? eraseSpeed : typeSpeed;

      if (!isDeleting && charIndex === currentPhrase.length) {
        delta = holdDelay;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delta = 400;
      }

      setTimeout(typeLoop, delta);
    }

    setTimeout(typeLoop, 600);
  }

  /* ---------------------------------------------------------
     2. 3D TILT EFFECT ON CARDS
     --------------------------------------------------------- */
  const tiltElements = document.querySelectorAll('[data-tilt]');
  tiltElements.forEach((el) => {
    let bounds;

    function updateBounds() {
      bounds = el.getBoundingClientRect();
    }

    el.addEventListener('mouseenter', () => {
      updateBounds();
      el.style.transition = 'transform 0.1s ease-out';
    });

    el.addEventListener('mousemove', (e) => {
      if (!bounds) updateBounds();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const xPct = mouseX / bounds.width - 0.5;
      const yPct = mouseY / bounds.height - 0.5;

      const maxTilt = parseFloat(el.getAttribute('data-tilt-max')) || 12;
      const tiltX = -yPct * maxTilt;
      const tiltY = xPct * maxTilt;

      el.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  /* ---------------------------------------------------------
     3. INTERSECTION OBSERVER - SCROLL REVEALS
     --------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-parent');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.15
    });

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  /* ---------------------------------------------------------
     4. ANIMATED STATS COUNTER
     --------------------------------------------------------- */
  const counters = document.querySelectorAll('.stat-number[data-target]');
  let hasCounted = false;

  function countUp(counter) {
    const target = +counter.getAttribute('data-target');
    const suffix = counter.getAttribute('data-suffix') || '';
    const duration = 1800; // ms
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.floor(ease * target);
      counter.textContent = currentVal + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = target + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  const statsSection = document.querySelector('.stats-section');
  if (statsSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasCounted) {
          hasCounted = true;
          counters.forEach((c) => countUp(c));
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
  } else {
    counters.forEach((c) => countUp(c));
  }
});
