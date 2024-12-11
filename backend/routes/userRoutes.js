const express = require('express');
const { getUsers, addUser } = require('../controllers/userController');
const { getExtraDetailsByUserId, addExtraDetails } = require('../controllers/userController');

const router = express.Router();

// Route to get all users
router.get('/', getUsers);

// Route to add a user
router.post('/', addUser);

// Route to get extra details for a user by ID
router.get('/extra-details/:userId', getExtraDetailsByUserId);

// Route to add extra details for a user
router.post('/extra-details', addExtraDetails);

module.exports = router;
