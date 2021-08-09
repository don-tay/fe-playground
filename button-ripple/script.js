const buttons = document.querySelectorAll('.ripple');

buttons.forEach(btn => {
  btn.addEventListener('click', function (e) {
    // get x and y axis relative to viewport
    const x = e.clientX;
    const y = e.clientY;

    // get x and y coord of top left pt of btn
    const btnTop = e.target.offsetTop;
    const btnLeft = e.target.offsetLeft;

    const xInside = x - btnLeft;
    const yInside = y - btnTop;

    const circle = document.createElement('span');
    circle.classList.add('circle');
    circle.style.left = xInside + 'px';
    circle.style.top = yInside + 'px';

    this.appendChild(circle);

    // remove from DOM after 300ms
    setTimeout(() => circle.remove(), 200);
  });
});
