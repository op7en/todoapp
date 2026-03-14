const router = require("express").Router();

const User = require("../models/user");
const bcrypt = require("bcryptjs");
// sign up

router.post("/register", async (req, res) => {
  try {
    const { email, username, password, confirmPassword } = req.body;

    // ← Add this check
    if (password !== confirmPassword) {
      return res.status(200).json({ message: "Passwords do not match!" });
    }

    const hashPassword = bcrypt.hashSync(password);
    const user = new User({ email, username, password: hashPassword });
    await user.save();
    res.status(200).json({ message: "Sign Up Successful" });
  } catch (err) {
    res.status(200).json({ message: "User Already Exist!" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).json({ message: "Please Sign Up first!" });
    }
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password is NOT correct!" });
    }
    const { password, ...others } = user._doc;
    res.status(200).json({ others });
  } catch (err) {
    console.log(err.response?.data);
    res.status(400).json({ message: "Something went wrong!!" });
  }
});
// sign in
module.exports = router;
