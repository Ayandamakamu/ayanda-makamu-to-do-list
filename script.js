const taskInput = document.getElementById('task-input');
const reminderInput = document.getElementById('reminder-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

let tasks = [];

/* ---------------- NOTIFICATIONS ---------------- */

if ('Notification' in window && Notification.permission !== 'granted') {
  Notification.requestPermission();
}

/* ---------------- LOAD TASKS ---------------- */

document.addEventListener('DOMContentLoaded', () => {
  const saved = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = saved;

  tasks.forEach(task => {
    renderTask(task);
    if (task.reminderTime) {
      scheduleReminder(task);
    }
  });
});

/* ---------------- ADD TASK ---------------- */

function addTask() {
  const text = taskInput.value.trim();
  const reminderTime = reminderInput.value || null;

  if (text === '') return;

  const task = {
    id: Date.now(),
    text,
    completed: false,
    reminderTime,
    reminded: false
  };

  tasks.push(task);
  saveTasks();
  renderTask(task);

  if (reminderTime) {
    scheduleReminder(task);
  }

  taskInput.value = '';
  reminderInput.value = '';
}

/* ---------------- RENDER TASK ---------------- */

function renderTask(task) {
  const li = document.createElement('li');
  li.className = 'task-item';
  li.dataset.id = task.id;
  li.textContent = task.text;

  if (task.completed) {
    li.classList.add('completed');
  }

  li.addEventListener('click', () => {
    task.completed = !task.completed;
    li.classList.toggle('completed');
    saveTasks();
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';

  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    tasks = tasks.filter(t => t.id !== task.id);
    li.remove();
    saveTasks();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

/* ---------------- SAVE TASKS ---------------- */

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

/* ---------------- REMINDERS ---------------- */

function scheduleReminder(task) {
  const reminderDate = new Date(task.reminderTime);
  const timeUntil = reminderDate.getTime() - Date.now();

  if (timeUntil <= 0 || task.reminded) return;

  setTimeout(() => {
    if (Notification.permission === 'granted') {
      new Notification('⏰ Task Reminder', {
        body: task.text
      });

      task.reminded = true;
      saveTasks();
    }
  }, timeUntil);
}

/* ---------------- EVENTS ---------------- */

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});
