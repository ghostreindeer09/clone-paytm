import React, { useState } from 'react';
import axios from 'axios';
import { Card, TextField, Button, Box, Typography, InputAdornment, Fade } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const AddMoney = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/wallet/add', { amount: Number(amount) }, { headers: { Authorization: `Bearer ${token}` } });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to add money. Please try again.');
      console.error('Add money error:', err);
      console.log('Error response data:', err.response?.data);
      console.log('Error status:', err.response?.status);
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
              <AccountBalanceWalletIcon sx={{ color: 'white', fontSize: 32 }} />
            </Box>
            <Typography variant="h4" component="h2" sx={{ color: 'primary.main', mb: 1, textAlign: 'center', fontWeight: 'bold', letterSpacing: 1 }}>
              Add Money
            </Typography>
          </Box>
          <form onSubmit={handleSubmit} aria-label="Add Money form">
            <TextField
              type="number"
              label="Amount"
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    $
                  </InputAdornment>
                ),
                inputProps: { 'aria-label': 'Amount', min: 0 },
              }}
              onChange={(e) => setAmount(e.target.value)}
              autoComplete="off"
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
              Add Money
            </Button>
          </form>
        </Card>
      </Fade>
    </Box>
  );
};

export default AddMoney;
