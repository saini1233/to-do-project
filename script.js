let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task;
    
    const delBtn = document.createElement('button');
    delBtn.textContent = '❌';
    delBtn.onclick = () => deleteTask(index);
    
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById('taskInput');
  const task = input.value.trim();
  if (task) {
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    input.value = '';
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

renderTasks(); // Load tasks on page load
