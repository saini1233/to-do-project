const API_URL = 'http://13.203.219.195:3000/tasks';

// Fetch tasks
async function fetchTasks() {
  console.log("📡 Fetching tasks from:", API_URL);
  try {
    const res = await fetch(API_URL);
    console.log("✅ GET /tasks status:", res.status);
    const tasks = await res.json();
    console.log("📦 Tasks received:", tasks);
    renderTasks(tasks);
  } catch (err) {
    console.error("❌ Error fetching tasks:", err);
  }
}

// Add task
async function addTask() {
  const input = document.getElementById('taskInput');
  const task = input.value.trim();
  if (!task) {
    console.warn("⚠️ Empty task not added");
    return;
  }

  console.log("➕ Adding task:", task);
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: task }) // object format
    });
    console.log("✅ POST /tasks status:", res.status);
    input.value = '';
    fetchTasks();
  } catch (err) {
    console.error("❌ Error adding task:", err);
  }
}

// Delete task
async function deleteTask(index) {
  console.log(`🗑 Deleting task at index: ${index}`);
  try {
    const res = await fetch(`${API_URL}/${index}`, { method: 'DELETE' });
    console.log("✅ DELETE /tasks status:", res.status);
    fetchTasks();
  } catch (err) {
    console.error("❌ Error deleting task:", err);
  }
}

// Render tasks
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

// Initial fetch
fetchTasks();
