document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const toggleBtn = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-icon");

  // Available themes
  const themes = ["light", "dark", "cold"];
  let currentIndex = 0;

  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme && themes.includes(savedTheme)) {
    currentIndex = themes.indexOf(savedTheme);
    applyTheme(themes[currentIndex]);
  } else {
    applyTheme("light"); // default
  }

  // On click, cycle to next theme
  toggleBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % themes.length;
    applyTheme(themes[currentIndex]);
    localStorage.setItem("theme", themes[currentIndex]);
  });

  function applyTheme(theme) {
    body.classList.remove(...themes.map(t => `${t}-theme`));
    body.classList.add(`${theme}-theme`);

    // Update icon
    switch (theme) {
      case "light":
        icon.src = "/assets/icons/theme-light.svg";
        icon.alt = "Switch to dark theme";
        break;
      case "dark":
        icon.src = "/assets/icons/theme-dark.svg";
        icon.alt = "Switch to cold theme";
        break;
      case "cold":
        icon.src = "/assets/icons/theme-cold.svg";
        icon.alt = "Switch to light theme";
        break;
    }
  }
});
