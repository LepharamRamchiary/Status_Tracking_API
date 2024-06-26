const TrackingEvent = require('../models/trackingEvent');
const Product = require('../models/product');
const User = require('../models/user');
const { sendEmail } = require('../utils/emailService');


exports.createTrackingEvent = async (req, res) => {
    const { productId, status, location } = req.body;

    try {
        const product = await Product.findById(productId).populate('userId');
        if (!product) return res.status(404).json({ error: 'Product not found' });

        const event = new TrackingEvent({ productId, status, location });
        await event.save();

        const user = product.userId; // Ensure this is populated correctly

        // Send notification email
        await sendEmail(user, product, status);

        res.status(201).json({ eventId: event._id, message: 'Tracking event created successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error creating tracking event' });
    }
};

exports.getTrackingEventsByProductId = async (req, res) => {
    try {
        const events = await TrackingEvent.find({ productId: req.params.productId });
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching tracking events' });
    }
};

exports.updateTrackingEvent = async (req, res) => {
    try {
        const event = await TrackingEvent.findByIdAndUpdate(req.params.eventId, req.body, { new: true });
        if (!event) return res.status(404).json({ error: 'Tracking event not found' });
        res.json({ message: 'Tracking event updated successfully', event });
    } catch (err) {
        res.status(500).json({ error: 'Error updating tracking event' });
    }
};

exports.deleteTrackingEvent = async (req, res) => {
    try {
        const event = await TrackingEvent.findByIdAndDelete(req.params.eventId);
        if (!event) return res.status(404).json({ error: 'Tracking event not found' });
        res.json({ message: 'Tracking event deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting tracking event' });
    }
};
