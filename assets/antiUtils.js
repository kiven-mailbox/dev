// assets/antiUtils.js
// Small utility helpers for anti-inspect / anti-screenshot modules.

(function (global) {
  // Configure this to a server endpoint (or keep null to disable reporting)
  const REPORT_ENDPOINT = null; // e.g. "https://your.server/monitor"

  function logEvent(eventName, data = {}) {
    const payload = {
      event: eventName,
      ts: new Date().toISOString(),
      url: location.href,
      meta: data
    };
    // Developer console visibility
    console.warn("AntiCaptureEvent:", payload);
    // Optional server beacon
    if (REPORT_ENDPOINT && navigator.sendBeacon) {
      try {
        navigator.sendBeacon(REPORT_ENDPOINT, JSON.stringify(payload));
      } catch (e) {
        // ignore errors
      }
    }
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Export to global
  global.AntiUtils = {
    logEvent,
    escapeHtml,
    REPORT_ENDPOINT
  };
})(window);
