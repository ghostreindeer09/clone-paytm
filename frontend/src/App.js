import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AddMoney from './components/AddMoney';
import Pay from './components/Pay';
import Transactions from './components/Transactions';
import MobileRecharge from './components/MobileRecharge';
import BillPayment from './components/BillPayment';
import Shopping from './components/Shopping';
import Entertainment from './components/Entertainment';
import Financial from './components/Financial';
import Digital from './components/Digital';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-money" element={<AddMoney />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/transactions" element={<Transactions />} />
          
          {/* Mobile & Telecom Services */}
          <Route path="/mobile-recharge" element={<MobileRecharge />} />
          <Route path="/dth-recharge" element={<MobileRecharge />} />
          <Route path="/fastag-recharge" element={<MobileRecharge />} />
          
          {/* Bill Payments */}
          <Route path="/electricity-bill" element={<BillPayment />} />
          <Route path="/water-bill" element={<BillPayment />} />
          <Route path="/gas-bill" element={<BillPayment />} />
          <Route path="/internet-bill" element={<BillPayment />} />
          
          {/* Shopping & Food */}
          <Route path="/online-shopping" element={<Shopping />} />
          <Route path="/food-delivery" element={<Shopping />} />
          <Route path="/grocery-delivery" element={<Shopping />} />
          
          {/* Entertainment */}
          <Route path="/movie-tickets" element={<Entertainment />} />
          <Route path="/event-tickets" element={<Entertainment />} />
          <Route path="/travel-booking" element={<Entertainment />} />
          
          {/* Financial Services */}
          <Route path="/insurance" element={<Financial />} />
          <Route path="/loan-emi" element={<Financial />} />
          <Route path="/mutual-funds" element={<Financial />} />
          
          {/* Digital Services */}
          <Route path="/gift-cards" element={<Digital />} />
          <Route path="/gaming" element={<Digital />} />
          <Route path="/education" element={<Digital />} />
          
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
