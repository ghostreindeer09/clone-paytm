const express = require('express');
const router = express.Router();
const digitalController = require('../controllers/digital');
const auth = require('../middleware/auth');

router.post('/', auth, digitalController.createDigitalPurchase);
router.get('/', auth, digitalController.getDigitalPurchases);

module.exports = router;
