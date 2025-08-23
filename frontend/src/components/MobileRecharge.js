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
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, Link } from 'react-router-dom';

const MobileRecharge = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    provider: '',
    mobileNumber: '',
    amount: '',
    planType: 'prepaid'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const providers = [
    { name: 'Airtel', color: '#ff0000' },
    { name: 'Jio', color: '#00a651' },
    { name: 'Vodafone', color: '#e60000' },
    { name: 'BSNL', color: '#ff6600' },
    { name: 'MTNL', color: '#ff6600' }
  ];

  const popularAmounts = [49, 99, 149, 199, 299, 499, 799, 999];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/mobile', {
        type: 'mobile_recharge',
        provider: formData.provider,
        mobileNumber: formData.mobileNumber,
        amount: Number(formData.amount)
      }, { headers: { Authorization: `Bearer ${token}` } });
      
      navigate('/dashboard');
    } catch (err) {
      console.error('Mobile recharge error:', err);
      console.log('Error response data:', err.response?.data);
      console.log('Error status:', err.response?.status);
      setError(err.response?.data?.error || 'Recharge failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
            <PhoneIcon sx={{ color: '#00c6ae' }} />
            Mobile Recharge
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
                  {/* Provider Selection */}
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#002e6e', mb: 2 }}>
                    Select Provider
                  </Typography>
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    {providers.map((provider) => (
                      <Grid item xs={6} sm={4} key={provider.name}>
                        <Card
                          sx={{
                            p: 2,
                            textAlign: 'center',
                            cursor: 'pointer',
                            border: formData.provider === provider.name ? `2px solid ${provider.color}` : '2px solid transparent',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                              transform: 'translateY(-2px)'
                            }
                          }}
                          onClick={() => setFormData({ ...formData, provider: provider.name })}
                        >
                          <Avatar sx={{ 
                            bgcolor: provider.color, 
                            width: 40, 
                            height: 40, 
                            mx: 'auto',
                            mb: 1
                          }}>
                            {provider.name[0]}
                          </Avatar>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#002e6e' }}>
                            {provider.name}
                          </Typography>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>

                  <Divider sx={{ my: 3 }} />

                  {/* Mobile Number */}
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#002e6e', mb: 2 }}>
                    Mobile Number
                  </Typography>
                  <TextField
                    fullWidth
                    label="Enter Mobile Number"
                    variant="outlined"
                    value={formData.mobileNumber}
                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                    sx={{ mb: 3 }}
                    inputProps={{ maxLength: 10 }}
                    placeholder="10-digit mobile number"
                  />

                  <Divider sx={{ my: 3 }} />

                  {/* Plan Type */}
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#002e6e', mb: 2 }}>
                    Plan Type
                  </Typography>
                  <RadioGroup
                    row
                    value={formData.planType}
                    onChange={(e) => setFormData({ ...formData, planType: e.target.value })}
                    sx={{ mb: 3 }}
                  >
                    <FormControlLabel value="prepaid" control={<Radio />} label="Prepaid" />
                    <FormControlLabel value="postpaid" control={<Radio />} label="Postpaid" />
                  </RadioGroup>

                  <Divider sx={{ my: 3 }} />

                  {/* Amount Selection */}
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#002e6e', mb: 2 }}>
                    Select Amount
                  </Typography>
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    {popularAmounts.map((amount) => (
                      <Grid item xs={6} sm={3} key={amount}>
                        <Card
                          sx={{
                            p: 2,
                            textAlign: 'center',
                            cursor: 'pointer',
                            border: formData.amount === amount.toString() ? '2px solid #00c6ae' : '2px solid transparent',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                              transform: 'translateY(-2px)'
                            }
                          }}
                          onClick={() => setFormData({ ...formData, amount: amount.toString() })}
                        >
                          <Typography variant="h6" sx={{ fontWeight: 700, color: '#00c6ae' }}>
                            ₹{amount}
                          </Typography>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>

                  {/* Custom Amount */}
                  <TextField
                    fullWidth
                    label="Or Enter Custom Amount"
                    variant="outlined"
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    sx={{ mb: 3 }}
                    InputProps={{
                      startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography>,
                    }}
                  />

                  {error && (
                    <Typography sx={{ color: 'error.main', mb: 2, textAlign: 'center', fontWeight: 500 }}>
                      {error}
                    </Typography>
                  )}

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={loading || !formData.provider || !formData.mobileNumber || !formData.amount}
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
                    {loading ? 'Processing...' : `Recharge ₹${formData.amount || '0'}`}
                  </Button>
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
                Quick Recharge
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  Recent Numbers
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Chip 
                    label="9876543210" 
                    onClick={() => setFormData({ ...formData, mobileNumber: '9876543210' })}
                    sx={{ cursor: 'pointer' }}
                  />
                  <Chip 
                    label="8765432109" 
                    onClick={() => setFormData({ ...formData, mobileNumber: '8765432109' })}
                    sx={{ cursor: 'pointer' }}
                  />
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  Popular Plans
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Chip 
                    label="₹99 - 28 Days" 
                    onClick={() => setFormData({ ...formData, amount: '99' })}
                    sx={{ cursor: 'pointer' }}
                  />
                  <Chip 
                    label="₹199 - 56 Days" 
                    onClick={() => setFormData({ ...formData, amount: '199' })}
                    sx={{ cursor: 'pointer' }}
                  />
                  <Chip 
                    label="₹499 - 84 Days" 
                    onClick={() => setFormData({ ...formData, amount: '499' })}
                    sx={{ cursor: 'pointer' }}
                  />
                </Box>
              </Box>
            </Card>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MobileRecharge;
