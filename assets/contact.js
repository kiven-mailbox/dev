// Typewriter effect for placeholders
document.addEventListener("DOMContentLoaded", () => {
  const fields = [
    { id: "name", texts: ["John Doe", "Jane Smith", "Michael Cruz"] },
    { id: "email", texts: ["johndoe@mail.com", " janesmith@gmail.com", "user@example.com"] },
    { id: "message", texts: ["Type your message...", "Let's work together!", "Your feedback matters!"] },
  ];

  fields.forEach(({ id, texts }) => {
    const input = document.getElementById(id);
    let textIndex = 0;
    let charIndex = 0;

    function typePlaceholder() {
      const text = texts[textIndex];
      input.placeholder = text.slice(0, charIndex);
      charIndex++;

      if (charIndex <= text.length) {
        setTimeout(typePlaceholder, 80); // typing speed
      } else {
        setTimeout(erasePlaceholder, 2000); // pause before erasing
      }
    }

    function erasePlaceholder() {
      const text = texts[textIndex];
      input.placeholder = text.slice(0, charIndex);
      charIndex--;

      if (charIndex >= 0) {
        setTimeout(erasePlaceholder, 50); // erasing speed
      } else {
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typePlaceholder, 800); // delay before typing next
      }
    }

    typePlaceholder();
  });
});
