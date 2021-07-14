const progress = document.getElementById('progress');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const circles = document.querySelectorAll('.circle');

let currentActive = 1;

next.addEventListener('click', () => {
  console.log('clicked');
  currentActive = Math.min(++currentActive, circles.length);
  updateCircleAndBar();
  updateBtn();
});

prev.addEventListener('click', () => {
  currentActive = Math.max(--currentActive, 1);
  updateCircleAndBar();
  updateBtn();
});

const updateCircleAndBar = () => {
  circles.forEach((circle, idx) => {
    if (idx < currentActive) {
      circle.classList.add('active');
    } else {
      circle.classList.remove('active');
    }
  });

  const numActiveCircles = document.querySelectorAll('.active').length;
  // style progress bar CSS width prop
  progress.style.width =
    ((numActiveCircles - 1) / (circles.length - 1)) * 100 + '%';
};

const updateBtn = () => {
  prev.disabled = currentActive === 1;
  next.disabled = currentActive === circles.length;
};
