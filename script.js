const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const errorMsg = document.getElementById('errorMsg');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;

    const left = document.createElement('div');
    left.className = 'task-left';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.onchange = () => toggleComplete(index);

    const span = document.createElement('span');
    span.textContent = task.name;
    span.className = 'task-text';

    left.appendChild(checkbox);
    left.appendChild(span);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = () => deleteTask(index);

    li.appendChild(left);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  const taskName = input.value.trim();
  if (!taskName) {
    errorMsg.textContent = 'Please enter a task!';
    return;
  }

  tasks.push({ name: taskName, completed: false });
  input.value = '';
  errorMsg.textContent = '';
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

addBtn.addEventListener('click', addTask);
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

renderTasks();
