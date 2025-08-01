import React, { useState } from 'react';
import axios from 'axios';
import { Card, TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', { name, email, password });
      navigate('/login');
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
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Name" fullWidth sx={{ mb: 2 }} onChange={(e) => setName(e.target.value)} />
          <TextField label="Email" fullWidth sx={{ mb: 2 }} onChange={(e) => setEmail(e.target.value)} />
          <TextField type="password" label="Password" fullWidth sx={{ mb: 3 }} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" variant="contained" color="secondary" fullWidth size="large">Register</Button>
        </form>
      </Card>
    </Box>
  );
};

export default Register;
