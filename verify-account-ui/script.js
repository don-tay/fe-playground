const container = document.querySelector('.container');
const successMsg = document.getElementById('success-msg');
const codes = document.querySelectorAll('.code');

// focus on input on page load
codes[0].focus();

codes.forEach((code, idx) => {
  code.addEventListener('input', e => {
    container.classList.remove('success');
    successMsg.classList.remove('show');
    code.classList.remove('invalid');

    const isValidInput = code.value >= '0' && code.value <= '9';
    if (!isValidInput) {
      code.classList.add('invalid');
      setTimeout(() => (code.value = e.data), 100);
      return;
    }

    // ensures that each input has at MOST 1 character. Will overwrite old value if attempting to input new value.
    code.value = e.data;

    // if all fields filled with valid values, set success and unfocus box
    if (isCodeValid()) {
      displaySuccessMsg();
    }

    if (idx < codes.length - 1) {
      codes[idx + 1].focus();
    }
  });

  // keydown events to detect and handle specific key press behaviours
  code.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
      return setTimeout(() => codes[Math.max(idx - 1, 0)].focus(), 10);
    }
    if (e.key === 'ArrowRight') {
      return setTimeout(
        () => codes[Math.min(idx + 1, codes.length - 1)].focus(),
        10
      );
    }

    // handle special keys
    if (e.key === 'Backspace' && !code.value) {
      return setTimeout(() => codes[Math.max(idx - 1, 0)].focus(), 10);
    }
  });
});

const isCodeValid = () => {
  for (const code of codes) {
    if (code.value < '0' || code.value > '9') {
      return false;
    }
  }
  return true;
};

const displaySuccessMsg = () => {
  successMsg.classList.add('show');
  container.classList.add('success');
};
