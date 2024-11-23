// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = authController;

// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Profile route (authenticated)
router.get('/profile', authenticate, (req, res) => {
    res.status(200).json({ message: 'User session is valid', userId: req.user });
});

// Logout route
router.post('/logout', authController.logout);

module.exports = router;
