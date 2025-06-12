const db = require('../db/database');

exports.getAllProjects = (req, res) => {
  db.all('SELECT * FROM projects', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.createProject = (req, res) => {
  const { name } = req.body;
  db.run('INSERT INTO projects (name) VALUES (?)', [name], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, name });
  });
};

exports.getProjectTasks = (req, res) => {
  const projectId = req.params.id;
  db.all('SELECT * FROM tasks WHERE project_id = ?', [projectId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.addTaskToProject = (req, res) => {
  const projectId = req.params.id;
  const { title } = req.body;
  db.run('INSERT INTO tasks (project_id, title) VALUES (?, ?)', [projectId, title], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, project_id: projectId, title });
  });
};
