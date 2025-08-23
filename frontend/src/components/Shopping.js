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
  ListItemSecondaryAction,
  IconButton
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, Link } from 'react-router-dom';

const Shopping = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: '',
    provider: '',
    items: []
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const shoppingTypes = [
    { 
      name: 'online_shopping', 
      label: 'Online Shopping', 
      icon: <ShoppingCartIcon />, 
      color: '#e91e63',
      providers: ['Amazon', 'Flipkart', 'Myntra', 'Nykaa']
    },
    { 
      name: 'food_delivery', 
      label: 'Food Delivery', 
      icon: <ShoppingCartIcon />, 
      color: '#ff5722',
      providers: ['Swiggy', 'Zomato', 'Dunzo', 'Blinkit']
    },
    { 
      name: 'grocery_delivery', 
      label: 'Grocery Delivery', 
      icon: <ShoppingCartIcon />, 
      color: '#4caf50',
      providers: ['BigBasket', 'Grofers', 'Amazon Fresh', 'Blinkit']
    }
  ];

  const popularItems = {
    online_shopping: [
      { name: 'Smartphone', price: 15000, quantity: 1 },
      { name: 'Laptop', price: 45000, quantity: 1 },
      { name: 'Headphones', price: 2000, quantity: 1 }
    ],
    food_delivery: [
      { name: 'Pizza', price: 500, quantity: 1 },
      { name: 'Burger', price: 200, quantity: 1 },
      { name: 'Biryani', price: 300, quantity: 1 }
    ],
    grocery_delivery: [
      { name: 'Rice (5kg)', price: 400, quantity: 1 },
      { name: 'Milk (1L)', price: 60, quantity: 1 },
      { name: 'Bread', price: 40, quantity: 1 }
    ]
  };

  const addItem = (item) => {
    const existingItem = formData.items.find(i => i.name === item.name);
    if (existingItem) {
      setFormData({
        ...formData,
        items: formData.items.map(i => 
          i.name === item.name 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      });
    } else {
      setFormData({
        ...formData,
        items: [...formData.items, { ...item, quantity: 1 }]
      });
    }
  };

  const removeItem = (itemName) => {
    const existingItem = formData.items.find(i => i.name === itemName);
    if (existingItem && existingItem.quantity > 1) {
      setFormData({
        ...formData,
        items: formData.items.map(i => 
          i.name === itemName 
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
      });
    } else {
      setFormData({
        ...formData,
        items: formData.items.filter(i => i.name !== itemName)
      });
    }
  };

  const getTotalAmount = () => {
    return formData.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/shopping', {
        type: formData.type,
        provider: formData.provider,
        items: formData.items,
        amount: getTotalAmount()
      }, { headers: { Authorization: `Bearer ${token}` } });
      
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || err.response?.data?.error || 'Order failed. Please try again.');
      console.error('Shopping order error:', err);
      console.log('Error response data:', err.response?.data);
      console.log('Error status:', err.response?.status);
    } finally {
      setLoading(false);
    }
  };

  const selectedType = shoppingTypes.find(type => type.name === formData.type);

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
            <ShoppingCartIcon sx={{ color: '#00c6ae' }} />
            Shopping & Delivery
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
                  {/* Shopping Type Selection */}
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#002e6e', mb: 2 }}>
                    Select Category
                  </Typography>
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    {shoppingTypes.map((type) => (
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
                          onClick={() => setFormData({ ...formData, type: type.name, provider: '', items: [] })}
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

                      {/* Items Selection */}
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#002e6e', mb: 2 }}>
                        Select Items
                      </Typography>
                      <Grid container spacing={2} sx={{ mb: 3 }}>
                        {popularItems[formData.type]?.map((item) => (
                          <Grid item xs={12} sm={6} md={4} key={item.name}>
                            <Card sx={{
                              p: 2,
                              textAlign: 'center',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                                transform: 'translateY(-2px)'
                              }
                            }}>
                              <Typography variant="h6" sx={{ fontWeight: 600, color: '#002e6e', mb: 1 }}>
                                {item.name}
                              </Typography>
                              <Typography variant="body1" sx={{ color: '#00c6ae', fontWeight: 700, mb: 2 }}>
                                ₹{item.price}
                              </Typography>
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={() => addItem(item)}
                                sx={{ borderColor: '#00c6ae', color: '#00c6ae' }}
                              >
                                Add to Cart
                              </Button>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>

                      {/* Cart Items */}
                      {formData.items.length > 0 && (
                        <>
                          <Divider sx={{ my: 3 }} />
                          <Typography variant="h6" sx={{ fontWeight: 600, color: '#002e6e', mb: 2 }}>
                            Your Cart
                          </Typography>
                          <List>
                            {formData.items.map((item) => (
                              <ListItem key={item.name} sx={{ border: '1px solid #e0e0e0', borderRadius: 1, mb: 1 }}>
                                <ListItemText
                                  primary={item.name}
                                  secondary={`₹${item.price} x ${item.quantity}`}
                                />
                                <ListItemSecondaryAction>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <IconButton size="small" onClick={() => removeItem(item.name)}>
                                      <RemoveIcon />
                                    </IconButton>
                                    <Typography variant="body2" sx={{ minWidth: 20, textAlign: 'center' }}>
                                      {item.quantity}
                                    </Typography>
                                    <IconButton size="small" onClick={() => addItem(item)}>
                                      <AddIcon />
                                    </IconButton>
                                    <IconButton size="small" onClick={() => removeItem(item.name)}>
                                      <DeleteIcon />
                                    </IconButton>
                                  </Box>
                                </ListItemSecondaryAction>
                              </ListItem>
                            ))}
                          </List>
                          <Box sx={{ textAlign: 'right', mt: 2 }}>
                            <Typography variant="h5" sx={{ fontWeight: 700, color: '#00c6ae' }}>
                              Total: ₹{getTotalAmount()}
                            </Typography>
                          </Box>
                        </>
                      )}

                      {error && (
                        <Typography sx={{ color: 'error.main', mb: 2, textAlign: 'center', fontWeight: 500 }}>
                          {error}
                        </Typography>
                      )}

                      {formData.items.length > 0 && (
                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth
                          size="large"
                          disabled={loading || !formData.provider}
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
                          {loading ? 'Processing...' : `Place Order - ₹${getTotalAmount()}`}
                        </Button>
                      )}
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
                  Quick Actions
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    Recent Orders
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Chip 
                      label="Amazon - ₹2,500" 
                      onClick={() => setFormData({ 
                        ...formData, 
                        type: 'online_shopping',
                        provider: 'Amazon'
                      })}
                      sx={{ cursor: 'pointer' }}
                    />
                    <Chip 
                      label="Swiggy - ₹450" 
                      onClick={() => setFormData({ 
                        ...formData, 
                        type: 'food_delivery',
                        provider: 'Swiggy'
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
                      label="20% off on first order" 
                      color="success"
                      variant="outlined"
                    />
                    <Chip 
                      label="Free delivery above ₹500" 
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

export default Shopping;
