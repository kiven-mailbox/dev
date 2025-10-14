const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const difficultySelect = document.getElementById('difficulty');
const playerScoreEl = document.getElementById('playerScore');
const aiScoreEl = document.getElementById('aiScore');
const pauseBtn = document.getElementById('pauseBtn');
const pauseOverlay = document.getElementById('pauseOverlay');

function resizeCanvas() {
  canvas.width = window.innerWidth > 900 ? 900 : window.innerWidth - 20;
  canvas.height = window.innerHeight > 600 ? 500 : window.innerHeight - 140;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let WIDTH = canvas.width;
let HEIGHT = canvas.height;

// === GAME CONSTANTS ===
const PADDLE_WIDTH = 15;
const PADDLE_HEIGHT = 100;
const BALL_SIZE = 16;

// === SCORE ===
let playerScore = 0;
let aiScore = 0;
let bestScore = parseInt(localStorage.getItem('pongBestScore')) || 0;

// === OBJECTS ===
let leftPaddle = { x: 10, y: HEIGHT / 2 - PADDLE_HEIGHT / 2, width: PADDLE_WIDTH, height: PADDLE_HEIGHT };
let rightPaddle = { x: WIDTH - PADDLE_WIDTH - 10, y: HEIGHT / 2 - PADDLE_HEIGHT / 2, width: PADDLE_WIDTH, height: PADDLE_HEIGHT, speed: 4 };
let ball = { x: WIDTH / 2 - BALL_SIZE / 2, y: HEIGHT / 2 - BALL_SIZE / 2, vx: 5, vy: 3, size: BALL_SIZE };

// === DIFFICULTY SETTINGS ===
let difficulty = 'normal';
const settings = {
  normal: { ballSpeed: 5, aiSpeed: 4 },
  medium: { ballSpeed: 6, aiSpeed: 5 },
  hard: { ballSpeed: 7, aiSpeed: 6 }
};

let isPaused = false;

// === PAUSE FUNCTIONALITY ===
function togglePause() {
  isPaused = !isPaused;
  pauseOverlay.style.display = isPaused ? 'flex' : 'none';
  pauseBtn.textContent = isPaused ? '▶ Resume' : '⏸ Pause';
}
pauseBtn.addEventListener('click', togglePause);
document.addEventListener('keydown', e => {
  if (e.key.toLowerCase() === 'p') togglePause();
});

// === DIFFICULTY CHANGE ===
difficultySelect.addEventListener('change', e => {
  difficulty = e.target.value;
  const { ballSpeed, aiSpeed } = settings[difficulty];
  ball.vx = ball.vx > 0 ? ballSpeed : -ballSpeed;
  rightPaddle.speed = aiSpeed;
  resetBall();
});

// === DRAW FUNCTIONS ===
function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawBall(x, y, size, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
  ctx.fill();
}

function drawScores() {
  playerScoreEl.textContent = playerScore;
  aiScoreEl.textContent = aiScore;
}

// === RESET BALL ===
function resetBall() {
  WIDTH = canvas.width;
  HEIGHT = canvas.height;
  const { ballSpeed } = settings[difficulty];
  ball.x = WIDTH / 2 - BALL_SIZE / 2;
  ball.y = HEIGHT / 2 - BALL_SIZE / 2;
  ball.vx = ballSpeed * (Math.random() > 0.5 ? 1 : -1);
  ball.vy = 3 * (Math.random() > 0.5 ? 1 : -1);
}

// === UPDATE GAME ===
function update() {
  if (isPaused) return;

  WIDTH = canvas.width;
  HEIGHT = canvas.height;

  ball.x += ball.vx;
  ball.y += ball.vy;

  if (ball.y <= 0 || ball.y + ball.size >= HEIGHT) ball.vy *= -1;

  // Paddle collisions
  if (ball.x <= leftPaddle.x + leftPaddle.width &&
      ball.y + ball.size >= leftPaddle.y &&
      ball.y <= leftPaddle.y + leftPaddle.height) {
    ball.x = leftPaddle.x + leftPaddle.width;
    ball.vx *= -1;
  }

  if (ball.x + ball.size >= rightPaddle.x &&
      ball.y + ball.size >= rightPaddle.y &&
      ball.y <= rightPaddle.y + rightPaddle.height) {
    ball.x = rightPaddle.x - ball.size;
    ball.vx *= -1;
  }

  if (ball.x < 0) {
    aiScore++;
    resetBall();
  } else if (ball.x > WIDTH) {
    playerScore++;
    if (playerScore > bestScore) localStorage.setItem('pongBestScore', playerScore);
    resetBall();
  }

  const targetY = ball.y + ball.size / 2 - rightPaddle.height / 2;
  if (rightPaddle.y < targetY) rightPaddle.y += rightPaddle.speed;
  if (rightPaddle.y > targetY) rightPaddle.y -= rightPaddle.speed;
  rightPaddle.y = Math.max(0, Math.min(HEIGHT - rightPaddle.height, rightPaddle.y));
}

// === RENDER GAME ===
function render() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.strokeStyle = "#fff";
  ctx.setLineDash([10, 15]);
  ctx.beginPath();
  ctx.moveTo(WIDTH / 2, 0);
  ctx.lineTo(WIDTH / 2, HEIGHT);
  ctx.stroke();
  ctx.setLineDash([]);

  drawRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height, "#0ef");
  drawRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height, "#f50");
  drawBall(ball.x, ball.y, ball.size, "#fff");
  drawScores();
}

// === GAME LOOP ===
function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

// === CONTROLS ===
function movePaddle(yPos) {
  leftPaddle.y = yPos - leftPaddle.height / 2;
  leftPaddle.y = Math.max(0, Math.min(HEIGHT - leftPaddle.height, leftPaddle.y));
}

canvas.addEventListener('mousemove', e => {
  const rect = canvas.getBoundingClientRect();
  movePaddle(e.clientY - rect.top);
});

canvas.addEventListener('touchmove', e => {
  e.preventDefault();
  const rect = canvas.getBoundingClientRect();
  movePaddle(e.touches[0].clientY - rect.top);
}, { passive: false });

// === START ===
gameLoop();
