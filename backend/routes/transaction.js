const express = require('express');
const router = express.Router();
const { getTransactions } = require('../controllers/transaction');
const auth = require('../middleware/auth');

router.get('/', auth, getTransactions);

module.exports = router;
