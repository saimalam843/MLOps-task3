const BTUser = require('../Models/user');

module.exports = async function (req, res, next) {
    try {
        // Fetch the user from the database using the user ID from the JWT
        const user = await BTUser.findById(req.user.id);

        if (user) {
            // Log user details to ensure correct fetching
            console.log('Authenticated user:', user);

            // Check if the user is an admin
            if (user.role === 'Admin') {
                next(); // User is an admin, proceed to the next middleware/route handler
            } else {
                res.status(403).json({ message: 'Access denied. Admins only.' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Admin auth error:', error); // Log the error for better debugging
        res.status(500).json({ message: 'Server error', error: error.message || error });
    }
};
