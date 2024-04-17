// controllers/userController.js

const User = require("../models/User");
const Bookings = require("../models/Reservation");
const Room = require("../models/Room");

//  get logged user from token
exports.getLoggedUser = async (req, res) => {
  try {
    // use whoIsLogged
    const user = await User.whoIsLogged(req.header("Authorization"));
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error.message });
  }
};

// get all bookings for a user by user id
exports.getBookingsByUserId = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // find all bookings where user is the user id
    const bookings = await Bookings.find({ user: user._id });
    for (let booking of bookings) {
      const roomDetails = await Room.findById(booking.room);
        booking.room = roomDetails;
    }
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    console.log(req.body);
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Implement getUserById, updateUser, deleteUser similarly
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    // isActive is set to false instead of deleting the user
    const user = await User.findByIdAndUpdate(req.params.id, {
      isActive: false,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// authentication middleware
exports.authenticate = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.header("Authorization") });
    if (!user) {
      return res.status(401).json({ error: "Not authorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Implement the login controller
exports.login = async (req, res) => {
  try {
    // password is bcrypt hashed use comparePassword method
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: "Not authorized" });
    }
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Not authorized" });
    }
    console.log(isMatch);
    // create a token
    const token = await user.createToken();
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
