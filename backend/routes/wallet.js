const express = require('express');
const router = express.Router();
const { addMoney, pay } = require('../controllers/wallet');
const auth = require('../middleware/auth');

router.post('/add', auth, addMoney);
router.post('/pay', auth, pay);

module.exports = router;
