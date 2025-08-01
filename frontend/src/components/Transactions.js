import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

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
      background: `linear-gradient(135deg, #05478a 0%, #048cfc 100%)`,
      py: 4,
    }}>
      <Card sx={{ maxWidth: 600, mx: 'auto', p: 3, backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', borderRadius: 2 }}>
        <Typography variant="h4" component="h2" sx={{ color: 'primary.main', mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
          Transactions
        </Typography>
        <List>
          {transactions.map((tx, index) => (
            <React.Fragment key={tx._id}>
              <ListItem>
                <ListItemText
                  primary={`Type: ${tx.type}`}
                  secondary={`Amount: $${tx.amount.toFixed(2)}`}
                />
                <ListItemText
                  align="right"
                  secondary={`Date: ${new Date(tx.createdAt).toLocaleString()}`}
                />
              </ListItem>
              {index < transactions.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Card>
    </Box>
  );
};

export default Transactions;
