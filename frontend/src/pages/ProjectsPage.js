import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/projects')
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAddProject = () => {
    axios.post('http://localhost:3001/projects', { name: newProject })
      .then(res => {
        setProjects([...projects, res.data]);
        setNewProject('');
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
        padding: 32,
        minWidth: 340,
        maxWidth: 420,
        width: '100%',
        position: 'relative'
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            position: 'absolute',
            left: 24,
            top: 24,
            background: '#ff5252',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '8px 20px',
            fontSize: 15,
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 1px 4px rgba(67,206,162,0.08)'
          }}
        >تسجيل خروج</button>
        <h2 style={{ textAlign: 'center', color: '#43cea2', marginBottom: 24 }}>المشاريع</h2>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          <input
            type="text"
            value={newProject}
            onChange={(e) => setNewProject(e.target.value)}
            placeholder="اسم المشروع الجديد"
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 8,
              border: '1px solid #ccc',
              fontSize: 16
            }}
          />
          <button
            onClick={handleAddProject}
            style={{
              background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '0 20px',
              fontSize: 16,
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(67,206,162,0.08)'
            }}
          >
            إضافة مشروع
          </button>
        </div>
        {/* جدول المشاريع */}
        <table style={{
          width: '100%',
          marginTop: 32,
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(67,206,162,0.08)',
          borderCollapse: 'collapse',
          direction: 'rtl',
          fontSize: 16
        }}>
          <thead>
            <tr style={{ background: '#f8ffae' }}>
              <th style={{ padding: 12, borderBottom: '1px solid #e0e0e0' }}>اسم المشروع</th>
              <th style={{ padding: 12, borderBottom: '1px solid #e0e0e0' }}>تصفح المهام</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(proj => (
              <tr key={proj.id}>
                <td style={{ padding: 10, borderBottom: '1px solid #f0f0f0', textAlign: 'right' }}>{proj.name}</td>
                <td style={{ padding: 10, borderBottom: '1px solid #f0f0f0', textAlign: 'center' }}>
                  <button
                    onClick={() => navigate(`/projects/${proj.id}`)}
                    style={{
                      background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '6px 18px',
                      fontSize: 15,
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      boxShadow: '0 1px 4px rgba(67,206,162,0.08)'
                    }}
                  >
                    تصفح المهام
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectsPage;
