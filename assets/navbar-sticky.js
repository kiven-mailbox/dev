window.addEventListener('scroll', function() {
    const navbar = document.getElementById('header-nav');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });