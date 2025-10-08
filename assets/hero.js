// hero.js
(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const heroContent = document.querySelector('.hero-content');
  const heroImageWrap = document.querySelector('.hero-image-wrap');
  const heroImg = document.getElementById('hero-photo');
  const ctaResume = document.getElementById('cta-resume');

  // Initial fade-in animation
  if (heroContent) heroContent.classList.add('fade-in-up');

  // Reveal hero content with IntersectionObserver
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
    requestAnimationFrame(() => heroContent.classList.add('in-view'));
  }

  // CTA keyboard accessibility (Enter / Space)
  if (ctaResume) {
    ctaResume.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        ctaResume.click();
      }
    });
  }

  // Typewriter effect for role text
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
    if ('IntersectionObserver' in window) {
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

  // Clean-up
  window.addEventListener('unload', () => {
    document.removeEventListener('mousemove', null);
    document.removeEventListener('mouseleave', null);
  });
})();

// Fade-in for hero image
document.addEventListener('DOMContentLoaded', () => {
  const heroImg = document.getElementById('hero-photo');
  if (!heroImg) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          heroImg.classList.add('visible');
          observer.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(heroImg);
});
