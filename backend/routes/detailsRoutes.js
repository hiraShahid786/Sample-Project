const express = require('express');
const { getExtraDetails, upsertExtraDetails } = require('../controllers/extraDetailsController');
const router = express.Router();

// Route to get all extra details
router.get('/', getExtraDetails);

// Route to add/update extra details
router.post('/', upsertExtraDetails);

module.exports = router;
