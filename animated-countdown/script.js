const nums = document.querySelectorAll('.nums span');
const counter = document.querySelector('.counter');
const finalMessage = document.querySelector('.final');
const replay = document.getElementById('replay');

runAnimation();

function resetDOM() {
  counter.classList.remove('hide');
  finalMessage.classList.remove('show');

  nums.forEach(num => {
    num.classList.value = '';
  });

  nums[0].classList.add('in');
}

const lastIdx = nums.length - 1;

function runAnimation() {
  nums.forEach((num, idx) => {
    // event listener for on animation end
    num.addEventListener('animationend', e => {
      if (e.animationName === 'goIn' && idx < lastIdx) {
        num.classList.remove('in');
        num.classList.add('out');
        // see if sibling element available
      } else if (e.animationName === 'goOut' && num.nextElementSibling) {
        num.nextElementSibling.classList.add('in');
      } else {
        counter.classList.add('hide');
        finalMessage.classList.add('show');
      }
    });
  });
}

replay.addEventListener('click', () => {
  resetDOM();
  runAnimation();
});
