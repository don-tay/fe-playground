const labels = document.querySelectorAll('.form-control label');

labels.forEach(label => {
  label.innerHTML = label.innerText
    .split('')
    .map(
      (char, idx) =>
        `<span style="transition-delay:${idx * 50}ms">${char}</span>`
    )
    .join('');
});
