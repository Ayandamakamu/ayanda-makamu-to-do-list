function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const li = document.createElement('li');
  li.className = 'task-item';
  li.textContent = taskText;

   li.addEventListener('click', () => {
    li.classList.toggle('completed');
  });