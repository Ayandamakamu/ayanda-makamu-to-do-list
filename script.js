const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Load saved tasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);

function addTask(taskText = null, completed = false) {
  const text = taskText || taskInput.value.trim();
  if (text === '') return;

  const li = document.createElement('li');
  li.className = 'task-item';
  li.textContent = text;

  if (completed) {
    li.classList.add('completed');
  }

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';

  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  taskInput.value = '';
  saveTasks();
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];

  document.querySelectorAll('.task-item').forEach(task => {
    tasks.push({
      text: task.firstChild.textContent,
      completed: task.classList.contains('completed')
    });
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

  savedTasks.forEach(task => {
    addTask(task.text, task.completed);
  });
}

addBtn.addEventListener('click', () => addTask());

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});
