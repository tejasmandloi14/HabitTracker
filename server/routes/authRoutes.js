const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({ username , password: hashedPassword });
    res.status(201).json({ message: "User registered successfully" });
    
  } catch (error) {
    res.status(400).json({ error: `Error registering user ${error.message}` });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id }, "secret", { expiresIn: "1h" });
  res.json({ token, userId: user._id });
});

module.exports = router;
