// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { createUser, getUserById, updateUser, deleteUser } = require('../controllers/userController');

// User routes
router.post('/', createUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
