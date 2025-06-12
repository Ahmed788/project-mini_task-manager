import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // تسجيل دخول وهمي فقط
    navigate('/projects');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)'
    }}>
      <form onSubmit={handleLogin} style={{
        background: '#fff',
        padding: 32,
        borderRadius: 16,
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        minWidth: 320,
        display: 'flex',
        flexDirection: 'column',
        gap: 16
      }}>
        <h2 style={{ textAlign: 'center', color: '#5f2c82', marginBottom: 8 }}>تسجيل الدخول</h2>
        <input
          type="text"
          placeholder="اسم المستخدم"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 8,
            border: '1px solid #ccc',
            fontSize: 16
          }}
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 8,
            border: '1px solid #ccc',
            fontSize: 16
          }}
        />
        <button type="submit" style={{
          background: 'linear-gradient(90deg, #5f2c82 0%, #49a09d 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: 12,
          fontSize: 18,
          fontWeight: 'bold',
          cursor: 'pointer',
          marginTop: 8,
          boxShadow: '0 2px 8px rgba(95,44,130,0.08)'
        }}>دخول</button>
      </form>
    </div>
  );
}

export default LoginPage;
