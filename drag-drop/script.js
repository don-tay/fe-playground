const fill = document.querySelector('.fill');
const emptyBoxes = document.querySelectorAll('.empty');

fill.addEventListener('dragstart', dragStart);
fill.addEventListener('dragend', dragEnd);

emptyBoxes.forEach(box => {
  box.addEventListener('dragover', dragOver);
  box.addEventListener('dragenter', dragEnter);
  box.addEventListener('dragleave', dragLeave);
  box.addEventListener('drop', dragDrop);
});

function dragStart() {
  // add 'hold' class when dragged
  this.className += ' hold';
  //  to allow previous line to execute first before setting to invisble
  setTimeout(() => (this.className = 'invisible'), 0);
}
function dragEnd() {
  this.className = 'fill';
}
function dragOver(e) {
  // prevent default behaviour of resetting drag operation to none
  e.preventDefault();
}
function dragEnter(e) {
  // prevent default behaviour of rejecting user selection as potential target elem
  e.preventDefault();
  this.className += ' hovered';
}
function dragLeave() {
  this.className = 'empty';
}
function dragDrop() {
  this.className = 'empty';
  this.append(fill);
}
