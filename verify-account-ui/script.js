const codes = document.querySelectorAll('.code');

// focus on input on page load
codes[0].focus();

codes.forEach((code, idx) => {
  // ! Try implementing in keypress event instead. Valiadtion of input fields will be different.
  code.addEventListener('keydown', e => {
    code.classList.remove('invalid');

    // handle special keys
    if (e.key === 'Backspace') {
      return setTimeout(() => codes[Math.max(idx - 1, 0)].focus(), 10);
    } else if (e.key === 'Tab') {
      return;
    }

    const isValidInput = e.key >= 0 && e.key <= 9;
    if (isValidInput) {
      // hack to clear any existing number before adding in new input. 1 input will not have multiple digit
      setTimeout(() => codes[Math.min(idx + 1, codes.length - 1)].focus(), 10);
    } else {
      code.classList.add('invalid');
    }
    // ensures that each input has at MOST 1 character. Will overwrite old value if attempting to input new value.
    code.value = code.value && '';
  });
});
