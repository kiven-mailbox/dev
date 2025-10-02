// falling-snow.js
const canvas = document.getElementById("falling-snow");
const ctx = canvas.getContext("2d");

let snowflakes = [];
let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.pointerEvents = "none";
canvas.style.zIndex = "9999"; // ensure snow is always on top
canvas.style.background = "transparent"; // keep transparent

// Snowflake class
class Snowflake {
  constructor(depth = 1) {
    this.depth = depth;
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * -height;

    if (this.depth === 0.5) {
      this.size = 1 + Math.random() * 2;
    } else if (this.depth === 1) {
      this.size = 2 + Math.random() * 3;
    } else {
      this.size = 3 + Math.random() * 4;
    }

    this.speed = (0.3 + Math.random() * 1.2) * this.depth;
    this.angle = Math.random() * Math.PI * 2;
    this.sway = Math.random() * 1.5 + 0.2;
    this.offset = Math.random() * Math.PI * 2;
  }

  update() {
    this.y += this.speed;
    this.x += Math.sin(this.angle + this.offset) * this.sway;

    if (this.y > height + 10) {
      this.reset();
      this.y = -10;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);

    ctx.shadowColor = "rgba(255,255,255,0.8)";
    ctx.shadowBlur = this.size * 1.5;

    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.beginPath();
    ctx.arc(0, 0, this.size, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

function initSnow(count = 100) {
  snowflakes = [];
  for (let i = 0; i < count; i++) {
    let depth = i < count * 0.3 ? 0.5 : i < count * 0.7 ? 1 : 1.5;
    snowflakes.push(new Snowflake(depth));
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  snowflakes.forEach((flake) => {
    flake.update();
    flake.draw();
  });

  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  initSnow();
});

initSnow();
animate();
