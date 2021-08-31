const imgs = document.querySelectorAll('.content');
const navBtns = document.querySelectorAll('nav ul li');

navBtns.forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    imgs.forEach(img => img.classList.remove('show'));
    imgs[idx].classList.add('show');
    navBtns.forEach(btn => btn.classList.remove('active'));
    btn.classList.add('active');
  });
});
