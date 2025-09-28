// Animate letters in "Contact Me"
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header h1");
  if (header) {
    const text = header.textContent;
    header.textContent = "";

    // Wrap each letter in a span
    [...text].forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.display = "inline-block";
      span.style.opacity = "0";
      span.style.transform = "translateY(30px)";
      span.style.transition = `all 0.5s ease ${i * 0.1}s`; // delay each letter
      header.appendChild(span);

      // Trigger animation
      setTimeout(() => {
        span.style.opacity = "1";
        span.style.transform = "translateY(0)";
      }, 100);
    });
  }

  // Card floating animation
  const card = document.querySelector(".card");
  if (card) {
    card.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)";
      card.style.boxShadow = "0 15px 25px rgba(0,0,0,0.2)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
      card.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
    });
  }
});
