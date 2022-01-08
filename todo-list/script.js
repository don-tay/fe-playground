const form = document.getElementById('form');
const input = document.getElementById('input');
const todosEl = document.getElementById('todos');

initTodo();

function initTodo() {
  const todos = JSON.parse(localStorage.getItem('todos')) ?? [];
  todos.forEach(todo => addTodo(todo));

  form.addEventListener('submit', e => {
    e.preventDefault();
    addTodo(e.target);
  });
}

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
  todoEl.addEventListener('click', () => {
    todoEl.classList.toggle('completed');
    updateStorage();
  });

  todoEl.addEventListener('contextmenu', e => {
    // prevent native context menu from appearing on right click
    e.preventDefault();

    todoEl.remove();
    updateStorage();
  });

  todosEl.appendChild(todoEl);

  input.value = '';

  updateStorage();
}

function updateStorage() {
  const todosEl = document.querySelectorAll('li');
  const todos = [];
  todosEl.forEach(todoEl => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains('completed'),
    });
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}
