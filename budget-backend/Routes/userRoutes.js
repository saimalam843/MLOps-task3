const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

// Middleware for authentication and authorization
const auth = require('../Middleware/auth');
const adminAuth = require('../Middleware/adminAuth');

// Public routes
router.post('/signup', userController.signup);
router.post('/login', userController.login);

// Protected routes
router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);

// Admin routes
router.get('/users', auth, adminAuth, userController.getAllUsers);
router.put('/users/:id', auth, adminAuth, userController.updateUser);

module.exports = router;
