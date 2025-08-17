const express = require('express');
const router = express.Router();
const entertainmentController = require('../controllers/entertainment');
const auth = require('../middleware/auth');

router.post('/', auth, entertainmentController.createBooking);
router.get('/', auth, entertainmentController.getBookings);
router.post('/:id/cancel', auth, entertainmentController.cancelBooking);

module.exports = router;
