const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

const gridSize = 20;
let snake = [{ x: gridSize * 5, y: gridSize * 5 }];
let direction = { x: 0, y: 0 };
let food = { x: gridSize * 10, y: gridSize * 10 };
let score = 0;

function gameLoop() {
    update();
    draw();
    checkCollision();
    setTimeout(gameLoop, 100);
}

function update() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        generateFood();
    } else {
        snake.pop();
    }

    snake.unshift(head);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snake.forEach((segment, index) => {
        const gradient = ctx.createLinearGradient(segment.x, segment.y, segment.x + gridSize, segment.y + gridSize);
        gradient.addColorStop(0, 'lime');
        gradient.addColorStop(1, 'green');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(segment.x + 5, segment.y);
        ctx.lineTo(segment.x + gridSize - 5, segment.y);
        ctx.quadraticCurveTo(segment.x + gridSize, segment.y, segment.x + gridSize, segment.y + 5);
        ctx.lineTo(segment.x + gridSize, segment.y + gridSize - 5);
        ctx.quadraticCurveTo(segment.x + gridSize, segment.y + gridSize, segment.x + gridSize - 5, segment.y + gridSize);
        ctx.lineTo(segment.x + 5, segment.y + gridSize);
        ctx.quadraticCurveTo(segment.x, segment.y + gridSize, segment.x, segment.y + gridSize - 5);
        ctx.lineTo(segment.x, segment.y + 5);
        ctx.quadraticCurveTo(segment.x, segment.y, segment.x + 5, segment.y);
        ctx.fill();
    });

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function generateFood() {
    food.x = Math.floor(Math.random() * canvas.width / gridSize) * gridSize;
    food.y = Math.floor(Math.random() * canvas.height / gridSize) * gridSize;
}

function checkCollision() {
    const head = snake[0];

    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        resetGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}

function resetGame() {
    snake = [{ x: gridSize * 5, y: gridSize * 5 }];
    direction = { x: 0, y: 0 };
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    generateFood();
}

document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -gridSize };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: gridSize };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -gridSize, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: gridSize, y: 0 };
            break;
    }
});

gameLoop();
