const mongoose = require('mongoose');

const trackingEventSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        status: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    });

module.exports = mongoose.model('TrackingEvent', trackingEventSchema);
