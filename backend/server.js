const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'tasks.json');

app.use(cors());
app.use(express.json());

// Read tasks
app.get('/tasks', (req, res) => {
  console.log("📥 GET /tasks request received");
  const data = fs.readFileSync(DATA_FILE);
  res.json(JSON.parse(data));
});

// Add task
app.post('/tasks', (req, res) => {
  console.log("➕ POST /tasks body received:", req.body);
  const tasks = JSON.parse(fs.readFileSync(DATA_FILE));

  if (req.body && req.body.name) {
    tasks.push(req.body.name);
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
    console.log("✅ Task added:", req.body.name);
    res.status(201).json({ message: 'Task added' });
  } else {
    console.warn("⚠️ Invalid task format");
    res.status(400).json({ message: 'Invalid task format' });
  }
});

// Delete task
app.delete('/tasks/:id', (req, res) => {
  console.log(`🗑 DELETE /tasks/${req.params.id} request received`);
  let tasks = JSON.parse(fs.readFileSync(DATA_FILE));
  tasks = tasks.filter((t, i) => i != req.params.id);
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
  res.json({ message: 'Task deleted' });
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
