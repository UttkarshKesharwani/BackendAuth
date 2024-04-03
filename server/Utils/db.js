const mongoose = require("mongoose");

const URI = "mongodb+srv://Uttkarsh:12345678910@cluster0.fdkpiwv.mongodb.net/";

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("db connected successfully");
  } catch (error) {
    console.log("database connection failed");
    process.exit(0);
  }
};

module.exports = connectDb;
