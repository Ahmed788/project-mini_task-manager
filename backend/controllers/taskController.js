const db = require('../db/database');

exports.updateTask = (req, res) => {
  const taskId = req.params.id;
  const { title, completed } = req.body;
  db.run('UPDATE tasks SET title = ?, completed = ? WHERE id = ?', [title, completed, taskId], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
};

exports.deleteTask = (req, res) => {
  const taskId = req.params.id;
  db.run('DELETE FROM tasks WHERE id = ?', [taskId], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
};
