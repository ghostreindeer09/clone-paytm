const express = require('express');
const router = express.Router();
const billController = require('../controllers/bill');
const auth = require('../middleware/auth');

router.post('/', auth, billController.createBillPayment);
router.get('/', auth, billController.getBills);
router.post('/:id/pay', auth, billController.payBill);

module.exports = router;
