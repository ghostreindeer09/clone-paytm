const express = require('express');
const router = express.Router();
const financialController = require('../controllers/financial');
const auth = require('../middleware/auth');

router.post('/', auth, financialController.createFinancialPayment);
router.get('/', auth, financialController.getFinancialPayments);

module.exports = router;
