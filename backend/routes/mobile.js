const express = require('express');
const router = express.Router();
const mobileController = require('../controllers/mobile');
const auth = require('../middleware/auth');

router.post('/', auth, mobileController.createRecharge);
router.get('/', auth, mobileController.getRecharges);

module.exports = router;
