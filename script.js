// 简易贪吃蛇游戏
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restart');

const GRID = 20; // 每格像素数
const COLS = canvas.width / GRID; const ROWS = canvas.height / GRID;

let snake; let dir; let nextDir; let food; let running; let score;
let tickInterval = 120; // 毫秒每步
let lastTick = 0;

function reset() {
  snake = [ {x: Math.floor(COLS/2), y: Math.floor(ROWS/2)} ];
  dir = {x:1, y:0}; nextDir = dir;
  placeFood();
  running = true; score = 0; updateScore();
}

function placeFood(){
  while(true){
    const f = { x: Math.floor(Math.random()*COLS), y: Math.floor(Math.random()*ROWS) };
    if(!snake.some(s => s.x===f.x && s.y===f.y)) { food = f; break; }
  }
}

function updateScore(){ scoreEl.textContent = score; }

function gameOver(){ running = false; ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(0,0,canvas.width,canvas.height);
 ctx.fillStyle='#fff'; ctx.font='20px sans-serif'; ctx.textAlign='center'; ctx.fillText('游戏结束 — 按重新开始', canvas.width/2, canvas.height/2); }

function update(){
  // 方向更新
  if((nextDir.x !== -dir.x || nextDir.y !== -dir.y)) dir = nextDir;
  const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
  // 撞墙
  if(head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) { gameOver(); return; }
  // 撞到自己
  if(snake.some(s => s.x===head.x && s.y===head.y)) { gameOver(); return; }
  snake.unshift(head);
  // 吃食物
  if(head.x === food.x && head.y === food.y){ score += 1; updateScore(); placeFood();
    // 加速小幅提升速度
    tickInterval = Math.max(40, tickInterval - 2);
  } else { snake.pop(); }
}

function draw(){
  // 清屏
  ctx.clearRect(0,0,canvas.width,canvas.height);
  // 背景格子（可选）
  ctx.fillStyle = '#0b1220'; ctx.fillRect(0,0,canvas.width,canvas.height);

  // 画食物
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(food.x*GRID, food.y*GRID, GRID-2, GRID-2);

  // 画蛇
  for(let i=0;i<snake.length;i++){
    const s = snake[i];
    ctx.fillStyle = i===0 ? '#f59e0b' : '#10b981';
    ctx.fillRect(s.x*GRID+1, s.y*GRID+1, GRID-2, GRID-2);
  }
}

function loop(ts){
  if(!lastTick) lastTick = ts;
  const elapsed = ts - lastTick;
  if(elapsed >= tickInterval){
    lastTick = ts;
    if(running) update();
    draw();
  }
  requestAnimationFrame(loop);
}

document.addEventListener('keydown', e => {
  const key = e.key;
  if(key === 'ArrowUp' || key === 'w' || key === 'W') nextDir = {x:0, y:-1};
  if(key === 'ArrowDown' || key === 's' || key === 'S') nextDir = {x:0, y:1};
  if(key === 'ArrowLeft' || key === 'a' || key === 'A') nextDir = {x:-1, y:0};
  if(key === 'ArrowRight' || key === 'd' || key === 'D') nextDir = {x:1, y:0};
});

restartBtn.addEventListener('click', ()=>{ tickInterval = 120; reset(); });

reset(); requestAnimationFrame(loop);
