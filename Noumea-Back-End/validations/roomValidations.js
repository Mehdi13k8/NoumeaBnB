// validations/roomValidations.js
const { body } = require('express-validator');

exports.createRoomValidations = [
    body('name').notEmpty().withMessage('Room name is required'),
    body('type').notEmpty().withMessage('Room type is required'),
];

// updateRoomValidations
exports.updateRoomValidations = [
    body('name').notEmpty().withMessage('Room name is required'),
    body('type').notEmpty().withMessage('Room type is required'),
];