const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.sqlite'); // حفظ البيانات في ملف فعلي

// إنشاء الجداول
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER,
    title TEXT NOT NULL,
    completed BOOLEAN DEFAULT 0,
    FOREIGN KEY(project_id) REFERENCES projects(id)
  )`);
});

module.exports = db;
