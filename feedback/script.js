const ratings = document.querySelectorAll('.rating');
const ratingsContainer = document.querySelector('.ratings-container');
const sendBtn = document.getElementById('send');
const panel = document.getElementById('panel');

let selectedRating = 'Satisfied';

ratingsContainer.addEventListener('click', e => {
  if (
    e.target.classList.contains('rating') ||
    e.target.parentElement.classList.contains('rating')
  ) {
    removeActive();
    (e.target.classList.contains('rating') &&
      e.target.classList.add('active')) ||
      (e.target.parentElement.classList.contains('rating') &&
        e.target.parentElement.classList.add('active'));
    selectedRating = e.target.nextElementSibling.innerText;
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
});

const removeActive = () => {
  ratings.forEach(rating => rating.classList.remove('active'));
};
