const imgContainer = document.getElementById('imgs');
const prevBtn = document.getElementById('left');
const nextBtn = document.getElementById('right');

const imgCnt = imgContainer.children?.length;

let imgWidth = imgContainer.clientWidth;
let currImgIdx = 0;

// auto shift left every 2s
let autoShiftInt = setInterval(shiftImgLeft, 2000);

window.addEventListener('resize', () => {
  imgWidth = imgContainer.clientWidth;
  imgContainer.style.transform = `translateX(${-currImgIdx * imgWidth}px)`;
});

prevBtn.addEventListener('click', () => {
  shiftImgRight();
  resetInterval();
});
nextBtn.addEventListener('click', () => {
  shiftImgLeft();
  resetInterval();
});

function resetInterval() {
  clearInterval(autoShiftInt);
  setTimeout(() => (autoShiftInt = setInterval(shiftImgLeft, 2000)), 5000);
}

function shiftImgLeft() {
  if (currImgIdx < imgCnt - 1) {
    ++currImgIdx;
  } else {
    currImgIdx = 0;
  }
  imgContainer.style.transform = `translateX(${-currImgIdx * imgWidth}px)`;
}

function shiftImgRight() {
  if (currImgIdx > 0) {
    --currImgIdx;
  } else {
    currImgIdx = imgCnt - 1;
  }
  imgContainer.style.transform = `translateX(${-currImgIdx * imgWidth}px)`;
}
