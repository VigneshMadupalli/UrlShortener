const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary

const authMiddleware = async (req, res, next) => {
    let token;

    // Check for token in the Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract token from the Authorization header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Add user from payload
            req.user = await User.findById(decoded.userId).select('-password'); // Exclude password field

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Token is not valid' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'No token, authorization denied' });
    }
};

module.exports = authMiddleware;
