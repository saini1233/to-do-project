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
  const data = fs.readFileSync(DATA_FILE);
  res.json(JSON.parse(data));
});

// Add task
app.post('/tasks', (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(DATA_FILE));
  tasks.push(req.body);
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
  res.status(201).json({ message: 'Task added' });
});

// Delete task
app.delete('/tasks/:id', (req, res) => {
  let tasks = JSON.parse(fs.readFileSync(DATA_FILE));
  tasks = tasks.filter((t, i) => i != req.params.id);
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
  res.json({ message: 'Task deleted' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
