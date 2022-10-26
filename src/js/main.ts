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


let speedBlob = 20;

const colors = ['#91a6ff', '#ff88dc', '#faff7f', '#fff']

const blob = {
  x: 500,
  y: 500,
  radius: 50
}

let balls = [];
let timerAnimationFrame;


const init = () => {
  document.addEventListener("keydown", handleMoveBlob);

  createBalls();
  draw();
}

const createBalls = () => {
  console.log(Utils.random(0, colors.length - 1));
  console.log(Utils.random(0, colors.length - 1));
  balls.push(new Ball(ctx, 300, 800, colors[0]));
  balls.push(new Ball(ctx, 300, 400, colors[1]));
  balls.push(new Ball(ctx, 800, 400, colors[2]));
  balls.push(new Ball(ctx, 30, 300, colors[3]));
}
const handleEatenBall = () => {
  balls.push(new Ball(ctx, 300, 800, colors[0]));
  if (blob.radius > 500) {
    console.log('groter dan 500')
  }

}

const draw = () => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  checkEatBlob();
  drawBlob();
  balls.forEach(ball => ball.draw());

  if (blob.radius < 500) {
    timerAnimationFrame = requestAnimationFrame(draw);
  }
  if (blob.radius >= 500) {
    cancelAnimationFrame(timerAnimationFrame);
  }

  return;
}

const drawBlob = () => {
  //ctx.beginPath();
  //ctx.ellipse(blob.x, blob.y, blob.radius, blob.radius, 0, 0, Math.PI * 2)
  //ctx.fillStyle = "#FFF";
  //ctx.fill();
  // ctx.closePath();
  document.getElementById("background-design").style.clipPath = `circle(${blob.radius}px at ${blob.x}px ${blob.y}px)`;
}

const checkEatBlob = () => {
  const ballsToDelete = []
  balls.forEach((ball, index) => {
    //check of de blob een ball raakt
    if (ball.location.x > blob.x - blob.radius && ball.location.x < blob.x + blob.radius && ball.location.y > blob.y - blob.radius && ball.location.y < blob.y + blob.radius) {
      blob.radius += 50;
      ballsToDelete.push(ball);
      handleEatenBall();
    }
  })
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

