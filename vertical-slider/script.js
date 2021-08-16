const sliderContainer = document.querySelector('.slider-container');
const slideRight = document.querySelector('.right-slide');
const slideLeft = document.querySelector('.left-slide');
const upBtn = document.querySelector('.up-button');
const downBtn = document.querySelector('.down-button');

const slideLength = slideRight.querySelectorAll('div').length;

let activeSlideIdx = 0;

slideLeft.style.top = `-${(slideLength - 1) * 100}vh`;

upBtn.addEventListener('click', () => changeSlide('up'));
downBtn.addEventListener('click', () => changeSlide('down'));

const changeSlide = direction => {
  const sliderHeight = sliderContainer.clientHeight;
  if (direction === 'up') {
    activeSlideIdx = ++activeSlideIdx > slideLength - 1 ? 0 : activeSlideIdx;
  } else if (direction === 'down') {
    activeSlideIdx = --activeSlideIdx < 0 ? slideLength - 1 : activeSlideIdx;
  }
  slideRight.style.transform = `translateY(-${
    activeSlideIdx * sliderHeight
  }px)`;
  slideLeft.style.transform = `translateY(${activeSlideIdx * sliderHeight}px)`;
};
