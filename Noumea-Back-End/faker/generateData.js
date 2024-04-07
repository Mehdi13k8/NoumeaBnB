// generateData.js

const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker"); // Updated import
require("dotenv").config();
const Room = require("../models/Room"); // Update the path to where your model is defined
const User = require("../models/User"); // Update the path to where your model is defined
const Reservation = require("../models/Reservation"); // Update the path to where your model is defined

mongoose
  .connect(
    "mongodb+srv://dietis13008:Yw0MgWYsTmO77EDO@cluster0.yvbp8vj.mongodb.net/noumeaBnB?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

async function generateData() {
  // Clear the collections
  await Room.deleteMany({});
  await User.deleteMany({});
  await Reservation.deleteMany({});
  //   delete database
  await mongoose.connection.db.dropDatabase();

  // Generate fake users
  for (let i = 0; i < 10; i++) {
    await User.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: "user",
    });
  }

  // Generate an admin user
  await User.create({
    name: "Admin User",
    email: "admin@example.com",
    password: "securepassword", // Note: Use hashed passwords in production
    role: "admin",
  });

  // Generate fake rooms
  for (let i = 0; i < 20; i++) {
    await Room.create({
      name: faker.commerce.productName(),
      type: faker.helpers.arrayElement(["Single", "Double", "Suite"]),
      isAvailable: faker.datatype.boolean(),
      price: faker.commerce.price(),
      description: faker.lorem.sentences(),
      photo: faker.image.url(),
      photos: [faker.image.url(), faker.image.url()],
      reviews: [
        { user: "User1", review: faker.lorem.sentence() },
        { user: "User2", review: faker.lorem.sentence() },
      ],
    });
  }

  // Generate fake reservations
  const rooms = await Room.find();
  // not admin user
  const users = await User.find({ role: { $ne: "admin" } });

  for (let i = 0; i < 20; i++) {
    const randomRoom = faker.helpers.arrayElement(rooms);
    const randomUser = faker.helpers.arrayElement(users);

    await Reservation.create({
      room: randomRoom._id,
      startDate: faker.date.recent(),
      endDate: faker.date.future(),
      numberOfAdults: faker.number.int(1, 4), // Updated method (was: faker.random.number()
      numberOfChildren: faker.number.int(0, 2),
      totalPrice: faker.commerce.price(),
      user: randomUser._id,
    });
  }

  console.log("Fake data generated");
}

generateData().then(() => mongoose.disconnect());
