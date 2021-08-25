const toggles = document.querySelectorAll('.toggle');

const checkedArr = [];

toggles.forEach(toggle =>
  toggle.addEventListener('change', e => updateCheckboxes(e.target))
);

function updateCheckboxes(clickedCheckbox) {
  (clickedCheckbox.checked && checkedArr.push(clickedCheckbox)) ||
    checkedArr.splice(checkedArr.indexOf(clickedCheckbox), 1);
  if (checkedArr.length < 3) {
    return;
  }
  const toUncheck = checkedArr.shift();
  toUncheck.checked = false;
}
