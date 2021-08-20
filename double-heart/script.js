const loveMe = document.querySelector('.loveMe');
const times = document.getElementById('times');

let clickTime = 0;
let timesClicked = 0;

loveMe.addEventListener('click', e => {
  const currTime = new Date().getTime();
  if (clickTime === 0 || currTime - clickTime >= 800) {
    clickTime = currTime;
  } else {
    createHeart(e);
    clickTime = 0;
  }
});

const createHeart = e => {
  const heart = document.createElement('i');
  heart.classList.add('fas');
  heart.classList.add('fa-heart');

  const x = e.clientX;
  const y = e.clientY;

  const { offsetLeft } = e.target;
  const { offsetTop } = e.target;

  const xInside = x - offsetLeft;
  const yInside = y - offsetTop;

  heart.style.top = `${yInside}px`;
  heart.style.left = `${xInside}px`;

  loveMe.appendChild(heart);

  times.innerText = ++timesClicked;

  //   cleanup heart from DOM
  setTimeout(() => heart.remove(), 1000);
};
