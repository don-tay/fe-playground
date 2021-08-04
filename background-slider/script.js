const body = document.body;
const slides = document.querySelectorAll('.slide');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');

let activeSlideIdx = 0;

rightBtn.addEventListener('click', () => {
  if (++activeSlideIdx > slides.length - 1) {
    activeSlideIdx = 0;
  }
  setBgToBody();
  setActiveSlide();
});

leftBtn.addEventListener('click', () => {
  if (--activeSlideIdx < 0) {
    activeSlideIdx = slides.length - 1;
  }
  setBgToBody();
  setActiveSlide();
});

setBgToBody();

function setBgToBody() {
  const activeSlide = slides[activeSlideIdx];
  body.style.backgroundImage = activeSlide.style.backgroundImage;
}

function setActiveSlide() {
  slides.forEach(slide => slide.classList.remove('active'));
  const activeSlide = slides[activeSlideIdx];
  activeSlide.classList.add('active');
}
