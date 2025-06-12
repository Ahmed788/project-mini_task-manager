const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const projectRoutes = require('./routes/projects');
const taskRoutes = require('./routes/tasks');

app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('API is running. Use /projects, /projects/:id/tasks ...');
});

