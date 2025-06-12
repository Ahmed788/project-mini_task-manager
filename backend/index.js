const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const projectRoutes = require('./routes/projects');
const taskRoutes = require('./routes/tasks');

app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('API is running. Use /projects, /projects/:id/tasks ...');
});

