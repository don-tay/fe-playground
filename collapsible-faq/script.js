const toggleBtns = document.querySelectorAll('.faq-toggle');

toggleBtns.forEach(toggle => {
  toggle.addEventListener('click', () => {
    toggle.parentElement?.classList.toggle('active');
  });
});
