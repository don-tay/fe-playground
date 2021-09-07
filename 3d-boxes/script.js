const boxesContainer = document.getElementById('boxes');
const btn = document.getElementById('btn');

const NUM_SQUARES_A_SIDE = 4;

btn.addEventListener('click', () => boxesContainer.classList.toggle('big'));

(function () {
  for (let i = 0; i < NUM_SQUARES_A_SIDE; ++i) {
    for (let j = 0; j < 4; ++j) {
      const box = document.createElement('div');
      box.classList.add('box');
      box.style.backgroundPosition = `${-j * 125}px ${-i * 125}px`;
      boxesContainer.appendChild(box);
    }
  }
})();
