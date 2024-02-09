const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Check if authorization header exists
        if (!token) {
            return res.status(403).json({ message: 'Authentication token required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add user payload to request
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token', error: error.message });
    }
};

module.exports = authMiddleware;
