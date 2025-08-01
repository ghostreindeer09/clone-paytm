import React, { useState } from 'react';
import axios from 'axios';
import { Card, TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, #05478a 0%, #048cfc 100%)`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      p: 4,
    }}>
      <Card sx={{ width: 400, p: 4, backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', borderRadius: 2 }}>
        <Typography variant="h4" component="h2" sx={{ color: 'primary.main', mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Email" fullWidth sx={{ mb: 2 }} onChange={(e) => setEmail(e.target.value)} />
          <TextField type="password" label="Password" fullWidth sx={{ mb: 3 }} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" variant="contained" color="secondary" fullWidth size="large">Login</Button>
          <Typography sx={{ mt: 2, textAlign: 'center', color: 'text.secondary' }}>
            Don't have an account? <Link to="/register" style={{ color: '#048cfc', fontWeight: 'bold' }}>Register</Link>
          </Typography>
        </form>
      </Card>
    </Box>
  );
};

export default Login;
