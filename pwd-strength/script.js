const bg = document.getElementById('background');
const pwdText = document.getElementById('password');

const LENGTH_TO_CLEAR = 10;

pwdText.addEventListener('input', e => {
  const pwdLength = e.target.value.length;
  const pctBlur = Math.max(
    ((LENGTH_TO_CLEAR - pwdLength) / LENGTH_TO_CLEAR) * 20,
    0
  );
  bg.style.filter = `blur(${pctBlur}px)`;
});
