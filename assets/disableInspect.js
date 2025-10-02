document.addEventListener("DOMContentLoaded", function () {
  const body = document.getElementById("mainBody");

  if (body) {
    // 1. Disable right-click
    body.addEventListener("contextmenu", (e) => e.preventDefault());

    // 2. Disable key shortcuts
    document.onkeydown = function (e) {
      if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) || // Ctrl+Shift+I / J
        (e.ctrlKey && e.keyCode === 85) // Ctrl+U
      ) {
        e.preventDefault();
        return false;
      }
    };

    // 3. Detect DevTools via window resize
    setInterval(function () {
      if (
        window.outerWidth - window.innerWidth > 200 ||
        window.outerHeight - window.innerHeight > 200
      ) {
        blockAccess();
      }
    }, 1000);

    // 4. Detect DevTools via console
    (function detectConsole() {
      let check = false;
      const element = new Image();
      Object.defineProperty(element, "id", {
        get: function () {
          check = true;
          blockAccess();
        },
      });
      console.log(element);
    })();
  }

  // What happens if DevTools is detected
  function blockAccess() {
    // Clear page
    document.body.innerHTML = "";
    // Redirect to homepage after 1 second
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  }
});
