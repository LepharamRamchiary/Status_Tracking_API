const jwt = require('jsonwebtoken');
const User = require('../models/user')

const SECRET_KEY = process.env.SECRET_KEY;

module.exports = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Access denied, no token provided' });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
};
