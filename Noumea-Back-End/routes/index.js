var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// /api/rooms to routes/roomRoutes
router.use('/api/rooms', require('./roomRoutes'));

// /api/reservations to routes/reservationRoutes
router.use('/api/reservations', require('./reservationRoutes'));


module.exports = router;
