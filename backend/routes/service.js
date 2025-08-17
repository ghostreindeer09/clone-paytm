const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service');
const auth = require('../middleware/auth');

router.post('/', auth, serviceController.createServiceBooking);
router.get('/', auth, serviceController.getServiceBookings);

module.exports = router;
