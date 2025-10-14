document.addEventListener("DOMContentLoaded", () => {
  const heroPhoto = document.getElementById("hero-photo");
  
  // Start hidden
  heroPhoto.style.opacity = 0;
  heroPhoto.style.transform = "translateY(25px)";
  heroPhoto.style.transition = "opacity 1.8s ease-out, transform 1.8s ease-out";
  
  // Fade and slide in after a short delay
  setTimeout(() => {
    heroPhoto.style.opacity = 1;
    heroPhoto.style.transform = "translateY(0)";
  }, 300);
});
