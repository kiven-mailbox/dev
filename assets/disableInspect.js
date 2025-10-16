// assets/disableInspect.js
// Aggressive anti-inspect + fake security lockdown

document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("mainBody") || document.body;

  // Disable right-click
  body.addEventListener("contextmenu", (e) => e.preventDefault());

  // Disable all hotkeys for DevTools
  document.onkeydown = function (e) {
    if (
      e.keyCode === 123 || // F12
      (e.ctrlKey && e.shiftKey && [73, 74].includes(e.keyCode)) || // Ctrl+Shift+I / J
      (e.ctrlKey && [83, 85, 67].includes(e.keyCode)) // Ctrl+S / U / C
    ) {
      e.preventDefault();
      triggerLockdown();
      return false;
    }
  };

  // Detect DevTools via window resize
  setInterval(() => {
    if (
      window.outerWidth - window.innerWidth > 200 ||
      window.outerHeight - window.innerHeight > 200
    ) {
      triggerLockdown();
    }
  }, 1000);

  // Detect console open
  (function detectConsole() {
    const element = new Image();
    Object.defineProperty(element, "id", {
      get: function () {
        triggerLockdown();
      },
    });
    console.log(element);
  })();

  // Aggressive Lockdown Page
  function triggerLockdown() {
    document.body.innerHTML = `
      <style>
        @keyframes flash {
          0%, 50%, 100% { background: #000; color: #ff0000; }
          25%, 75% { background: #ff0000; color: #fff; }
        }
        @keyframes glitch {
          0% { transform: translate(2px, 0); }
          20% { transform: translate(-2px, -2px); }
          40% { transform: translate(-1px, 1px); }
          60% { transform: translate(1px, -1px); }
          80% { transform: translate(-1px, 1px); }
          100% { transform: translate(0, 0); }
        }
        body {
          background: #000;
          color: #ff0000;
          font-family: 'Courier New', monospace;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          height: 100vh;
          animation: flash 0.5s infinite;
          user-select: none;
          cursor: not-allowed;
          overflow: hidden;
        }
        h1 {
          font-size: 4rem;
          letter-spacing: 4px;
          text-transform: uppercase;
          text-shadow: 0 0 20px red, 0 0 50px crimson;
          animation: glitch 0.3s infinite;
        }
        p {
          font-size: 1.2rem;
          color: #fff;
          margin-top: 20px;
        }
      </style>
      <div>
        <h1>🚨 SECURITY BREACH DETECTED 🚨</h1>
        <p>Unauthorized inspection attempt recorded.</p>
        <p>System lockdown engaged... Restarting...</p>
      </div>
    `;

    console.clear();

    // Disable all further input
    document.onkeydown = () => false;
    document.oncontextmenu = () => false;
    document.onclick = () => false;
    document.onmousemove = () => false;

    // Infinite restart every second
    setInterval(() => {
      window.location.reload(true);
    }, 1000);
  }
});
