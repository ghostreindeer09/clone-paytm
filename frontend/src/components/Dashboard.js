import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { 
  Card, 
  Button, 
  Box, 
  Typography, 
  Grid, 
  Avatar, 
  Fade,
  Container,
  Paper,
  Divider,
  IconButton,
  Chip
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PaidIcon from '@mui/icons-material/Paid';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PhoneIcon from '@mui/icons-material/Phone';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MovieIcon from '@mui/icons-material/Movie';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ComputerIcon from '@mui/icons-material/Computer';
import BuildIcon from '@mui/icons-material/Build';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DownloadIcon from '@mui/icons-material/Download';
import PersonIcon from '@mui/icons-material/Person';

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

  const serviceCategories = [
    {
      title: 'Recharges',
      items: [
        { name: 'Mobile Recharge', icon: <PhoneIcon />, path: '/mobile-recharge', color: '#00c6ae' },
        { name: 'DTH Recharge', icon: <MovieIcon />, path: '/dth-recharge', color: '#ff6b35' },
        { name: 'FASTag Recharge', icon: <AccountBalanceIcon />, path: '/fastag-recharge', color: '#4caf50' }
      ]
    },
    {
      title: 'Bill Payments',
      items: [
        { name: 'Electricity Bill', icon: <ReceiptIcon />, path: '/electricity-bill', color: '#ff9800' },
        { name: 'Water Bill', icon: <ReceiptIcon />, path: '/water-bill', color: '#2196f3' },
        { name: 'Gas Bill', icon: <ReceiptIcon />, path: '/gas-bill', color: '#f44336' },
        { name: 'Internet Bill', icon: <ComputerIcon />, path: '/internet-bill', color: '#9c27b0' }
      ]
    },
    {
      title: 'Shopping & Food',
      items: [
        { name: 'Online Shopping', icon: <ShoppingCartIcon />, path: '/online-shopping', color: '#e91e63' },
        { name: 'Food Delivery', icon: <ShoppingCartIcon />, path: '/food-delivery', color: '#ff5722' },
        { name: 'Grocery Delivery', icon: <ShoppingCartIcon />, path: '/grocery-delivery', color: '#4caf50' }
      ]
    },
    {
      title: 'Entertainment',
      items: [
        { name: 'Movie Tickets', icon: <MovieIcon />, path: '/movie-tickets', color: '#9c27b0' },
        { name: 'Event Tickets', icon: <MovieIcon />, path: '/event-tickets', color: '#ff9800' },
        { name: 'Travel Booking', icon: <MovieIcon />, path: '/travel-booking', color: '#2196f3' }
      ]
    },
    {
      title: 'Financial Services',
      items: [
        { name: 'Insurance', icon: <AccountBalanceIcon />, path: '/insurance', color: '#4caf50' },
        { name: 'Loan EMI', icon: <AccountBalanceIcon />, path: '/loan-emi', color: '#ff9800' },
        { name: 'Mutual Funds', icon: <AccountBalanceIcon />, path: '/mutual-funds', color: '#2196f3' }
      ]
    },
    {
      title: 'Digital Services',
      items: [
        { name: 'Gift Cards', icon: <LocalOfferIcon />, path: '/gift-cards', color: '#e91e63' },
        { name: 'Gaming', icon: <ComputerIcon />, path: '/gaming', color: '#9c27b0' },
        { name: 'Education', icon: <ComputerIcon />, path: '/education', color: '#4caf50' }
      ]
    }
  ];

  if (!user) return <div>Loading...</div>;

  return (
    <Box sx={{ flexGrow: 1, background: 'linear-gradient(135deg, #e3f0ff 0%, #f5f8fa 100%)', minHeight: '100vh', p: 0 }}>
      {/* Top Navigation Bar - Paytm Style */}
      <Box sx={{
        width: '100%',
        height: { xs: 56, sm: 64, md: 72 },
        px: { xs: 2, sm: 4 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(255,255,255,0.95)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        mb: { xs: 2, md: 4 },
        backdropFilter: 'blur(8px)'
      }} role="navigation" aria-label="Main Navigation">
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#002e6e', letterSpacing: 1 }}>
          PicassoPay
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<DownloadIcon />}
            sx={{ color: '#002e6e', borderColor: '#002e6e' }}
          >
            Download App
          </Button>
          <Avatar sx={{ bgcolor: '#00c6ae', color: 'white', fontWeight: 700 }}>{user.name[0]}</Avatar>
          <Typography variant="subtitle1" sx={{ color: 'text.primary', fontWeight: 600 }}>{user.name}</Typography>
        </Box>
      </Box>

      <Container maxWidth="lg">
        {/* Wallet Balance Card */}
        <Grid container spacing={4} justifyContent="center" sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Fade in timeout={900}>
            <Card sx={{
                background: 'rgba(255,255,255,0.9)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                borderRadius: 3,
                p: 4,
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.2)'
            }}>
                <Avatar sx={{ bgcolor: '#00c6ae', width: 64, height: 64, boxShadow: 2 }}>
                <AccountBalanceWalletIcon sx={{ fontSize: 40 }} />
              </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#002e6e', mb: 1 }}>
                  Welcome, {user.name}
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                  Your Wallet Balance
                </Typography>
                  <Typography variant="h3" sx={{ color: '#00c6ae', fontWeight: 700, mt: 1 }}>
                    ₹{user.walletBalance.toFixed(2)}
                </Typography>
              </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Link to="/add-money" style={{ textDecoration: 'none' }}>
                    <Button 
                      variant="contained" 
                      size="small"
                      sx={{ 
                        bgcolor: '#00c6ae', 
                        color: 'white',
                        '&:hover': { bgcolor: '#00a896' }
                      }}
                    >
                      Add Money
                    </Button>
                  </Link>
                  <Link to="/transactions" style={{ textDecoration: 'none' }}>
                    <Button 
                      variant="outlined" 
                      size="small"
                      sx={{ 
                        borderColor: '#002e6e', 
                        color: '#002e6e',
                        '&:hover': { borderColor: '#001a4a', bgcolor: 'rgba(0,46,110,0.04)' }
                      }}
                    >
                      View History
                    </Button>
                  </Link>
                </Box>
                </Card>
              </Fade>
            </Grid>
        </Grid>

        {/* Service Categories */}
        {serviceCategories.map((category, categoryIndex) => (
          <Box key={category.title} sx={{ mb: 4 }}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700, 
                color: '#002e6e', 
                mb: 2, 
                display: 'flex', 
                alignItems: 'center',
                gap: 1
              }}
            >
              {category.title}
            </Typography>
            <Grid container spacing={2}>
              {category.items.map((item, itemIndex) => (
                <Grid item xs={6} sm={4} md={3} key={item.name}>
                  <Fade in timeout={900 + (categoryIndex * 100) + (itemIndex * 50)}>
                    <Card sx={{
                      p: 2,
                      textAlign: 'center',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      background: 'rgba(255,255,255,0.9)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      '&:hover': {
                        boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                        transform: 'translateY(-4px)',
                        background: 'rgba(255,255,255,0.95)'
                      }
                    }}>
                      <Link to={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Box sx={{ 
                          width: 48, 
                          height: 48, 
                          borderRadius: '50%', 
                          background: item.color,
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 1,
                          boxShadow: `0 4px 12px ${item.color}40`
                        }}>
                          {React.cloneElement(item.icon, { sx: { color: 'white', fontSize: 24 } })}
                        </Box>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: 600, 
                            color: '#002e6e',
                            fontSize: '0.875rem'
                          }}
                        >
                          {item.name}
                        </Typography>
                  </Link>
                </Card>
              </Fade>
            </Grid>
              ))}
            </Grid>
          </Box>
        ))}

        {/* Promotional Banner */}
        <Fade in timeout={2000}>
          <Card sx={{
            background: 'linear-gradient(135deg, #00c6ae 0%, #00a896 100%)',
            color: 'white',
            p: 3,
            borderRadius: 3,
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(0,198,174,0.3)',
            mb: 4
          }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              🎉 Special Offer!
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Get ₹100 cashback on your first mobile recharge. Use code: WELCOME100
            </Typography>
            <Button 
              variant="contained" 
              sx={{ 
                bgcolor: 'white', 
                color: '#00c6ae',
                fontWeight: 700,
                '&:hover': { bgcolor: '#f5f5f5' }
              }}
            >
              Recharge Now →
            </Button>
                </Card>
              </Fade>
      </Container>
    </Box>
  );
};

export default Dashboard;
