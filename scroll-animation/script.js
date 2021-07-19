const boxes = document.querySelectorAll('.box');

window.addEventListener('scroll', checkBoxes);

function checkBoxes() {
  const triggerBtm = (window.innerHeight / 5) * 4;

  boxes.forEach(box => {
    const topBox = box.getBoundingClientRect().top;

    // if top of box is within the trigger bottom range, show box
    if (topBox < triggerBtm) {
      box.classList.add('show');
    } else {
      box.classList.remove('show');
    }
  });
}
