// routes/reservationRoutes.js
const express = require('express');
const router = express.Router();
const { createReservation, getAllReservations, getReservationById, getReservationsByRoomId, updateReservation, deleteReservation } = require('../controllers/reservationController');
const { createReservationValidations } = require('../validations/reservationValidations');
const { validationResult } = require('express-validator');
const { updateReservationValidations } = require('../validations/reservationValidations');

// Reservation routes
// router.post('/', createReservation);
// reservation creation route
router.post('/', createReservationValidations, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, createReservation);

// Define the route
router.get('/room/:roomId', getReservationsByRoomId);

// get reservation by ID
router.get('/:id', getReservationById);


// get all
router.get('/', getAllReservations);

// router.put('/:id', updateReservation);
router.put('/:id', updateReservationValidations, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    updateReservation(req, res);
});


router.delete('/:id', deleteReservation);

module.exports = router;
