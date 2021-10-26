const container = document.querySelector('.container');
const PIC_URL = 'https://picsum.photos/';
const NUM_ROWS = 10;

for (let i = 0; i < NUM_ROWS * 3; ++i) {
  const img = document.createElement('img');
  img.src = `${PIC_URL}${getRandomSize()}`;
  container.appendChild(img);
}

function getRandomSize() {
  return `${getRandomNum()}/${getRandomNum()}`;
}

function getRandomNum() {
  return Math.floor(Math.random() * 10) + 300;
}
