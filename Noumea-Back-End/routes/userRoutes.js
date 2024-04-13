// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { createUser, getUserById, updateUser, deleteUser, authenticate, login, getLoggedUser, getBookingsByUserId } = require('../controllers/userController');

// User routes
router.post('/', createUser);

// getBookingsByUserId
router.get('/:id/bookings', getBookingsByUserId);

// getLoggedUser
router.get('/getLoggedUser', getLoggedUser);


router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

// login route
router.post('/login', login);

// authenticate route
router.get('/authenticate', authenticate);



module.exports = router;
