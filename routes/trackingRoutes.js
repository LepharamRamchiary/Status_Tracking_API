const express = require('express');
const router = express.Router();
const trackingController = require('../controllers/trackingController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/', authMiddleware, roleMiddleware(['admin']), trackingController.createTrackingEvent);
router.get('/:productId', authMiddleware, trackingController.getTrackingEventsByProductId);
router.put('/:eventId', authMiddleware, roleMiddleware(['admin']), trackingController.updateTrackingEvent);
router.delete('/:eventId', authMiddleware, roleMiddleware(['admin']), trackingController.deleteTrackingEvent);

module.exports = router;
 
