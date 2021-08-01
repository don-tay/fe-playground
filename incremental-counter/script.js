const counters = document.querySelectorAll('.counter');

const incrementFactor =
  Math.min(
    ...Array.from(counters).map(cnt => +cnt.getAttribute('data-target'))
  ) / 10;

counters.forEach(counter => {
  counter.innerText = '0';

  const updateCounter = () => {
    const target = +counter.getAttribute('data-target');
    const curr = +counter.innerText;

    const increment = target / incrementFactor;

    if (curr < target) {
      counter.innerText = `${Math.ceil(curr + increment)}`;
      // call updateCounter recursively
      setTimeout(updateCounter, 1);
    } else {
      counter.innerText = target;
    }
  };

  updateCounter();
});
