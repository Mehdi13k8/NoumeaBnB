// db.js

const mongoose = require('mongoose');
require('dotenv').config()

const MONGO_URI = "mongodb+srv://dietis13008:Yw0MgWYsTmO77EDO@cluster0.yvbp8vj.mongodb.net/noumeaBnB?retryWrites=true&w=majority&appName=Cluster0"; //process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected...');
        // INIT DATABASE
        

    } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;
