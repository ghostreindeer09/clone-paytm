import React, { useState } from 'react';
import axios from 'axios';
import { Card, TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddMoney = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/wallet/add', { amount: Number(amount) }, { headers: { Authorization: `Bearer ${token}` } });
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
          Add Money
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField type="number" label="Amount" fullWidth sx={{ mb: 3 }} onChange={(e) => setAmount(e.target.value)} />
          <Button type="submit" variant="contained" color="secondary" fullWidth size="large">Add Money</Button>
        </form>
      </Card>
    </Box>
  );
};

export default AddMoney;
