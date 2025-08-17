const express = require('express');
const router = express.Router();
const shoppingController = require('../controllers/shopping');
const auth = require('../middleware/auth');

router.post('/', auth, shoppingController.createOrder);
router.get('/', auth, shoppingController.getOrders);

module.exports = router;
