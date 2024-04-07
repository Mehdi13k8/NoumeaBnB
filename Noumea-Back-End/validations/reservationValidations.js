// validations/reservationValidations.js
const { body } = require('express-validator');

exports.createReservationValidations = [
    body('room').notEmpty().withMessage('Room ID is required'),
    body('startDate').notEmpty().isDate().withMessage('Start date is required and must be a valid date'),
    body('endDate').notEmpty().isDate().withMessage('End date is required and must be a valid date'),
    body('numberOfAdults').isInt({ min: 1 }).withMessage('At least one adult is required'),
];

exports.updateReservationValidations = [
    body('startDate').notEmpty().isDate().withMessage('Start date is required and must be a valid date'),
    body('endDate').notEmpty().isDate().withMessage('End date is required and must be a valid date'),
    body('numberOfAdults').isInt({ min: 1 }).withMessage('At least one adult is required'),
];

