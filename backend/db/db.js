const mongoose = require("mongoose");

const db = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(
      process.env.DATABASE_URL.replace("<PASSWORD>", process.env.PASSWORD)
    );
    console.log("DATABASE CONNECTED, HURRAY!    ");
  } catch (error) {
    console.log(error);
  }
};

module.exports = db;
