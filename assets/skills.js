document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".progress-bar").forEach(bar => {
      const value = bar.getAttribute("data-value");

      // Optional animation effect
      let width = 0;
      const interval = setInterval(() => {
        if (width >= value) {
          clearInterval(interval);
        } else {
          width++;
          bar.style.width = width + "%";
          bar.setAttribute("aria-valuenow", width);
        }
      }, 15); // adjust speed
    });
  });