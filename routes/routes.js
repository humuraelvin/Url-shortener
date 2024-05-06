const express = require('express');
const { shortenUrl, getHistory } = require('../controllers/shorteningController.js');


const router = express.Router();

router.post('/shorten', shortenUrl);
router.get('/history/:userId', getHistory);

module.exports = router;