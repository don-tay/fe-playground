const container = document.getElementById('container');
const NUM_SQUARES_IN_ROW = 20;
const DEFAULT_SQUARE_COLOUR = '#1d1d1d';
const DEFAULT_SQUARE_OUTLINE = '0 0 2px #000';

const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71'];

for (i = 0; i < NUM_SQUARES_IN_ROW; ++i) {
  for (j = 0; j < NUM_SQUARES_IN_ROW; ++j) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.addEventListener('mouseover', e => {
      changeColour(e.target);
    });
    container.appendChild(square);
  }
}

function changeColour(sq) {
  const color = colors[Math.floor(Math.random() * colors.length)];
  sq.style.backgroundColor = color;
  sq.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
  setTimeout(() => (sq.style.backgroundColor = DEFAULT_SQUARE_COLOUR), 1000);
  setTimeout(() => (sq.style.boxShadow = DEFAULT_SQUARE_OUTLINE), 2000);
}
