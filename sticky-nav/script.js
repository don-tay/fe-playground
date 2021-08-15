const nav = document.querySelector('.nav');

window.addEventListener('scroll', fixNav);

const NAV_HEIGHT_OFFSET = 150;

function fixNav() {
  if (window.scrollY > nav.offsetHeight + NAV_HEIGHT_OFFSET) {
    nav.classList.add('active');
  } else {
    nav.classList.remove('active');
  }
}
