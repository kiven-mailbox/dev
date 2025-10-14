// assets/disableInspect.js
// Prevent inspecting, copying, or viewing source (client-side only)

document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("mainBody") || document.body;

  // Disable right-click
  body.addEventListener("contextmenu", (e) => e.preventDefault());

  // Disable F12, Ctrl+Shift+I/J, Ctrl+U, Ctrl+S
  document.onkeydown = function (e) {
    if (
      e.keyCode === 123 || // F12
      (e.ctrlKey && e.shiftKey && [73, 74].includes(e.keyCode)) || // Ctrl+Shift+I / J
      (e.ctrlKey && [83, 85, 67].includes(e.keyCode)) // Ctrl+S / U / C
    ) {
      e.preventDefault();
      fake404();
      return false;
    }
  };

  // Detect DevTools via resize
  setInterval(() => {
    if (
      window.outerWidth - window.innerWidth > 200 ||
      window.outerHeight - window.innerHeight > 200
    ) {
      fake404();
    }
  }, 1000);

  // Detect DevTools via console.log trap
  (function detectConsole() {
    const element = new Image();
    Object.defineProperty(element, "id", {
      get: function () {
        fake404();
      },
    });
    console.log(element);
  })();

  function fake404() {
    document.body.innerHTML = `
      <style>
        body {
          background: #0b0c28;
          color: #ffd700;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          font-family: 'Poppins', sans-serif;
          text-align: center;
        }
        h1 { font-size: 3rem; margin-bottom: 1rem; }
        p { color: #aaa; }
      </style>
      <div>
        <h1>404 - Page Not Found</h1>
        <p>The CODE you’re looking for doesn’t exist.</p>
        <p>⚠️ Do not Inspect The Page to Restart ⚠️</p>
      </div>`;
    console.clear();
    setTimeout(() => (window.location.href = "/"), 1000);
  }
});
