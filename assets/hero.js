// hero.js
(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Elements
  const heroContent = document.querySelector('.hero-content');
  const heroImageWrap = document.querySelector('.hero-image-wrap');
  const heroImg = document.getElementById('hero-photo');
  const ctaResume = document.getElementById('cta-resume');

  // Add initial fade-in-up marker
  if (heroContent) heroContent.classList.add('fade-in-up');

  // IntersectionObserver to reveal hero content
  if (!prefersReduced && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    io.observe(heroContent);
  } else {
    // Immediately show for reduced-motion users or fallback
    requestAnimationFrame(() => heroContent.classList.add('in-view'));
  }

  // Parallax subtle movement on mouse move (desktop only)
  function onPointerMove(e) {
    if (window.matchMedia('(hover: none)').matches) return; // skip on touch devices
    const rect = heroImageWrap.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width; // -0.5..0.5
    const dy = (e.clientY - cy) / rect.height;
    // small transforms for a natural feel
    const tx = dx * 8; // horizontal tilt px
    const ty = dy * 6;
    const rot = dx * 2; // degrees
    heroImageWrap.style.transform = `translate3d(${tx}px, ${-Math.abs(ty)}px, 0) rotate(${rot}deg) scale(1.01)`;
    heroImg.style.transform = `rotate(${rot * 0.5}deg)`;
  }
  function resetParallax() {
    heroImageWrap.style.transform = '';
    heroImg.style.transform = '';
  }
  if (heroImageWrap) {
    document.addEventListener('mousemove', onPointerMove);
    document.addEventListener('mouseleave', resetParallax);
    // touch-friendly: subtle tilt on touchstart
    document.addEventListener('touchstart', (ev) => {
      if (!ev.touches || ev.touches.length === 0) return;
      const t = ev.touches[0];
      onPointerMove({ clientX: t.clientX, clientY: t.clientY });
      setTimeout(resetParallax, 600);
    }, { passive: true });
  }

  // CTA keyboard affordance (enter/space triggers focus ripple via :active styles)
  if (ctaResume) {
    ctaResume.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        ctaResume.click();
      }
    });
  }

  // Optional: small typewriter effect for the role-text (disabled for reduce-motion)
  const roleEl = document.querySelector('.role-text');
  if (roleEl && !prefersReduced) {
    const fullText = roleEl.textContent.trim();
    roleEl.textContent = '';
    let i = 0;
    function type() {
      if (i <= fullText.length) {
        roleEl.textContent = fullText.slice(0, i++);
        setTimeout(type, 22 + Math.random() * 20);
      }
    }
    // Start typing when hero enters view
    if ('IntersectionObserver' in window && !prefersReduced) {
      const io2 = new IntersectionObserver((entries, obs) => {
        if (entries[0].isIntersecting) {
          type();
          obs.disconnect();
        }
      }, { threshold: 0.2 });
      io2.observe(roleEl);
    } else {
      type();
    }
  }

  // Clean-up: respect page unload for single-page apps
  window.addEventListener('unload', () => {
    document.removeEventListener('mousemove', onPointerMove);
    document.removeEventListener('mouseleave', resetParallax);
  });

})();

document.addEventListener("DOMContentLoaded", () => {
      const heroImg = document.getElementById("hero-photo");

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              heroImg.classList.add("visible");
              observer.disconnect();
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(heroImg);
    });