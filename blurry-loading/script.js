const loadText = document.querySelector('.loading-text');
const bg = document.querySelector('.bg');

let load = 0;
let interval = setInterval(blurring, 30);

function blurring() {
  if (++load > 99) {
    clearInterval(interval);
  }

  loadText.innerHTML = `${load}%`;
  loadText.style.opacity = scale(load, 0, 100, 1, 0);
  bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
}

// custom fn value mapper from stackoverflow
const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};
