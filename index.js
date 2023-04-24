/**@type{HTMLCanvasElement} */
import Paddle from "./paddle.js";
import Ball from "./ball.js";
import Asteroid from "./Asteroids.js";
import Explosion from "./explosion.js";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const startScreen = document.getElementById("startScreen");
const startGameBtn = document.getElementById("startBtn");
const restartGameBtn = document.getElementById("restartBtn");
const gameOverScreen = document.getElementById("gameOverScreen");
const gameOverScreenScore = document.getElementById("score");
const gameOverScreenHiSore = document.getElementById("hScore");
const highScoreResetBtn = document.getElementById("hsResetBtn");
const cloudAnimation = document.getElementById("cloud");
canvas.width = 400;
canvas.height = 600;
const expSound1 = document.getElementById("explosion1");
const expSound2 = document.getElementById("explosion2");
const expSound3 = document.getElementById("explosion3");
const expSound4 = document.getElementById("explosion4");
const expSound5 = document.getElementById("explosion5");
const expSound6 = document.getElementById("explosion6");

let mousePos;
let paddle;
let ball;
let explosionArray = [];
let soundArray = [
  expSound1,
  expSound2,
  expSound3,
  expSound4,
  expSound5,
  expSound6,
];
let asteroidArray = [];
let numAsteroids = 23;
let gameSpeed = 1;
let score = 0;
let highestScore = localStorage.getItem("paHighScore") || 0;
let isPlaying = false;

let canvasBound = canvas.getBoundingClientRect()
console.log(canvasBound)
const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};
function startGame() {
  isPlaying = true;
  requestAnimationFrame(animate);
}
function stopGame() {
  isPlaying = false;
}

paddle = new Paddle(canvas.width, canvas.height);
ball = new Ball(canvas.width, canvas.height);

function initAsteroids() {
  for (let i = 0; i < numAsteroids; i++) {
    asteroidArray.push(new Asteroid(canvas.width, canvas.height));
  }
}
initAsteroids();

//scoreBoard
function scoreBoard(context) {
  context.fillStyle = "white";
  context.font = "25px Aerial";
  context.strokeText("Score: " + score, 30, 30);
  context.fillText("Score: " + score, 30, 30);
  context.fillStyle = "white";
  context.font = "25px Aerial";
  context.strokeText("Highest Score: " + highestScore, 400, 30);
  ctx.fillText("Highest Score: " + highestScore, 400, 30);
  gameOverScreenScore.innerHTML = score;
  gameOverScreenHiSore.innerHTML = highestScore;
}

function setHighestScore() {
  if (score > parseInt(localStorage.getItem("paHighScore"))) {
    localStorage.setItem("paHighScore", score);
    let hsScore = localStorage.getItem("paHighScore");
    highestScore = hsScore;
  }
}
function gameEndConditions(context) {
  if (ball.y + ball.r > canvas.height || asteroidArray.length < 2) {
    gameOverScreen.classList.add("active");
    stopGame();
  }
}
function animate() {
  if (!isPlaying) {
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  paddle.draw(ctx);
  paddle.update();
  paddle.edges();
  paddle.paddleMove();

  ball.draw(ctx);
  ball.update();
  ball.edges();

  if (ball.isPaddleContact(paddle)) {
    ball.velY = -ball.velY;
  }

  for (let i = asteroidArray.length - 1; i > 0; i--) {
    if (ball.isCollision(asteroidArray[i])) {
      soundArray[Math.floor(Math.random() * soundArray.length)].play();
      score++;
      explosionArray.push(
        new Explosion(
          canvas.width,
          canvas.height,
          asteroidArray[i].x,
          asteroidArray[i].y,
          asteroidArray[i].vel * 0.8
        )
      );
      if (asteroidArray[i].r > 15) {
        asteroidArray[i].r = 15;
      } else {
        asteroidArray.splice(i, 1);
      }
      ball.velY = -ball.velY;
    }
  }

  for (let i = 0; i < asteroidArray.length; i++) {
    asteroidArray[i].draw(ctx);
    asteroidArray[i].update();
    asteroidArray[i].edges();
  }

  //paddle control

  if (keys.a.pressed) {
    paddle.vel = -gameSpeed * 10;
  } else if (keys.d.pressed) {
    paddle.vel = gameSpeed * 10;
  } else {
    paddle.vel = 0;
  }
  for (let i = 0; i < explosionArray.length; i++) {
    explosionArray[i].draw(ctx);
    explosionArray[i].update();
    if (explosionArray[i].frameX > explosionArray[i].maxFrames) {
      explosionArray.splice(i, 1);
    }
  }

  scoreBoard(ctx);
  setHighestScore();
  gameEndConditions();

  requestAnimationFrame(animate);
}

window.addEventListener("keydown", (e) => {
  if (e.key === "a") {
    keys.a.pressed = true;
  }
  if (e.key === "d") {
    keys.d.pressed = true;
  }
});
window.addEventListener("keyup", (e) => {
  if (e.key === "a") {
    keys.a.pressed = false;
  }
  if (e.key === "d") {
    keys.d.pressed = false;
  }
});
canvas.addEventListener("pointermove", (e) => {
  e.preventDefault();
  paddle.mousePos = e.offsetX;
});

startGameBtn.addEventListener("click", () => {
  cloudAnimation.classList.add("cloudActive");

  setTimeout(() => {
    startScreen.classList.add("inactive");
    startGame();
  }, 900);
});
highScoreResetBtn.addEventListener("click", () => {
  localStorage.setItem("paHighScore", 0);
});
restartGameBtn.addEventListener("click", () => {
  window.location.reload();
});
