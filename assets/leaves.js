// pro-leaves.js
const canvas = document.getElementById("falling-leaves");
const ctx = canvas.getContext("2d");

let leaves = [];
let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.pointerEvents = "none";
canvas.style.zIndex = "1";

// Warm autumn colors with glow-like tones
const colors = [
  "rgba(224,123,57,0.9)",
  "rgba(240,162,2,0.9)",
  "rgba(217,93,57,0.9)",
  "rgba(241,136,5,0.9)",
  "rgba(212,106,106,0.9)"
];

// Leaf particle class
class Leaf {
  constructor(depth = 1) {
    this.depth = depth; // depth layer for parallax
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * -height;

    if (this.depth === 0.5) {
      this.size = 2 + Math.random() * 4; // far away (tiny)
    } else if (this.depth === 1) {
      this.size = 3 + Math.random() * 6; // mid-range
    } else {
      this.size = 4 + Math.random() * 7; // closer
    }

    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.speed = (0.5 + Math.random() * 1.5) * this.depth;
    this.angle = Math.random() * Math.PI * 2;
    this.spin = 0.005 + Math.random() * 0.015;
    this.sway = Math.random() * 2 + 0.5;
    this.offset = Math.random() * Math.PI * 2;
  }

  update() {
    this.y += this.speed;
    this.x += Math.sin(this.angle + this.offset) * this.sway;
    this.angle += this.spin;

    if (this.y > height + 20) {
      this.reset();
      this.y = -10;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    // Glow proportional to leaf size
    ctx.shadowColor = this.color;
    ctx.shadowBlur = Math.max(3, this.size * 1.2);

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, this.size * 0.6, this.size, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

function initLeaves(count = 60) {
  leaves = [];
  for (let i = 0; i < count; i++) {
    let depth = i < count * 0.3 ? 0.5 : i < count * 0.7 ? 1 : 1.5;
    leaves.push(new Leaf(depth));
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  let gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "rgba(20,20,40,0.2)");
  gradient.addColorStop(1, "rgba(10,10,20,0.4)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  leaves.forEach((leaf) => {
    leaf.update();
    leaf.draw();
  });

  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  initLeaves();
});

initLeaves();
animate();
