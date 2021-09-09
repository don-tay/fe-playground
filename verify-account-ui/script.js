const codes = document.querySelectorAll('.code');

// focus on input on page load
codes[0].focus();

codes.forEach((code, idx) => {
  code.addEventListener('input', e => {
    console.log(e.target.value, e.data, code.value);
    const isValidInput = code.value >= '0' && code.value <= '9';
    if (!isValidInput) {
      code.classList.add('invalid');
      setTimeout(() => (code.value = e.data), 100);
      return;
    }

    code.classList.remove('invalid');
    // ensures that each input has at MOST 1 character. Will overwrite old value if attempting to input new value.
    code.value = e.data;

    return codes[Math.min(idx + 1, codes.length - 1)].focus();
  });

  // keydown events to detect and handle specific key press behaviours
  code.addEventListener('keydown', e => {
    // handle special keys
    if (e.key === 'Backspace' && !code.value) {
      return setTimeout(() => codes[Math.max(idx - 1, 0)].focus(), 10);
    }
  });
});
