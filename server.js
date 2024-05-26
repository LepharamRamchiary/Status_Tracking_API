const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
 
const PORT = process.env.PORT || 3000;

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const trackingRoutes = require('./routes/trackingRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/tracking-events', trackingRoutes);

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to mongoDB");
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err.message);
    });

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

