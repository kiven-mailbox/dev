// Modernized Stats.js (Clean UI Edition)

function Stats() {
  this.init();
}

Stats.prototype = {
  init: function () {
    this.frames = 0;
    this.framesMin = 100;
    this.framesMax = 0;

    this.time = performance.now();
    this.timePrev = performance.now();

    // ===== Modern UI =====
    this.container = document.createElement("div");
    Object.assign(this.container.style, {
      position: "fixed",
      top: "10px",
      left: "10px",
      background: "rgba(25, 25, 35, 0.85)",
      backdropFilter: "blur(6px)",
      borderRadius: "12px",
      boxShadow: "0 0 10px rgba(0, 255, 255, 0.2)",
      fontFamily: "Inter, Arial, sans-serif",
      fontSize: "11px",
      color: "#00ffff",
      width: "90px",
      textAlign: "center",
      zIndex: "10000",
      padding: "6px",
      transition: "all 0.3s ease-in-out"
    });

    this.title = document.createElement("div");
    this.title.textContent = "FPS";
    this.title.style.fontWeight = "bold";
    this.title.style.letterSpacing = "1px";
    this.title.style.marginBottom = "4px";
    this.title.style.textShadow = "0 0 5px rgba(0,255,255,0.8)";
    this.container.appendChild(this.title);

    this.fpsValue = document.createElement("div");
    Object.assign(this.fpsValue.style, {
      fontSize: "16px",
      fontWeight: "600",
      color: "#00ffff",
      marginBottom: "6px",
      textShadow: "0 0 5px rgba(0,255,255,0.5)"
    });
    this.fpsValue.textContent = "0";
    this.container.appendChild(this.fpsValue);

    // ===== Modern Bar Graph =====
    this.bar = document.createElement("div");
    Object.assign(this.bar.style, {
      height: "6px",
      width: "100%",
      background: "rgba(255,255,255,0.1)",
      borderRadius: "4px",
      overflow: "hidden",
    });

    this.barFill = document.createElement("div");
    Object.assign(this.barFill.style, {
      height: "100%",
      width: "0%",
      background: "linear-gradient(90deg, #00ffff, #0077ff)",
      transition: "width 0.2s ease-out"
    });
    this.bar.appendChild(this.barFill);
    this.container.appendChild(this.bar);

    setInterval(
      ((self) => () => {
        self.update();
      })(this),
      1000
    );
  },

  getDisplayElement: function () {
    return this.container;
  },

  tick: function () {
    this.frames++;
  },

  update: function () {
    this.time = performance.now();
    this.fps = Math.round((this.frames * 1000) / (this.time - this.timePrev));

    this.framesMin = Math.min(this.framesMin, this.fps);
    this.framesMax = Math.max(this.framesMax, this.fps);

    this.fpsValue.textContent = this.fps;
    const percent = Math.min(100, (this.fps / 60) * 100);
    this.barFill.style.width = `${percent}%`;

    if (this.fps >= 50) {
      this.barFill.style.background = "linear-gradient(90deg, #00ffcc, #00ffff)";
    } else if (this.fps >= 30) {
      this.barFill.style.background = "linear-gradient(90deg, #ffcc00, #ffaa00)";
    } else {
      this.barFill.style.background = "linear-gradient(90deg, #ff4444, #cc0000)";
    }

    this.timePrev = this.time;
    this.frames = 0;
  },
};
