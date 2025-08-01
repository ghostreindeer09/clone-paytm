import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button, Box, Typography, Grid } from '@mui/material';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/user/profile', { headers: { Authorization: `Bearer ${token}` } });
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: 'background.default', minHeight: '100vh', p: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card sx={{ backgroundColor: 'primary.main', color: 'white', p: 3 }}>
            <Typography variant="h4">Welcome, {user.name}</Typography>
            <Typography variant="h6">Balance: ${user.walletBalance.toFixed(2)}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 2 }}>
            <Link to="/add-money" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="secondary" fullWidth>Add Money</Button>
            </Link>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 2 }}>
            <Link to="/pay" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="secondary" fullWidth>Pay</Button>
            </Link>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 2 }}>
            <Link to="/transactions" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="secondary" fullWidth>View Transactions</Button>
            </Link>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
