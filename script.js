const API_URL = 'http://YOUR_EC2_PUBLIC_IP:3000/tasks';

async function fetchTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();
  renderTasks(tasks);
}

async function addTask() {
  const input = document.getElementById('taskInput');
  const task = input.value.trim();
  if (!task) return;
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });
  input.value = '';
  fetchTasks();
}

async function deleteTask(index) {
  await fetch(`${API_URL}/${index}`, { method: 'DELETE' });
  fetchTasks();
}

function renderTasks(tasks) {
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

fetchTasks();
