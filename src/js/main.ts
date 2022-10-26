//let canvas = <HTMLCanvasElement>document.getElementById("mycanvas");
//let ctx = canvas.getContext("2d");
//const canvas = document.getElementById("c");
//canvas.width = 1920;
//canvas.height = 1080;
import Ball from './classes/Ball.js';
import Utils from './Utils.js';



const canvas = <HTMLCanvasElement>document.getElementById('c');
canvas.width = 1920;
canvas.height = 1080;
let ctx = canvas.getContext("2d");

let timerAnimationFrame;
let speedBlob = 20;

const blob = {
  x: 500,
  y: 500,
  radius: 100
}

let balls = [];



const init = () => {
  document.addEventListener("keydown", handleMoveBlob);
  createBalls();
  draw();
}

const createBalls = () => {
  balls.push(new Ball(ctx, 2, true, 300, 800, `#ff0000`));
  balls.push(new Ball(ctx, 2, true, 300, 400, `#ff0000`));
  balls.push(new Ball(ctx, 2, true, 800, 400, `#ff0000`));
  balls.push(new Ball(ctx, 2, true, 30, 300, `#ff0000`));
}

const draw = () => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  checkEatBlob();
  drawBlob();
  balls.forEach(ball => ball.draw());

  timerAnimationFrame = requestAnimationFrame(draw);
  return;
}

const drawBlob = () => {
  ctx.beginPath();
  ctx.ellipse(blob.x, blob.y, blob.radius, blob.radius, 0, 0, Math.PI * 2)
  ctx.fillStyle = "#FFF";
  ctx.fill();
  ctx.closePath();
  ctx.fill();
}

const checkEatBlob = () => {
  const ballsToDelete = []
  balls.forEach((ball, index) => {
    //check of de blob een ball raakt
    if (ball.location.x > blob.x - blob.radius && ball.location.x < blob.x + blob.radius && ball.location.y > blob.y - blob.radius && ball.location.y < blob.y + blob.radius) {
      blob.radius += 50;
      //balls.splice(ball, 1);
      ballsToDelete.push(ball)
    }
  })
  console.log(ballsToDelete);
  balls = balls.filter(ball => !ballsToDelete.includes(ball));
}

const handleMoveBlob = (e) => {
  if (e.key === 'a') {
    blob.y -= speedBlob;
    blob.x -= speedBlob;
  }
  if (e.key === 'b') {
    blob.y -= speedBlob;
  }
  if (e.key === 'c') {
    blob.y -= speedBlob;
    blob.x += speedBlob;
  }
  if (e.key === 'd') {
    blob.x += speedBlob;
  }
  if (e.key === 'e') {
    blob.x += speedBlob;
    blob.y += speedBlob;
  }
  if (e.key === 'f') {
    blob.y += speedBlob;
  }
  if (e.key === 'g') {
    blob.y += speedBlob;
    blob.x -= speedBlob;
  }
  if (e.key === 'h') {
    blob.x -= speedBlob;
  }
  if (blob.x < 0) {
    blob.x = 0;
  }
  if (blob.x > canvas.width) {
    blob.x = canvas.width;
  }
  if (blob.y < 250) {
    blob.y = 250;
  }
  if (blob.y > 1000) {
    blob.y = 1000;
  }


}

init()
postMessage({ payload: 'removeLoading' }, '*')

