const form = document.getElementById('form');
const input = document.getElementById('input');
const todosEl = document.getElementById('todos');
const clearBtn = document.getElementById('clear-btn');

initTodo();

function initTodo() {
  const todos = JSON.parse(localStorage.getItem('todos')) ?? [];
  todos.forEach(todo => addTodo(todo));

  form.addEventListener('submit', e => {
    e.preventDefault();
    addTodo(e.target);
  });

  clearBtn.addEventListener('click', () => {
    todosEl.innerHTML = '';
    updateStorageAndBtn();
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
    updateStorageAndBtn();
  });

  todoEl.addEventListener('contextmenu', e => {
    // prevent native context menu from appearing on right click
    e.preventDefault();

    todoEl.remove();
    updateStorageAndBtn();
  });

  todosEl.appendChild(todoEl);

  input.value = '';

  updateStorageAndBtn();
}

function updateStorageAndBtn() {
  const todosEl = document.querySelectorAll('li');
  const todos = [];
  todosEl.forEach(todoEl => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains('completed'),
    });
  });
  localStorage.setItem('todos', JSON.stringify(todos));

  // disable button if no todo in list
  clearBtn.disabled = todos.length === 0;
}
