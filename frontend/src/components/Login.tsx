import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });
      console.log('Login successful:', response.data);
      sessionStorage.setItem('token', response.data.token);
      localStorage.setItem('users', JSON.stringify(response.data.users));
      navigate('/dash')
    } catch (error) {
      console.error('Login error:', error);
      // Handle error, display error message to user
    }
  };

  return (
    <form onSubmit={handleSubmit} className='login'>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
