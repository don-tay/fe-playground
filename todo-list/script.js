const form = document.getElementById('form');
const input = document.getElementById('input');
const todosEl = document.getElementById('todos');

loadFromStorage();

form.addEventListener('submit', e => {
  e.preventDefault();

  addTodo(e.target);
});

function addTodo(todo) {
  const todoText = todo?.text ?? input.value;

  if (!todoText) {
    return;
  }

  const todoEl = document.createElement('li');
  // add completed class to those with completed todo
  todo?.completed && todoEl.classList.add('completed');

  todoEl.innerText = todoText;

  // add event listener to the created element
  todoEl.addEventListener('click', () => todoEl.classList.toggle('completed'));

  todoEl.addEventListener('contextmenu', e => {
    // prevent native context menu from appearing on right click
    e.preventDefault();

    todoEl.remove();
  });

  todosEl.appendChild(todoEl);

  input.value = '';
}

function loadFromStorage() {
  const listItems = localStorage.getItem('listItems');
  listItems?.forEach(item => {});
}
