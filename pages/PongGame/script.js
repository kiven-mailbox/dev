const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// ========== RESPONSIVE CANVAS ==========
function resizeCanvas() {
    canvas.width = window.innerWidth > 900 ? 900 : window.innerWidth - 20;
    canvas.height = window.innerHeight > 600 ? 600 : window.innerHeight - 20;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let WIDTH = canvas.width;
let HEIGHT = canvas.height;

// ========== GAME CONSTANTS ==========
const PADDLE_WIDTH = 15;
const PADDLE_HEIGHT = 100;
const BALL_SIZE = 16;

// ========== SCORE VARIABLES ==========
let playerScore = 0;
let aiScore = 0;
let bestScore = parseInt(localStorage.getItem('pongBestScore')) || 0;

// ========== OBJECTS ==========
let leftPaddle = {
    x: 10,
    y: HEIGHT / 2 - PADDLE_HEIGHT / 2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT
};

let rightPaddle = {
    x: WIDTH - PADDLE_WIDTH - 10,
    y: HEIGHT / 2 - PADDLE_HEIGHT / 2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    speed: 4
};

let ball = {
    x: WIDTH / 2 - BALL_SIZE / 2,
    y: HEIGHT / 2 - BALL_SIZE / 2,
    vx: 5 * (Math.random() > 0.5 ? 1 : -1),
    vy: 3 * (Math.random() > 0.5 ? 1 : -1),
    size: BALL_SIZE
};

// ========== DRAW FUNCTIONS ==========
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
    ctx.font = '32px Arial';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.fillText(playerScore, WIDTH / 4, 40);
    ctx.fillText(aiScore, WIDTH * 3 / 4, 40);

    ctx.font = '16px Arial';
    ctx.fillStyle = '#ff0';
    ctx.textAlign = 'left';
    ctx.fillText('Best Score: ' + bestScore, 10, 20);
}

// ========== RESET BALL ==========
function resetBall() {
    WIDTH = canvas.width;
    HEIGHT = canvas.height;
    ball.x = WIDTH / 2 - BALL_SIZE / 2;
    ball.y = HEIGHT / 2 - BALL_SIZE / 2;
    ball.vx = 5 * (Math.random() > 0.5 ? 1 : -1);
    ball.vy = 3 * (Math.random() > 0.5 ? 1 : -1);
}

// ========== UPDATE GAME ==========
function update() {
    WIDTH = canvas.width;
    HEIGHT = canvas.height;

    // Ball movement
    ball.x += ball.vx;
    ball.y += ball.vy;

    // Wall collision
    if (ball.y <= 0 || ball.y + ball.size >= HEIGHT) {
        ball.vy *= -1;
    }

    // Left paddle collision
    if (
        ball.x <= leftPaddle.x + leftPaddle.width &&
        ball.y + ball.size >= leftPaddle.y &&
        ball.y <= leftPaddle.y + leftPaddle.height
    ) {
        ball.x = leftPaddle.x + leftPaddle.width;
        ball.vx *= -1;
        const relY = (leftPaddle.y + leftPaddle.height / 2) - (ball.y + ball.size / 2);
        ball.vy = -relY / 10;
    }

    // Right paddle collision
    if (
        ball.x + ball.size >= rightPaddle.x &&
        ball.y + ball.size >= rightPaddle.y &&
        ball.y <= rightPaddle.y + rightPaddle.height
    ) {
        ball.x = rightPaddle.x - ball.size;
        ball.vx *= -1;
        const relY = (rightPaddle.y + rightPaddle.height / 2) - (ball.y + ball.size / 2);
        ball.vy = -relY / 10;
    }

    // Out of bounds
    if (ball.x < 0) {
        aiScore++;
        resetBall();
    } else if (ball.x > WIDTH) {
        playerScore++;
        if (playerScore > bestScore) {
            bestScore = playerScore;
            localStorage.setItem('pongBestScore', bestScore);
        }
        resetBall();
    }

    // AI movement
    const targetY = ball.y + ball.size / 2 - rightPaddle.height / 2;
    if (rightPaddle.y < targetY) rightPaddle.y += rightPaddle.speed;
    if (rightPaddle.y > targetY) rightPaddle.y -= rightPaddle.speed;
    rightPaddle.y = Math.max(0, Math.min(HEIGHT - rightPaddle.height, rightPaddle.y));
}

// ========== RENDER GAME ==========
function render() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Center line
    ctx.strokeStyle = "#fff";
    ctx.setLineDash([10, 15]);
    ctx.beginPath();
    ctx.moveTo(WIDTH / 2, 0);
    ctx.lineTo(WIDTH / 2, HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw elements
    drawRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height, "#0ef");
    drawRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height, "#f50");
    drawBall(ball.x, ball.y, ball.size, "#fff");
    drawScores();
}

// ========== GAME LOOP ==========
function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

// ========== CONTROLS ==========
function movePaddle(yPos) {
    leftPaddle.y = yPos - leftPaddle.height / 2;
    leftPaddle.y = Math.max(0, Math.min(HEIGHT - leftPaddle.height, leftPaddle.y));
}

// Mouse (desktop)
canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    movePaddle(e.clientY - rect.top);
});

// Touch (mobile)
canvas.addEventListener('touchmove', e => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const touchY = e.touches[0].clientY - rect.top;
    movePaddle(touchY);
}, { passive: false });

// Start
gameLoop();
