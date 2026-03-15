require("dotenv").config();
require("./conn/conn"); // ← keep after dotenv.config()
const express = require("express");
const app = express();
const cors = require("cors");
const auth = require("./routes/auth");
const list = require("./routes/list");

app.use(
  cors({
    origin: "https://todoapp-five-kohl.vercel.app",
  }),
);

app.use(express.json()); // ← must be before routes

app.get("/", (req, res) => {
  res.send("`Hello World!!!!");
});
app.use("/api/v1", auth);
app.use("/api/v2", list);

app.listen(1000, () => {
  console.log("Server Started");
});
