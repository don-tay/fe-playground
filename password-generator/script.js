const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
  lower: getRandomLowerCase,
  upper: getRandomUpperCase,
  digit: getRandomDigit,
  symbol: getRandomSymbol,
};

// Function to copy to clipboard from resultEl
clipboardEl.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const password = resultEl.innerText;

  // if password is falsy, do nothing
  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();

  // add success snackbar
  const snackBar = document.createElement('div');
  snackBar.classList.add('snack-bar');
  snackBar.innerText = 'Password successfully copied to clipboard!';
  document.body.prepend(snackBar);
  setTimeout(() => snackBar.remove(), 1500);
});

generateEl.addEventListener('click', () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

function generatePassword(lower, upper, digit, symbol, passwordLength) {
  let generatedPassword = '';
  const typesCount = lower + upper + digit + symbol;
  if (typesCount === 0) {
    return '';
  }

  const typesArr = [{ lower }, { upper }, { digit }, { symbol }]
    .filter(type => Object.values(type)[0])
    .map(obj => Object.keys(obj)[0]);

  while (generatedPassword.length < passwordLength) {
    generatedPassword +=
      randomFunc[typesArr[Math.floor(Math.random() * typesArr.length)]]();
  }
  return generatedPassword;
}

function getRandomLowerCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpperCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomDigit() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}[]=<>/,.';
  return symbols[Math.floor(Math.random() * symbols.length)];
}
