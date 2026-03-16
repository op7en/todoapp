const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");

// create
router.post("/addTask", async (req, res) => {
  try {
    const { title, body, id, deadline } = req.body; // ✅ add deadline
    const existingUser = await User.findById(id);
    if (existingUser) {
      const list = new List({ title, body, user: existingUser, deadline });
      await list.save();
      existingUser.list.push(list);
      await existingUser.save();
      res.status(200).json({ list });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
});

// update
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body, email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      await List.findByIdAndUpdate(req.params.id, { title, body });
      res.status(200).json({ message: "Task updated!" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
});

// delete
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { id } = req.body;
    const existingUser = await User.findByIdAndUpdate(id, {
      $pull: { list: req.params.id },
    });
    if (existingUser) {
      await List.findByIdAndDelete(req.params.id);
      existingUser.list.pull(req.params.id);
      await existingUser.save();
      res.status(200).json({ message: "Task deleted!" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
});

// getTasks
// ✅ Change getTasks route
router.get("/getTasks/:id", async (req, res) => {
  try {
    const existingUser = await User.findById(req.params.id);
    if (existingUser) {
      const list = await List.find({ user: existingUser._id }).sort({
        createdAt: -1,
      });
      res.status(200).json({ list });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong" });
  }
});

module.exports = router;
