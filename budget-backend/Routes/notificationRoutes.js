const express = require('express');
const router = express.Router();
const notificationController = require('../Controllers/notificationController');
const auth = require('../Middleware/auth');


router.get('/notifications', auth, notificationController.getNotifications);

module.exports = router;
