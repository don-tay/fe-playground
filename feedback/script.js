const ratings = document.querySelectorAll('.rating');
const ratingsContainer = document.querySelector('.ratings-container');
const sendBtn = document.getElementById('send');
const panel = document.getElementById('panel');
const credits = document.getElementById('credits');

let selectedRating = 'Satisfied';

ratingsContainer.addEventListener('click', e => {
  if (
    e.target.classList.contains('rating') ||
    e.target.parentElement.classList.contains('rating')
  ) {
    removeActive();
    const selectedElem = e.target.classList.contains('rating')
      ? e.target
      : e.target.parentElement;
    selectedElem.classList.contains('rating') &&
      selectedElem.classList.add('active');
    selectedRating = selectedElem.innerText;
  }
});

sendBtn.addEventListener('click', e => {
  panel.innerHTML = `
    <i class="fas fa-heart"></i>
    <strong>Thank You!</strong>
    <br />
    <strong>Feedback: ${selectedRating}</strong>
    <p>Your feedback will help us to improve our app!</p>
  `;

  credits.style.display = 'none';
});

const removeActive = () => {
  ratings.forEach(rating => rating.classList.remove('active'));
};
