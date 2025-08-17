import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button, Box, Typography, Grid, Avatar, Fade } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PaidIcon from '@mui/icons-material/Paid';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

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
    <Box sx={{ flexGrow: 1, background: 'linear-gradient(135deg, #e3f0ff 0%, #f5f8fa 100%)', minHeight: '100vh', p: 0 }}>
      {/* Top Navigation Bar */}
      <Box sx={{
        width: '100%',
        height: { xs: 56, sm: 64, md: 72 },
        px: { xs: 2, sm: 4 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(255,255,255,0.85)',
        boxShadow: 1,
        position: 'sticky',
        top: 0,
        zIndex: 10,
        mb: { xs: 2, md: 4 },
        backdropFilter: 'blur(8px)'
      }} role="navigation" aria-label="Main Navigation">
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main', letterSpacing: 1 }}>
          PicassoPay
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: 'secondary.main', color: 'white', fontWeight: 700 }}>{user.name[0]}</Avatar>
          <Typography variant="subtitle1" sx={{ color: 'text.primary', fontWeight: 600 }}>{user.name}</Typography>
        </Box>
      </Box>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={8}>
          <Fade in timeout={900}>
            <Card sx={{
              background: 'rgba(255,255,255,0.7)',
              boxShadow: 3,
              borderRadius: 5,
              p: 4,
              mb: 4,
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              backdropFilter: 'blur(12px)',
            }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64, boxShadow: 2 }}>
                <AccountBalanceWalletIcon sx={{ fontSize: 40 }} />
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                  Welcome, {user.name}
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                  Your Wallet Balance
                </Typography>
                <Typography variant="h3" sx={{ color: 'secondary.main', fontWeight: 700, mt: 1 }}>
                  ${user.walletBalance.toFixed(2)}
                </Typography>
              </Box>
            </Card>
          </Fade>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Fade in timeout={1200}>
                <Card sx={{ p: 3, textAlign: 'center', boxShadow: 2, borderRadius: 4, transition: '0.2s', '&:hover': { boxShadow: 6, transform: 'scale(1.04)' } }}>
                  <Link to="/add-money" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="secondary" fullWidth startIcon={<PaidIcon />}>Add Money</Button>
                  </Link>
                </Card>
              </Fade>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Fade in timeout={1400}>
                <Card sx={{ p: 3, textAlign: 'center', boxShadow: 2, borderRadius: 4, transition: '0.2s', '&:hover': { boxShadow: 6, transform: 'scale(1.04)' } }}>
                  <Link to="/pay" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="secondary" fullWidth startIcon={<AccountBalanceWalletIcon />}>Pay</Button>
                  </Link>
                </Card>
              </Fade>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Fade in timeout={1600}>
                <Card sx={{ p: 3, textAlign: 'center', boxShadow: 2, borderRadius: 4, transition: '0.2s', '&:hover': { boxShadow: 6, transform: 'scale(1.04)' } }}>
                  <Link to="/transactions" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="secondary" fullWidth startIcon={<ReceiptLongIcon />}>View Transactions</Button>
                  </Link>
                </Card>
              </Fade>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
