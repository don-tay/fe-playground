const smallCups = document.querySelectorAll('.cup-small');
const litres = document.getElementById('litres');
const percentage = document.getElementById('percentage');
const remained = document.getElementById('remained');
const titleElem = document.getElementById('title-text');

const totalCupsCount = smallCups.length;

updateBigCup();

smallCups.forEach((cup, idx) => {
  cup.addEventListener('click', () => highlightCups(idx));
});

function highlightCups(idx) {
  const cupSelected = smallCups[idx];
  if (idx === totalCupsCount - 1 && cupSelected.classList.contains('full')) {
    --idx;
  } else if (
    cupSelected.classList.contains('full') &&
    !cupSelected.nextElementSibling.classList.contains('full')
  ) {
    --idx;
  }

  smallCups.forEach((cup, idxA) => {
    if (idxA <= idx) {
      cup.classList.add('full');
    } else {
      cup.classList.remove('full');
    }
  });
  updateBigCup();
}

function updateBigCup() {
  const fullCupsCount = document.querySelectorAll('.cup-small.full').length;

  if (fullCupsCount === 0) {
    percentage.style.visibility = 'hidden';
    percentage.style.height = 0;
  } else {
    percentage.style.visibility = 'visible';
    percentage.style.height = `${(fullCupsCount / totalCupsCount) * 330}px`;
    percentage.innerText = `${(fullCupsCount / totalCupsCount) * 100}%`;
  }

  // hide 'Remained' text if 100% full
  if (fullCupsCount === totalCupsCount) {
    remained.style.visibility = 'hidden';
    remained.style.height = 0;
    document.body.classList.add('complete');
    titleElem.innerText = 'YOU ARE HYDRATED!';
  } else {
    remained.style.visibility = 'visible';
    litres.innerText = `${2 - (250 * fullCupsCount) / 1000}L`;
    document.body.classList.remove('complete');
    titleElem.innerText = 'HYDRATE!';
  }
}
