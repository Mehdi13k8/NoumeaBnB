// controllers/reservationController.js

const Reservation = require("../models/Reservation");
const Room = require("../models/Room");
const Users = require("../models/User");

// Create a new reservation
exports.createReservation = async (req, res) => {
  try {
    let Token = req.header("Authorization");
    console.log("Token ==> ", Token);
    const user = await Users.whoIsLogged(Token);

    // create Reservation object with user id
    const ReservationObject = {
      room: req.body.roomId,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      numberOfAdults: req.body.numberOfAdults,
      numberOfChildren: req.body.numberOfChildren,
      totalPrice: req.body.totalPrice,
      user: user._id,
    };
    const newReservation = new Reservation(ReservationObject);
    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// Get a reservation by ID
exports.getReservationById = async (req, res) => {
  try {
    console.log("getReservationById");
    const reservation = await Reservation.findById(req.params.id).populate(
      "room"
    );
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    console.log("gg");
    res.json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get reservations by Room ID
exports.getReservationsByRoomId = async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);
    const reservations = await Reservation.find({ room: room });
    res.json(reservations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all
exports.getAllReservations = async (req, res) => {
  try {
    const count = await Reservation.countDocuments();
    // console.log(`Found ${count} reservations`);

    const reservations = await Reservation.find().populate("room");
    // console.log("Reservations:", reservations);

    res.json(reservations);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// Update a reservation by ID
exports.updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("room");
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a reservation by ID
exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
