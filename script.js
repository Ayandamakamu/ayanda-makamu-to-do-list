function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const li = document.createElement('li');
  li.className = 'task-item';
  li.textContent = taskText;

   li.addEventListener('click', () => {
    li.classList.toggle('completed');
  });

    const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // prevents toggling completed when deleting
    taskList.removeChild(li);
  });

   li.appendChild(deleteBtn);
  taskList.appendChild(li);

   taskInput.value = '';
}

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});