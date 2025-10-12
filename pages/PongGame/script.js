const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game constants
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const PADDLE_WIDTH = 15;
const PADDLE_HEIGHT = 100;
const BALL_SIZE = 16;

// ADDED: Score variables
let playerScore = 0;
let aiScore = 0;

// ADDED: Best score (high score) using localStorage
let bestScore = parseInt(localStorage.getItem('pongBestScore')) || 0;

let leftPaddle = {
    x: 10,
    y: HEIGHT / 2 - PADDLE_HEIGHT / 2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
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

function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawBall(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x + size/2, y + size/2, size/2, 0, Math.PI * 2);
    ctx.fill();
}

// ADDED: Draw scores
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

function resetBall() {
    ball.x = WIDTH / 2 - BALL_SIZE / 2;
    ball.y = HEIGHT / 2 - BALL_SIZE / 2;
    ball.vx = 5 * (Math.random() > 0.5 ? 1 : -1);
    ball.vy = 3 * (Math.random() > 0.5 ? 1 : -1);
}

function update() {
    // Ball movement
    ball.x += ball.vx;
    ball.y += ball.vy;

    // Wall collision (top/bottom)
    if (ball.y <= 0) {
        ball.y = 0;
        ball.vy *= -1;
    }
    if (ball.y + ball.size >= HEIGHT) {
        ball.y = HEIGHT - ball.size;
        ball.vy *= -1;
    }

    // Paddle collision (left)
    if (
        ball.x <= leftPaddle.x + leftPaddle.width &&
        ball.y + ball.size >= leftPaddle.y &&
        ball.y <= leftPaddle.y + leftPaddle.height
    ) {
        ball.x = leftPaddle.x + leftPaddle.width;
        ball.vx *= -1;
        // Add some "spin" based on mouse movement
        let relativeIntersectY = (leftPaddle.y + leftPaddle.height / 2) - (ball.y + ball.size / 2);
        ball.vy = -relativeIntersectY / 10;
    }

    // Paddle collision (right)
    if (
        ball.x + ball.size >= rightPaddle.x &&
        ball.y + ball.size >= rightPaddle.y &&
        ball.y <= rightPaddle.y + rightPaddle.height
    ) {
        ball.x = rightPaddle.x - ball.size;
        ball.vx *= -1;
        let relativeIntersectY = (rightPaddle.y + rightPaddle.height / 2) - (ball.y + ball.size / 2);
        ball.vy = -relativeIntersectY / 10;
    }

    // Score out of bounds (left or right)
    if (ball.x < 0) {
        // Ball went past left paddle, AI scores
        aiScore++;
        resetBall();
    }
    else if (ball.x > WIDTH) {
        // Ball went past right paddle, Player scores
        playerScore++;
        // ADDED: Update best score if playerScore is highest
        if (playerScore > bestScore) {
            bestScore = playerScore;
            localStorage.setItem('pongBestScore', bestScore);
        }
        resetBall();
    }

    // Right paddle AI
    let targetY = ball.y + ball.size / 2 - rightPaddle.height / 2;
    if (rightPaddle.y < targetY) {
        rightPaddle.y += rightPaddle.speed;
        if (rightPaddle.y > targetY) rightPaddle.y = targetY;
    } else if (rightPaddle.y > targetY) {
        rightPaddle.y -= rightPaddle.speed;
        if (rightPaddle.y < targetY) rightPaddle.y = targetY;
    }
    // Clamp right paddle
    rightPaddle.y = Math.max(0, Math.min(HEIGHT - rightPaddle.height, rightPaddle.y));
}

function render() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Draw middle line
    ctx.strokeStyle = "#fff";
    ctx.setLineDash([10, 15]);
    ctx.beginPath();
    ctx.moveTo(WIDTH / 2, 0);
    ctx.lineTo(WIDTH / 2, HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw paddles and ball
    drawRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height, "#0ef");
    drawRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height, "#f50");
    drawBall(ball.x, ball.y, ball.size, "#fff");

    // ADDED: Draw scores
    drawScores();
}

function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

// Mouse controls for left paddle
canvas.addEventListener('mousemove', function(e) {
    const rect = canvas.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    leftPaddle.y = mouseY - leftPaddle.height / 2;
    // Clamp
    leftPaddle.y = Math.max(0, Math.min(HEIGHT - leftPaddle.height, leftPaddle.y));
});

// Start the game
gameLoop();