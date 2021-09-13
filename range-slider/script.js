const rangeEl = document.getElementById('range');
const label = rangeEl.nextElementSibling;

const rangeWidth = +getComputedStyle(rangeEl)
  .getPropertyValue('width')
  .slice(0, -2);
const labelWidth = +getComputedStyle(label)
  .getPropertyValue('width')
  .slice(0, -2);
const rangeMin = +range.min;
const rangeMax = +range.max;

rangeEl.addEventListener('input', e => {
  const value = +e.target.value;

  const left =
    value * (rangeWidth / rangeMax) -
    labelWidth / 2 +
    scale(value, rangeMin, rangeMax, 10, -10);
  label.style.left = `${left}px`;
  label.innerHTML = value;
});

// custom fn value mapper from stackoverflow
const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};
