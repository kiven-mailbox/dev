// leaves.js
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

// Autumn colors
const colors = ["#e07b39", "#f0a202", "#d95d39", "#f18805", "#d46a6a"];

class Leaf {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * -height;
    this.size = 6 + Math.random() * 12; // smaller, more natural
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.speed = 0.5 + Math.random() * 1.5; // slower for realism
    this.angle = Math.random() * Math.PI * 2;
    this.spin = 0.01 + Math.random() * 0.02;
    this.sway = Math.random() * 1.5 + 0.5; // side-to-side sway
    this.offset = Math.random() * Math.PI * 2; // each leaf different phase
  }

  update() {
    this.y += this.speed;
    this.x += Math.sin(this.angle + this.offset) * this.sway; // sway
    this.angle += this.spin;

    if (this.y > height) {
      this.reset();
      this.y = -10;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, this.size * 0.5, this.size, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// Initialize leaves
function initLeaves(count = 50) {
  leaves = [];
  for (let i = 0; i < count; i++) {
    leaves.push(new Leaf());
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
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

// Start
initLeaves();
animate();
