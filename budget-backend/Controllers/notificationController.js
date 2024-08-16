const BTUser = require('../Models/user');

// get latest three notifications
exports.getNotifications = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await BTUser.findById(userId)
            .select('notifications')
            .slice('notifications', -3); // Fetch the last three notifications

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ success: true, data: user.notifications });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
