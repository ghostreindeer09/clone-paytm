import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Box, Typography, List, ListItem, ListItemText, Divider, Chip, Fade, Avatar } from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PaidIcon from '@mui/icons-material/Paid';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/transactions', { headers: { Authorization: `Bearer ${token}` } });
        setTransactions(res.data.transactions);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e3f0ff 0%, #f5f8fa 100%)',
      py: { xs: 2, sm: 4 },
    }}>
      <Fade in timeout={900}>
        <Card sx={{ maxWidth: 600, mx: 'auto', p: { xs: 2, sm: 4 }, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', borderRadius: 4, boxShadow: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2, justifyContent: 'center' }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48, boxShadow: 2 }}>
              <ReceiptLongIcon sx={{ fontSize: 28 }} />
            </Avatar>
            <Typography variant="h4" component="h2" sx={{ color: 'primary.main', fontWeight: 'bold', letterSpacing: 1 }}>
              Transactions
            </Typography>
          </Box>
          <List aria-label="Transactions list">
            {transactions.length === 0 && (
              <Typography sx={{ color: 'text.secondary', textAlign: 'center', mt: 2 }}>
                No transactions yet.
              </Typography>
            )}
            {transactions.map((tx, index) => (
              <React.Fragment key={tx._id}>
                <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                  <Avatar sx={{ bgcolor: tx.type === 'add' ? 'success.main' : 'error.main', mr: 2 }}>
                    {tx.type === 'add' ? <AddCircleIcon /> : <PaidIcon />}
                  </Avatar>
                  <ListItemText
                    primary={<>
                      <Chip
                        label={tx.type === 'add' ? 'Add Money' : 'Pay'}
                        color={tx.type === 'add' ? 'success' : 'error'}
                        size="small"
                        sx={{ fontWeight: 600, mr: 1 }}
                      />
                      <span style={{ fontWeight: 600, color: tx.type === 'add' ? '#00c853' : '#ff4d4f' }}>
                        ${tx.amount.toFixed(2)}
                      </span>
                    </>}
                    secondary={<>
                      <Typography component="span" variant="body2" color="text.secondary">
                        {`Date: ${new Date(tx.createdAt).toLocaleString()}`}
                      </Typography>
                    </>}
                  />
                </ListItem>
                {index < transactions.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Card>
      </Fade>
    </Box>
  );
};

export default Transactions;
