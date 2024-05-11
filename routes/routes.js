const express = require('express');
const { shortenUrl, getHistory } = require('../controllers/shorteningController.js');
const { authenticateToken } = require('../middleware/authMiddleware');
const { login, signup, renderLogin, renderSignup } = require('../controllers/authController.js');

const router = express.Router();

router.get('/login', renderLogin);
router.post('/login', login);
router.get('/signup', renderSignup);
router.post('/signup', signup);
router.post('/shorten', authenticateToken, shortenUrl);
router.get('/history', authenticateToken, getHistory);

module.exports = router;

