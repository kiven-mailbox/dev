document.addEventListener("DOMContentLoaded", () => {
  // Create overlay warning modal
  const modal = document.createElement("div");
  modal.id = "devWarning";
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.background = "rgba(0,0,0,0.9)";
  modal.style.color = "#fff";
  modal.style.display = "flex";
  modal.style.flexDirection = "column";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";
  modal.style.zIndex = "9999";
  modal.style.textAlign = "center";
  modal.innerHTML = `
    <div style="max-width: 480px; background: #111; padding: 2rem; border-radius: 1rem; border: 1px solid #333;">
      <h2 style="margin-bottom: 1rem;">⚠️ Under Development</h2>
      <p style="margin-bottom: 1.5rem; line-height: 1.6;">
        This Bootstrap Website Generator is currently under development.
        Some features might not work as expected.<br><br>
        Do you want to proceed anyway?
      </p>
      <div style="display:flex; gap:1rem; justify-content:center;">
        <button id="proceedBtn" style="padding:0.6rem 1.4rem; background:#0d6efd; border:none; border-radius:6px; color:#fff; font-weight:600; cursor:pointer;">Proceed</button>
        <button id="exitBtn" style="padding:0.6rem 1.4rem; background:#6c757d; border:none; border-radius:6px; color:#fff; font-weight:600; cursor:pointer;">Exit</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  // Button actions
  document.getElementById("proceedBtn").addEventListener("click", () => {
    modal.remove(); // allow site access
  });

  document.getElementById("exitBtn").addEventListener("click", () => {
    modal.innerHTML = `
      <div style="color:#fff; text-align:center;">
        <h2>👋 Thank you for visiting!</h2>
        <p>You can come back later when the generator is fully released.</p>
      </div>
    `;
    setTimeout(() => {
      window.close();
      location.href = "https://www.google.com";
    }, 1500);
  });
});
