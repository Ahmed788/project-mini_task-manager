import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function TasksPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskTitle, setEditTaskTitle] = useState('');

  useEffect(() => {
    axios.get(`https://project-mini-task-manager-2.onrender.com/projects/${id}/tasks`)
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleAddTask = () => {
    axios.post(`https://project-mini-task-manager-2.onrender.com/projects/${id}/tasks`, { title: newTask })
      .then(res => {
        setTasks([...tasks, res.data]);
        setNewTask('');
      });
  };

  const handleDelete = (taskId) => {
    axios.delete(`https://project-mini-task-manager-2.onrender.com/tasks/${taskId}`)
      .then(() => {
        setTasks(tasks.filter(t => t.id !== taskId));
      });
  };

  const toggleComplete = (task) => {
    axios.put(`https://project-mini-task-manager-2.onrender.com/tasks/${task.id}`, {
      title: task.title,
      completed: task.completed ? 0 : 1
    }).then(() => {
      setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t));
    });
  };

  const handleEdit = (task) => {
    setEditTaskId(task.id);
    setEditTaskTitle(task.title);
  };

  const handleEditSave = (task) => {
    axios.put(`https://project-mini-task-manager-2.onrender.com/tasks/${task.id}`, {
      title: editTaskTitle,
      completed: task.completed ? 1 : 0
    }).then(() => {
      setTasks(tasks.map(t => t.id === task.id ? { ...t, title: editTaskTitle } : t));
      setEditTaskId(null);
      setEditTaskTitle('');
    });
  };


  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8ffae 0%, #43cea2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 60,
      direction: 'rtl',
      fontFamily: 'Cairo, Tahoma, Arial, sans-serif'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 4px 24px rgba(67,206,162,0.10)',
        padding: window.innerWidth < 500 ? '18px 4px' : 32,
        minWidth: 0,
        maxWidth: 420,
        width: '95vw',
        position: 'relative',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}>
        <button
          onClick={() => navigate('/projects')}
          style={{
            background: '#185a9d',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '8px 16px',
            fontSize: 14,
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: 14,
            boxShadow: '0 1px 4px rgba(67,206,162,0.08)'
          }}
        >رجوع</button>
        <h2 style={{ textAlign: 'center', color: '#43cea2', marginBottom: 18, fontSize: 22 }}>المهام</h2>
        <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexDirection: window.innerWidth < 500 ? 'column' : 'row' }}>
          <input
            type="text"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            placeholder="عنوان المهمة"
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 8,
              border: '1px solid #ccc',
              fontSize: 15,
              minWidth: 0
            }}
          />
          <button
            onClick={handleAddTask}
            style={{
              background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '8px 12px',
              fontSize: 15,
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(67,206,162,0.08)',
              minWidth: 90
            }}
          >
            إضافة مهمة
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(67,206,162,0.08)',
            borderCollapse: 'collapse',
            direction: 'rtl',
            fontSize: 15,
            minWidth: 320
          }}>
            <thead>
              <tr style={{ background: '#f8ffae' }}>
                <th style={{ padding: 10, borderBottom: '1px solid #e0e0e0' }}>تمت؟</th>
                <th style={{ padding: 10, borderBottom: '1px solid #e0e0e0' }}>عنوان المهمة</th>
                <th style={{ padding: 10, borderBottom: '1px solid #e0e0e0' }}>تعديل</th>
                <th style={{ padding: 10, borderBottom: '1px solid #e0e0e0' }}>حذف</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id}>
                  <td style={{ textAlign: 'center', padding: 8 }}>
                    <input type="checkbox" checked={!!task.completed} onChange={() => toggleComplete(task)} />
                  </td>
                  <td style={{ padding: 8, textAlign: 'right', wordBreak: 'break-word' }}>
                    {editTaskId === task.id ? (
                      <input
                        type="text"
                        value={editTaskTitle}
                        onChange={e => setEditTaskTitle(e.target.value)}
                        style={{
                          padding: 8,
                          borderRadius: 6,
                          border: '1px solid #ccc',
                          fontSize: 15,
                          width: '90%'
                        }}
                      />
                    ) : (
                      <span style={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#aaa' : '#222' }}>{task.title}</span>
                    )}
                  </td>
                  <td style={{ textAlign: 'center', padding: 8 }}>
                    {editTaskId === task.id ? (
                      <button
                        onClick={() => handleEditSave(task)}
                        style={{
                          background: '#43cea2',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 6,
                          padding: '6px 10px',
                          fontSize: 14,
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          marginLeft: 4
                        }}
                      >حفظ</button>
                    ) : (
                      <button
                        onClick={() => handleEdit(task)}
                        style={{
                          background: '#185a9d',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 6,
                          padding: '6px 10px',
                          fontSize: 14,
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          marginLeft: 4
                        }}
                      >تعديل</button>
                    )}
                  </td>
                  <td style={{ textAlign: 'center', padding: 8 }}>
                    <button
                      onClick={() => handleDelete(task.id)}
                      style={{
                        background: '#ff5252',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 6,
                        padding: '6px 10px',
                        fontSize: 14,
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >حذف</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TasksPage;
