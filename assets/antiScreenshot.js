// assets/antiScreenshot.js
// Low-latency, best-effort screenshot/capture heuristics (improved responsiveness)
// Non-destructive: shows a quick overlay. Use with antiUtils.js for optional reporting.

(function () {
  // Quick config
  const SHOW_OVERLAY_MS = 3500; // how long overlay remains visible
  const BRIEF_HIDE_THRESHOLD_MS = 2500; // if hidden < this, treat as quick capture workflow
  const RAPID_TOUCH_THRESHOLD_MS = 300; // rapid touch detection window

  // Optional global utils (if loaded)
  const hasUtils = window.AntiUtils && typeof window.AntiUtils.logEvent === "function";
  const log = (evt, meta) => {
    try {
      if (hasUtils) window.AntiUtils.logEvent(evt, meta || {});
      else console.warn("AntiCaptureEvent:", evt, meta || {});
    } catch (e) { /* ignore */ }
  };

  // fast overlay implementation (reused)
  let overlay = null;
  let overlayTimer = null;
  function ensureOverlay() {
    if (overlay) return overlay;
    overlay = document.createElement("div");
    overlay.id = "fastAntiCaptureOverlay";
    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.zIndex = "2147483647";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.background = "rgba(0,0,0,0.65)";
    overlay.style.backdropFilter = "blur(3px)";
    overlay.style.webkitBackdropFilter = "blur(3px)";
    overlay.innerHTML = `<div style="max-width:760px;padding:18px;border-radius:12px;background:linear-gradient(180deg,#111, #0b0b0b);color:#fff;font-family:system-ui, -apple-system, 'Segoe UI', Roboto, Arial;text-align:center;box-shadow:0 12px 40px rgba(0,0,0,0.6)">
        <div style="font-size:20px;font-weight:700;margin-bottom:6px">⚠️ Capture Attempt Detected</div>
        <div style="font-size:13px;color:#cfd8e3;opacity:0.95">This content is protected. If you legitimately need a copy, please use the download option or contact the owner.</div>
      </div>`;
    document.documentElement.appendChild(overlay);
    return overlay;
  }
  function showOverlay(tempMessage) {
    const el = ensureOverlay();
    if (tempMessage) {
      const txt = el.querySelector("div > div:nth-child(2)");
      if (txt) txt.textContent = tempMessage;
    }
    el.style.pointerEvents = "auto";
    el.style.opacity = "1";
    el.style.transition = "opacity 160ms ease";
    // clear any existing timer
    if (overlayTimer) {
      clearTimeout(overlayTimer);
    }
    overlayTimer = setTimeout(() => {
      try {
        el.style.opacity = "0";
        setTimeout(() => {
          if (el && el.parentNode) el.parentNode.removeChild(el);
          overlay = null;
        }, 200);
      } catch (e) {}
    }, SHOW_OVERLAY_MS);
  }

  // Immediate, minimal handler used by events
  function handleQuick(reason, meta) {
    // quick guard against frequent firing
    const now = performance.now();
    if (!handleQuick._last || now - handleQuick._last > 300) {
      handleQuick._last = now;
      showOverlay("Suspicious capture activity: " + reason);
      log("screenshot_quick_detect", { reason, ts: new Date().toISOString(), ...meta });
    } else {
      // if fired too rapidly, still log but don't re-show UI
      log("screenshot_quick_ignored", { reason, ts: new Date().toISOString(), ...meta });
    }
  }

  // ---------- key-based immediate detection ----------
  // Keydown is earlier than keyup; use capture to be early in propagation
  window.addEventListener("keydown", (e) => {
    // PrintScreen key (44) on many desktops / Windows
    if (e.key === "PrintScreen" || e.keyCode === 44) {
      handleQuick("printscreen_key");
      return;
    }

    // macOS screenshots: Cmd + Shift + 3/4 (MetaKey == cmd)
    if (e.metaKey && e.shiftKey && (e.key === "3" || e.key === "4")) {
      handleQuick("mac_cmd_shift_3_or_4");
      return;
    }

    // Windows snipping combos: Ctrl+Shift+S (common in some apps)
    if (e.ctrlKey && e.shiftKey && (e.key && e.key.toLowerCase() === "s")) {
      handleQuick("ctrl_shift_s");
      return;
    }

    // Browser "save" shortcuts: Ctrl+S (user might be saving for capture)
    if (e.ctrlKey && (e.key && e.key.toLowerCase() === "s")) {
      handleQuick("ctrl_s");
      return;
    }

    // Mobile soft-keys / keyboards cannot be reliably detected
  }, true); // capture phase

  // Also keydown on document (for iframes or different contexts)
  document.addEventListener("keydown", (e) => {
    // duplicate minimal checks (cheap)
    if (e.key === "PrintScreen" || e.keyCode === 44) handleQuick("printscreen_key");
  }, true);

  // ---------- visibility / blur heuristics (short thresholds) ----------
  let hiddenAt = 0;
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      hiddenAt = performance.now();
    } else {
      if (hiddenAt) {
        const diff = performance.now() - hiddenAt;
        if (diff < BRIEF_HIDE_THRESHOLD_MS) {
          // user returned quickly — likely quick tool or screenshot app
          handleQuick("visibility_quick_switch", { hiddenForMs: Math.round(diff) });
        }
        hiddenAt = 0;
      }
    }
  }, true);

  // blur often fires earlier than visibilitychange in some browsers — react quickly
  let blurAt = 0;
  window.addEventListener("blur", () => {
    blurAt = performance.now();
    // schedule a micro-check shortly to see if focus returns quickly
    setTimeout(() => {
      // if focus returned shortly, treat as quick capture workflow
      if (document.hasFocus && document.hasFocus()) {
        const diff = performance.now() - blurAt;
        if (diff < BRIEF_HIDE_THRESHOLD_MS) {
          handleQuick("blur_quick_switch", { blurredForMs: Math.round(diff) });
        }
      }
    }, Math.min(350, BRIEF_HIDE_THRESHOLD_MS));
  }, true);

  // ---------- copy / selection events ----------
  // copy is immediate when user presses copy — treat as capture attempt
  document.addEventListener("copy", (e) => {
    handleQuick("copy_event");
  }, true);

  // selection via mouse drag + right-click copy attempts
  document.addEventListener("contextmenu", (e) => {
    // user opened context menu; quick treat
    handleQuick("contextmenu_open");
  }, true);

  // ---------- touch heuristics for mobile (rapid gestures) ----------
  let lastTouch = 0;
  document.addEventListener("touchend", (e) => {
    const t = performance.now();
    if (t - lastTouch < RAPID_TOUCH_THRESHOLD_MS) {
      handleQuick("rapid_touch", { touches: e.touches ? e.touches.length : 0 });
    }
    lastTouch = t;
  }, { passive: true, capture: true });

  // ---------- fullscreen detection (some screenshot flows enter fullscreen) ----------
  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
      // exited fullscreen — quick heuristic
      handleQuick("fullscreen_exit");
    } else {
      handleQuick("fullscreen_enter");
    }
  }, true);

  // ---------- mutation observer (optional) to catch programmatic UI tools quickly ----------
  try {
    const mo = new MutationObserver((mutations) => {
      // very cheap: if many nodes change quickly, flag suspicious
      if (mutations.length > 6) {
        handleQuick("rapid_dom_changes", { count: mutations.length });
      }
    });
    mo.observe(document.documentElement || document.body, { childList: true, subtree: true });
  } catch (e) {
    // ignore if not allowed
  }

  // ---------- init log ----------
  log("screenshot_detector_installed", { ts: new Date().toISOString() });

  // ---------- helpful note ----------
  // Browser limitations: OS-level screenshot combos (volume+power on mobile, native PrintScreen behaviors)
  // are not reliably exposed to JS. This script minimizes latency for detectable signals but cannot
  // guarantee detection for every OS-level screenshot.
})();
