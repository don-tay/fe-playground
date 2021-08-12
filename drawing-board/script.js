const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const sizeEl = document.getElementById('size');
const colorEl = document.getElementById('color');
const decrBtn = document.getElementById('decrease');
const incrBtn = document.getElementById('increase');
const clearBtn = document.getElementById('clear');

let size = parseInt(sizeEl.innerText);
let isPressed = false;
let color = colorEl.value;
let x;
let y;

decrBtn.addEventListener('click', () => {
  if (size <= 1) {
    return;
  }
  sizeEl.innerText = --size;
});

incrBtn.addEventListener('click', () => {
  sizeEl.innerText = ++size;
});

colorEl.addEventListener('change', e => (color = e.target.value));

clearBtn.addEventListener('click', () =>
  ctx.clearRect(0, 0, canvas.width, canvas.height)
);

canvas.addEventListener('mousedown', e => {
  isPressed = true;
  // mouse position
  x = e.offsetX;
  y = e.offsetY;
});

document.addEventListener('mouseup', e => {
  isPressed = false;
  // unset mouse position
  x = null;
  y = null;
});

canvas.addEventListener('mousemove', e => {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;

    // call both circle and line to have continuous line effect. calling drawCircle alone gives a disjointed line if mouse moves too fast
    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);

    // update val of x and y to x2 and y2 (new position of mouse)
    x = x2;
    y = y2;
  }
});

function drawCircle(x1, y1) {
  ctx.beginPath();
  ctx.arc(x1, y1, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  // set line width to same width as single circle
  ctx.lineWidth = size * 2;
  ctx.stroke();
}
