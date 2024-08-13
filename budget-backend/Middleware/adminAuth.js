const BTUser = require('../Models/user');

module.exports = async function (req, res, next) {
    try {
        // get user from DB using the user ID from the token
        const user = await BTUser.findById(req.user.id);

        if (user) {
            
            console.log('Authenticated user:', user);

            
            if (user.role === 'Admin') {
                next(); // case user is admin, proceed to the next middleware/route handler
            } else {
                res.status(403).json({ message: 'Access denied. Admins only.' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Admin auth error:', error); // for debugging
        res.status(500).json({ message: 'Server error', error: error.message || error });
    }
};
