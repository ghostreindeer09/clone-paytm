import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box, Card, Typography, Grid, Button, FormControl, InputLabel,
  Select, MenuItem, TextField, Divider, Chip, Avatar, Fade
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SchoolIcon from '@mui/icons-material/School';

const Digital = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    type: '',
    provider: '',
    accountId: '',
    amount: ''
  });

  // Define digital types with their icons and colors
  const digitalTypes = [
    { name: 'gaming_topup', label: 'Gaming', icon: <SportsEsportsIcon />, color: '#9c27b0' },
    { name: 'streaming_subscription', label: 'Gift Cards', icon: <CardGiftcardIcon />, color: '#e91e63' },
    { name: 'app_purchase', label: 'Education', icon: <SchoolIcon />, color: '#4caf50' }
  ];

  // Get the selected type object
  const selectedType = digitalTypes.find(type => type.name === formData.type);

  // Define providers for each type
  const providers = {
    gaming_topup: ['Steam', 'PlayStation', 'Xbox', 'PUBG Mobile', 'Fortnite'],
    streaming_subscription: ['Amazon', 'Flipkart', 'Myntra', 'BookMyShow', 'Uber'],
    app_purchase: ['Coursera', 'Udemy', 'Byju\'s', 'Unacademy', 'Khan Academy']
  };

  // Set initial type based on path
  React.useEffect(() => {
    if (location.pathname === '/gaming') {
      setFormData(prev => ({ ...prev, type: 'gaming_topup' }));
    } else if (location.pathname === '/gift-cards') {
      setFormData(prev => ({ ...prev, type: 'streaming_subscription' }));
    } else if (location.pathname === '/education') {
      setFormData(prev => ({ ...prev, type: 'app_purchase' }));
    }
  }, [location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/digital', {
        ...formData,
        amount: Number(formData.amount)
      }, { headers: { Authorization: `Bearer ${token}` } });
      
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || err.response?.data?.error || 'Purchase failed. Please try again.');
      console.error('Digital purchase error:', err);
      console.log('Error response data:', err.response?.data);
      console.log('Error status:', err.response?.status);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, background: 'linear-gradient(135deg, #e3f0ff 0%, #f5f8fa 100%)', minHeight: '100vh', p: 3 }}>
      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Fade in timeout={800}>
            <Card sx={{
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(16px)',
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              p: 3,
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Button
                  startIcon={<ArrowBackIcon />}
                  onClick={() => navigate('/dashboard')}
                  sx={{ mr: 2 }}
                >
                  Back
                </Button>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#002e6e' }}>
                  Digital Services
                </Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                {/* Digital Type Selection */}
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#002e6e', mb: 2 }}>
                  Select Service Type
                </Typography>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  {digitalTypes.map((type) => (
                    <Grid item xs={12} sm={4} key={type.name}>
                      <Card
                        sx={{
                          p: 2,
                          textAlign: 'center',
                          cursor: 'pointer',
                          border: formData.type === type.name ? `2px solid ${type.color}` : '2px solid transparent',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                            transform: 'translateY(-2px)'
                          }
                        }}
                        onClick={() => setFormData({ ...formData, type: type.name, provider: '' })}
                      >
                        <Avatar sx={{ 
                          bgcolor: type.color, 
                          width: 48, 
                          height: 48, 
                          mx: 'auto',
                          mb: 1
                        }}>
                          {type.icon}
                        </Avatar>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: '#002e6e' }}>
                          {type.label}
                        </Typography>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                {formData.type && (
                  <>
                    <Divider sx={{ my: 3 }} />

                    {/* Provider Selection */}
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#002e6e', mb: 2 }}>
                      Select Provider
                    </Typography>
                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <InputLabel>Provider</InputLabel>
                      <Select
                        value={formData.provider}
                        label="Provider"
                        onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                      >
                        {providers[formData.type]?.map((provider) => (
                          <MenuItem key={provider} value={provider}>
                            {provider}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <Divider sx={{ my: 3 }} />

                    {/* Purchase Details */}
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#002e6e', mb: 2 }}>
                      Purchase Details
                    </Typography>
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Account ID / Email"
                          value={formData.accountId}
                          onChange={(e) => setFormData({ ...formData, accountId: e.target.value })}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Amount"
                          type="number"
                          value={formData.amount}
                          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                          required
                        />
                      </Grid>
                    </Grid>

                    {error && (
                      <Typography color="error" sx={{ mt: 2, mb: 2 }}>
                        {error}
                      </Typography>
                    )}

                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      size="large"
                      disabled={loading || !formData.provider || !formData.accountId || !formData.amount}
                      sx={{
                        bgcolor: '#00c6ae',
                        color: 'white',
                        py: 1.5,
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        boxShadow: 2,
                        transition: '0.2s',
                        '&:hover': {
                          bgcolor: '#00a896',
                          boxShadow: 6,
                          transform: 'scale(1.02)'
                        },
                        '&:disabled': {
                          bgcolor: '#ccc'
                        }
                      }}
                    >
                      {loading ? 'Processing...' : `Purchase - ₹${formData.amount || '0'}`}
                    </Button>
                  </>
                )}
              </form>
            </Card>
          </Fade>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Fade in timeout={1200}>
            <Card sx={{
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(16px)',
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              p: 3,
              border: '1px solid rgba(255,255,255,0.2)',
              height: 'fit-content'
            }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#002e6e', mb: 2 }}>
                Recent Purchases
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Chip 
                    label="Steam Wallet - ₹1,000" 
                    onClick={() => setFormData({ 
                      ...formData, 
                      type: 'gaming_topup',
                      provider: 'Steam',
                      amount: '1000'
                    })}
                    sx={{ cursor: 'pointer' }}
                  />
                  <Chip 
                    label="Amazon Gift Card - ₹500" 
                    onClick={() => setFormData({ 
                      ...formData, 
                      type: 'streaming_subscription',
                      provider: 'Amazon',
                      amount: '500'
                    })}
                    sx={{ cursor: 'pointer' }}
                  />
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#002e6e', mb: 2 }}>
                  Offers Available
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  • 10% cashback on Gaming top-ups
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  • Buy 1 Get 1 on selected Gift Cards
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  • Extra 5% off on Education subscriptions
                </Typography>
              </Box>
            </Card>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Digital;