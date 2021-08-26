const addBtn = document.getElementById('add');

let noteCnt = localStorage.getItem('noteCnt') || 1;

const notes = JSON.parse(localStorage.getItem('noteArr'));

if (notes) {
  notes.forEach(note => addNewNote(note));
}

addBtn.addEventListener('click', () => {
  addNewNote({});
  updateLocalStorage();
});

function addNewNote({ text = '', title = '' }) {
  const note = document.createElement('note');
  note.classList.add('note');

  const noteTitle = title || `Note ${noteCnt++}`;
  note.innerHTML = `
    <div class="tools">
        <div class="note-title">
            ${noteTitle}
        </div>
        <div class="tools-btn">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>
    </div>

    <div class="main hidden"></div>
    <textarea class=""></textarea>
  `;

  // add event listeners for the elements in the newly created element
  const editBtn = note.querySelector('.edit');
  const deleteBtn = note.querySelector('.delete');
  const main = note.querySelector('.main');
  const textArea = note.querySelector('textarea');

  textArea.value = text;
  main.innerHTML = marked(text);

  deleteBtn.addEventListener('click', () => {
    note.remove();
    updateLocalStorage();
  });

  editBtn.addEventListener('click', () => {
    main.classList.toggle('hidden');
    textArea.classList.toggle('hidden');
  });

  textArea.addEventListener('input', e => {
    const { value } = e.target;
    main.innerHTML = marked(value);
    updateLocalStorage();
  });

  document.body.appendChild(note);
}

function updateLocalStorage() {
  const noteArr = [];
  document.querySelectorAll('.note').forEach(note => {
    const text = note.querySelector('textarea').value;
    const title = note.querySelector('.note-title').innerText;
    noteArr.push({ text, title });
  });
  localStorage.setItem('noteArr', JSON.stringify(noteArr));
  localStorage.setItem('noteCnt', noteCnt);
}
