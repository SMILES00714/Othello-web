import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions/auth.action';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = await dispatch(login(name, password));
      navigate(url);
    } catch (error) {
      console.error('Login error:', error);
      // Handle error, display error message to user
    }
  };

  return (
    <form onSubmit={handleSubmit} className='login'>
      <div>
        <label>Username:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
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
