import React, { useState } from 'react';
import axios from 'axios';
import { 
  Card, 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Grid, 
  Fade,
  Container,
  Avatar,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Alert
} from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import WaterIcon from '@mui/icons-material/Water';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import WifiIcon from '@mui/icons-material/Wifi';
import { useNavigate, Link } from 'react-router-dom';

const BillPayment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: '',
    provider: '',
    accountNumber: '',
    amount: '',
    dueDate: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const billCategories = [
    { 
      name: 'electricity', 
      label: 'Electricity Bill', 
      icon: <LightbulbIcon />, 
      color: '#ff9800',
      providers: ['MSEB', 'Tata Power', 'BEST', 'Adani Electricity']
    },
    { 
      name: 'water', 
      label: 'Water Bill', 
      icon: <WaterIcon />, 
      color: '#2196f3',
      providers: ['Municipal Corporation', 'BMC', 'Delhi Jal Board']
    },
    { 
      name: 'gas', 
      label: 'Gas Bill', 
      icon: <LocalGasStationIcon />, 
      color: '#f44336',
      providers: ['HP Gas', 'Indane Gas', 'Bharat Gas']
    },
    { 
      name: 'internet', 
      label: 'Internet Bill', 
      icon: <WifiIcon />, 
      color: '#9c27b0',
      providers: ['Airtel', 'Jio Fiber', 'BSNL', 'MTNL']
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      // Step 1: Create the bill entry
      const createRes = await axios.post('/api/bills', {
        category: formData.category,
        provider: formData.provider,
        accountNumber: formData.accountNumber,
        amount: Number(formData.amount),
        dueDate: formData.dueDate
      }, { headers: { Authorization: `Bearer ${token}` } });

      // Step 2: Pay the created bill
      const billId = createRes.data._id;
      await axios.post(`/api/bills/${billId}/pay`, {}, { headers: { Authorization: `Bearer ${token}` } });
      
      navigate('/dashboard');
    } catch (err) {
      // Enhanced error logging
      console.error('Bill payment error:', err);
      console.log('Error response data:', err.response?.data);
      console.log('Error status:', err.response?.status);
      console.log('Full error object:', JSON.stringify(err, Object.getOwnPropertyNames(err)));
      
      // More specific error messages
      if (err.response?.data?.error) {
        setError(`Bill payment failed: ${err.response.data.error}`);
      } else if (err.response?.status === 401) {
        setError('Authentication error. Please log in again.');
      } else if (err.response?.status === 400) {
        setError('Invalid bill information. Please check your details and try again.');
      } else if (err.response?.status === 404) {
        setError('Bill not found. Please try again.');
      } else if (err.message === 'Network Error') {
        setError('Network error. Please check your internet connection.');
      } else {
        setError('Bill payment failed. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const selectedCategory = billCategories.find(cat => cat.name === formData.category);

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e3f0ff 0%, #f5f8fa 100%)',
      p: { xs: 1, sm: 2 }
    }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <Button startIcon={<ArrowBackIcon />} sx={{ color: '#002e6e' }}>
              Back
            </Button>
          </Link>
          <Typography variant="h4" sx={{ 
            fontWeight: 700, 
            color: '#002e6e', 
            ml: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <ReceiptIcon sx={{ color: '#00c6ae' }} />
            Bill Payments
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Main Form */}
          <Grid item xs={12} md={8}>
            <Fade in timeout={900}>
              <Card sx={{
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(16px)',
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                p: 4,
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <form onSubmit={handleSubmit}>
                  {/* Bill Category Selection */}
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#002e6e', mb: 2 }}>
                    Select Bill Type
                  </Typography>
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    {billCategories.map((category) => (
                      <Grid item xs={6} sm={3} key={category.name}>
                        <Card
                          sx={{
                            p: 2,
                            textAlign: 'center',
                            cursor: 'pointer',
                            border: formData.category === category.name ? `2px solid ${category.color}` : '2px solid transparent',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                              transform: 'translateY(-2px)'
                            }
                          }}
                          onClick={() => setFormData({ ...formData, category: category.name, provider: '' })}
                        >
                          <Avatar sx={{ 
                            bgcolor: category.color, 
                            width: 40, 
                            height: 40, 
                            mx: 'auto',
                            mb: 1
                          }}>
                            {category.icon}
                          </Avatar>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#002e6e', fontSize: '0.75rem' }}>
                            {category.label}
                          </Typography>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>

                  {formData.category && (
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
                          {selectedCategory?.providers.map((provider) => (
                            <MenuItem key={provider} value={provider}>
                              {provider}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <Divider sx={{ my: 3 }} />

                      {/* Account Number */}
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#002e6e', mb: 2 }}>
                        Account Details
                      </Typography>
                      <TextField
                        fullWidth
                        label="Account Number"
                        variant="outlined"
                        value={formData.accountNumber}
                        onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                        sx={{ mb: 3 }}
                        placeholder="Enter your account number"
                      />

                      <Divider sx={{ my: 3 }} />

                      {/* Amount and Due Date */}
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#002e6e', mb: 2 }}>
                        Payment Details
                      </Typography>
                      <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Amount"
                            variant="outlined"
                            type="number"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            InputProps={{
                              startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography>,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Due Date"
                            variant="outlined"
                            type="date"
                            value={formData.dueDate}
                            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                      </Grid>

                      {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                          {error}
                        </Alert>
                      )}

                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        disabled={loading || !formData.provider || !formData.accountNumber || !formData.amount}
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
                        {loading ? 'Processing...' : `Pay ₹${formData.amount || '0'}`}
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
                  Quick Bill Pay
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    Recent Bills
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Chip 
                      label="MSEB - 123456789" 
                      onClick={() => setFormData({ 
                        ...formData, 
                        category: 'electricity',
                        provider: 'MSEB',
                        accountNumber: '123456789'
                      })}
                      sx={{ cursor: 'pointer' }}
                    />
                    <Chip 
                      label="BMC Water - 987654321" 
                      onClick={() => setFormData({ 
                        ...formData, 
                        category: 'water',
                        provider: 'BMC',
                        accountNumber: '987654321'
                      })}
                      sx={{ cursor: 'pointer' }}
                    />
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    Due Soon
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Chip 
                      label="Electricity - ₹1,200" 
                      color="warning"
                      variant="outlined"
                    />
                    <Chip 
                      label="Water - ₹450" 
                      color="warning"
                      variant="outlined"
                    />
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Alert severity="info" sx={{ fontSize: '0.875rem' }}>
                  Pay bills on time to avoid late fees and service disconnection.
                </Alert>
              </Card>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default BillPayment;
