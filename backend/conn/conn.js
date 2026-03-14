console.log("conn.js is running"); // ← add this as first line
const mongoose = require("mongoose");

const conn = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Disconnected from MongoDB", err);
  }
};

conn();
