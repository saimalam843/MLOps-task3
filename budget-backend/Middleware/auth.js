const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = decoded.user;

        // Add logging to check req.user
        console.log('Decoded user from token:', req.user);

        next();
    } catch (error) {
        console.error('JWT verification error:', error); // Log the error for debugging
        res.status(401).json({ message: 'Token is not valid' });
    }
};
