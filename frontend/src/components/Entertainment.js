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
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventIcon from '@mui/icons-material/Event';
import FlightIcon from '@mui/icons-material/Flight';
import { useNavigate, Link } from 'react-router-dom';

const Entertainment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: '',
    provider: '',
    title: '',
    date: '',
    time: '',
    seats: '',
    amount: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const entertainmentTypes = [
    { 
      name: 'movie_tickets', 
      label: 'Movie Tickets', 
      icon: <MovieIcon />, 
      color: '#9c27b0',
      providers: ['PVR', 'INOX', 'Cinepolis', 'BookMyShow']
    },
    { 
      name: 'event_tickets', 
      label: 'Event Tickets', 
      icon: <EventIcon />, 
      color: '#ff9800',
      providers: ['BookMyShow', 'Insider', 'TicketNew', 'EventsHigh']
    },
    { 
      name: 'travel_booking', 
      label: 'Travel Booking', 
      icon: <FlightIcon />, 
      color: '#2196f3',
      providers: ['IRCTC', 'MakeMyTrip', 'Goibibo', 'Yatra']
    }
  ];

  const popularItems = {
    movie_tickets: [
      { title: 'Avengers: Endgame', provider: 'PVR', price: 300, date: '2024-01-15' },
      { title: 'Spider-Man: No Way Home', provider: 'INOX', price: 250, date: '2024-01-16' },
      { title: 'Black Panther', provider: 'Cinepolis', price: 280, date: '2024-01-17' }
    ],
    event_tickets: [
      { title: 'Sunburn Festival', provider: 'BookMyShow', price: 2000, date: '2024-01-20' },
      { title: 'Comedy Night', provider: 'Insider', price: 500, date: '2024-01-18' },
      { title: 'Rock Concert', provider: 'TicketNew', price: 1500, date: '2024-01-25' }
    ],
    travel_booking: [
      { title: 'Mumbai to Delhi', provider: 'IRCTC', price: 1500, date: '2024-01-22' },
      { title: 'Bangalore to Chennai', provider: 'MakeMyTrip', price: 800, date: '2024-01-19' },
      { title: 'Delhi to Jaipur', provider: 'Goibibo', price: 600, date: '2024-01-21' }
    ]
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/entertainment', {
        type: formData.type,
        provider: formData.provider,
        title: formData.title,
        date: formData.date,
        time: formData.time,
        seats: formData.seats,
        amount: Number(formData.amount)
      }, { headers: { Authorization: `Bearer ${token}` } });
      
      navigate('/dashboard');
    } catch (err) {
      setError('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedType = entertainmentTypes.find(type => type.name === formData.type);

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e3f0ff 0%, #f5f8fa 100%)',
      p: { xs: 1, sm: 2 }
    }}>
      <Container maxWidth="lg">
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
            <MovieIcon sx={{ color: '#00c6ae' }} />
            Entertainment & Travel
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Main Content */}
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
                  {/* Entertainment Type Selection */}
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#002e6e', mb: 2 }}>
                    Select Category
                  </Typography>
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    {entertainmentTypes.map((type) => (
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
                          onClick={() => setFormData({ ...formData, type: type.name, provider: '', title: '' })}
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
                        Select Platform
                      </Typography>
                      <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel>Platform</InputLabel>
                        <Select
                          value={formData.provider}
                          label="Platform"
                          onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                        >
                          {selectedType?.providers.map((provider) => (
                            <MenuItem key={provider} value={provider}>
                              {provider}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <Divider sx={{ my: 3 }} />

                      {/* Popular Items */}
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#002e6e', mb: 2 }}>
                        Popular Options
                      </Typography>
                      <Grid container spacing={2} sx={{ mb: 3 }}>
                        {popularItems[formData.type]?.map((item) => (
                          <Grid item xs={12} sm={6} md={4} key={item.title}>
                            <Card sx={{
                              p: 2,
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              border: formData.title === item.title ? '2px solid #00c6ae' : '2px solid transparent',
                              '&:hover': {
                                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                                transform: 'translateY(-2px)'
                              }
                            }}
                            onClick={() => setFormData({ 
                              ...formData, 
                              title: item.title,
                              provider: item.provider,
                              amount: item.price.toString(),
                              date: item.date
                            })}
                            >
                              <Typography variant="h6" sx={{ fontWeight: 600, color: '#002e6e', mb: 1 }}>
                                {item.title}
                              </Typography>
                              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                                {item.provider}
                              </Typography>
                              <Typography variant="body1" sx={{ color: '#00c6ae', fontWeight: 700 }}>
                                ₹{item.price}
                              </Typography>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>

                      <Divider sx={{ my: 3 }} />

                      {/* Booking Details */}
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#002e6e', mb: 2 }}>
                        Booking Details
                      </Typography>
                      <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Title/Event Name"
                            variant="outlined"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Date"
                            variant="outlined"
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Time"
                            variant="outlined"
                            type="time"
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Number of Seats/Tickets"
                            variant="outlined"
                            type="number"
                            value={formData.seats}
                            onChange={(e) => {
                              const seats = e.target.value;
                              const baseAmount = formData.amount ? parseFloat(formData.amount) / (formData.seats || 1) : 0;
                              const newAmount = baseAmount * seats;
                              setFormData({ 
                                ...formData, 
                                seats: seats,
                                amount: newAmount.toString()
                              });
                            }}
                          />
                        </Grid>
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
                      </Grid>

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
                        disabled={loading || !formData.provider || !formData.title || !formData.amount}
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
                        {loading ? 'Processing...' : `Book Now - ₹${formData.amount || '0'}`}
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
                  Quick Bookings
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    Recent Bookings
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Chip 
                      label="PVR - Avengers" 
                      onClick={() => setFormData({ 
                        ...formData, 
                        type: 'movie_tickets',
                        provider: 'PVR',
                        title: 'Avengers: Endgame'
                      })}
                      sx={{ cursor: 'pointer' }}
                    />
                    <Chip 
                      label="IRCTC - Mumbai-Delhi" 
                      onClick={() => setFormData({ 
                        ...formData, 
                        type: 'travel_booking',
                        provider: 'IRCTC',
                        title: 'Mumbai to Delhi'
                      })}
                      sx={{ cursor: 'pointer' }}
                    />
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    Offers Available
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Chip 
                      label="20% off on movies" 
                      color="success"
                      variant="outlined"
                    />
                    <Chip 
                      label="Free popcorn" 
                      color="info"
                      variant="outlined"
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

export default Entertainment;
