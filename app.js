const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const emptyMsg = document.getElementById('empty-msg');

let todos = JSON.parse(localStorage.getItem('todos') || '[]');
let nextId = parseInt(localStorage.getItem('nextId') || '1', 10);

function save() {
  localStorage.setItem('todos', JSON.stringify(todos));
  localStorage.setItem('nextId', String(nextId));
}

function render() {
  list.innerHTML = '';
  emptyMsg.style.display = todos.length === 0 ? 'block' : 'none';

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.done ? ' done' : '');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `todo-${todo.id}`;
    checkbox.checked = todo.done;
    checkbox.addEventListener('change', () => toggle(todo.id));

    const label = document.createElement('label');
    label.htmlFor = `todo-${todo.id}`;
    label.textContent = todo.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '✕';
    deleteBtn.setAttribute('aria-label', 'Delete task');
    deleteBtn.addEventListener('click', () => remove(todo.id));

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

function add(text) {
  todos.push({ id: nextId++, text, done: false });
  save();
  render();
}

function toggle(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.done = !todo.done;
    save();
    render();
  }
}

function remove(id) {
  todos = todos.filter(t => t.id !== id);
  save();
  render();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    add(text);
    input.value = '';
  }
});

render();
