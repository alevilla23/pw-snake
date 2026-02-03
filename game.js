const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const startBtn = document.querySelector(".button-start");

let gameInterval = null;

document.getElementById("up").addEventListener("click", () => {
  if (dy === 0) {
    dx = 0;
    dy = -10;
  }
});

document.getElementById("down").addEventListener("click", () => {
  if (dy === 0) {
    dx = 0;
    dy = 10;
  }
});

document.getElementById("left").addEventListener("click", () => {
  if (dx === 0) {
    dx = -10;
    dy = 0;
  }
});

document.getElementById("right").addEventListener("click", () => {
  if (dx === 0) {
    dx = 10;
    dy = 0;
  }
});


let snake = [{ x: 150, y: 150 }];
let food = { x: 60, y: 60 };
let dx = 10;
let dy = 0;
let score = 0;

function startGame() {
  if (gameInterval) return; 

  score = 0;
  scoreEl.textContent = score;

  gameInterval = setInterval(draw, 150);
  startBtn.textContent = "Restart";
}

startBtn.addEventListener("click", startGame);

function draw() {
  ctx.fillStyle='#58f93f'
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar comida
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, 8, 8);

  // Dibujar serpiente
  ctx.fillStyle = "black";
  snake.forEach(part => ctx.fillRect(part.x, part.y, 8, 8));

  // Mover serpiente
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  // Comer comida
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreEl.textContent = score;
    food = {
      x: Math.floor(Math.random() * 10) * 8,
      y: Math.floor(Math.random() * 10) * 8
    }
  } else {
    snake.pop();
  }

  // Colisiones
  if (
    head.x < 0 || head.y < 0 ||
    head.x >= canvas.width || head.y >= canvas.height ||
    snake.slice(1).some(p => p.x === head.x && p.y === head.y)
  ) {
    console.log("Game Over");
    clearInterval(gameInterval);
    gameInterval = null;
    snake = [{ x: 150, y: 150 }];
    dx = 10;
    dy = 0;
    score = 0;
    scoreEl.textContent = score;
  }
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") { dx = 0; dy = -10; }
  if (e.key === "ArrowDown") { dx = 0; dy = 10; }
  if (e.key === "ArrowLeft") { dx = -10; dy = 0; }
  if (e.key === "ArrowRight") { dx = 10; dy = 0; }
});

