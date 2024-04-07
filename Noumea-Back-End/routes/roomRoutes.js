// routes/roomRoutes.js
const express = require('express');
const router = express.Router();
const { createRoom, getRoomById, updateRoom, deleteRoom, getAllRooms } = require('../controllers/roomController');
const { createRoomValidations, updateRoomValidations } = require('../validations/roomValidations');
const { validationResult } = require('express-validator');

// Room routes
// room creation route
router.post('/', createRoomValidations, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, createRoom);

router.get('/:id', getRoomById);
// get all rooms route /api/rooms
router.get('/', getAllRooms);

//room update route
router.put('/:id', updateRoomValidations, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    updateRoom(req, res);
});

router.delete('/:id', deleteRoom);

module.exports = router;
