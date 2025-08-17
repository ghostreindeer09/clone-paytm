import React, { useState } from 'react';
import axios from 'axios';
import { Card, TextField, Button, Box, Typography, InputAdornment, IconButton, Fade } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e3f0ff 0%, #f5f8fa 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      p: { xs: 1, sm: 4 },
    }}>
      <Fade in timeout={900}>
        <Card sx={{ width: { xs: '100%', sm: 400 }, p: { xs: 2, sm: 4 }, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', borderRadius: 4, boxShadow: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <Box sx={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, #0052cc 0%, #00c6ae 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
              <LockIcon sx={{ color: 'white', fontSize: 32 }} />
            </Box>
            <Typography variant="h4" component="h2" sx={{ color: 'primary.main', mb: 1, textAlign: 'center', fontWeight: 'bold', letterSpacing: 1 }}>
              PicassoPay
            </Typography>
          </Box>
          <form onSubmit={handleSubmit} aria-label="Login form">
            <TextField
              label="Email"
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="primary" />
                  </InputAdornment>
                ),
                inputProps: { 'aria-label': 'Email' },
              }}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              variant="outlined"
            />
            <TextField
              type={showPassword ? 'text' : 'password'}
              label="Password"
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((show) => !show)} edge="end" aria-label="Toggle password visibility">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                inputProps: { 'aria-label': 'Password' },
              }}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              variant="outlined"
            />
            {error && (
              <Typography sx={{ color: 'error.main', mb: 1, textAlign: 'center', fontWeight: 500 }}>{error}</Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              size="large"
              sx={{ mt: 1, py: 1.5, fontWeight: 700, fontSize: '1.1rem', boxShadow: 2, transition: '0.2s', '&:hover': { boxShadow: 6, transform: 'scale(1.03)' } }}
            >
              Login
            </Button>
            <Typography sx={{ mt: 2, textAlign: 'center', color: 'text.secondary' }}>
              Don't have an account? <Link to="/register" style={{ color: '#00c6ae', fontWeight: 'bold' }}>Register</Link>
            </Typography>
          </form>
        </Card>
      </Fade>
    </Box>
  );
};

export default Login;
