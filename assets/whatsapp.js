// whatsapp-draggable.js
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') return fn();
    document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    const btn = document.getElementById('whatsapp-btn');
    if (!btn) return console.warn('whatsapp-draggable.js: #whatsapp-btn not found');

    btn.style.position = btn.style.position || 'fixed';

    const saved = localStorage.getItem('whatsapp-btn-pos');

    if (saved) {
      try {
        const pos = JSON.parse(saved);
        btn.style.left = pos.left + 'px';
        btn.style.top = pos.top + 'px';
        btn.style.right = 'auto';
        btn.style.bottom = 'auto';
      } catch (e) {
        console.warn('Invalid saved position', e);
        resetToDefault();
      }
    } else {
      resetToDefault();
    }

    function resetToDefault() {
      btn.style.left = 'auto';
      btn.style.top = 'auto';
      btn.style.right = '25px';
      btn.style.bottom = '25px';
    }

    let isDragging = false;
    let startX = 0, startY = 0, offsetX = 0, offsetY = 0;
    let moved = false;
    const dragThreshold = 5;

    function getXY(e) {
      if (e.touches && e.touches[0]) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
      if (e.changedTouches && e.changedTouches[0]) return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
      return { x: e.clientX, y: e.clientY };
    }

    function startDrag(e) {
      const xy = getXY(e);
      isDragging = true;
      moved = false;
      const rect = btn.getBoundingClientRect();
      offsetX = xy.x - rect.left;
      offsetY = xy.y - rect.top;
      startX = xy.x;
      startY = xy.y;
      btn.style.transition = 'none';
      btn.style.cursor = 'grabbing';
      e.preventDefault && e.preventDefault();
    }

    function onMove(e) {
      if (!isDragging) return;
      const xy = getXY(e);
      const dx = Math.abs(xy.x - startX);
      const dy = Math.abs(xy.y - startY);
      if (dx > dragThreshold || dy > dragThreshold) moved = true;

      let left = xy.x - offsetX;
      let top = xy.y - offsetY;

      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
      const rect = btn.getBoundingClientRect();
      const btnW = rect.width;
      const btnH = rect.height;

      left = Math.min(Math.max(left, 8), vw - btnW - 8);
      top = Math.min(Math.max(top, 8), vh - btnH - 8);

      btn.style.left = left + 'px';
      btn.style.top = top + 'px';
      btn.style.right = 'auto';
      btn.style.bottom = 'auto';
    }

    function endDrag() {
      if (!isDragging) return;
      isDragging = false;
      btn.style.cursor = 'grab';
      btn.style.transition = 'all 0.15s ease';
      const rect = btn.getBoundingClientRect();
      const pos = { left: Math.round(rect.left), top: Math.round(rect.top) };
      localStorage.setItem('whatsapp-btn-pos', JSON.stringify(pos));
      setTimeout(() => moved = false, 0);
    }

    btn.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', endDrag);

    btn.addEventListener('touchstart', startDrag, { passive: false });
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', endDrag);

    btn.addEventListener('click', function (e) {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    });

    btn.addEventListener('dblclick', function () {
      localStorage.removeItem('whatsapp-btn-pos');
      resetToDefault();
    });
  });
})();
