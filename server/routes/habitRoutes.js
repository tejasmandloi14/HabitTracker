const express = require("express");
const jwt = require("jsonwebtoken");
const Habit = require("../models/Habit");
const router = express.Router();

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization"); // Get token from headers
  if (!token) return res.status(401).json({ message: "Access Denied. No token provided." });

  try {
    const verified = jwt.verify(token, "secret"); // Verify token with secret key
    req.user = verified; // Attach decoded user info to request
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid Token" });
  }
};

// Fetch habits for a particular user
router.get("/", authenticateToken, async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user.userId }); // Fetch habits for logged-in user
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: "Error fetching habits" });
  }
});

// Add a new habit (for authenticated user)
router.post("/add-habit", authenticateToken, async (req, res) => {
  const { name, streakEnabled } = req.body;
  try {
    const newHabit = new Habit({ name, userId: req.user.userId, streakEnabled });
    await newHabit.save();
    res.status(201).json({ message: "Habit added successfully", habit: newHabit });
  } catch (error) {
    res.status(500).json({ message: "Error adding habit" });
  }
});

// Complete a habit
// router.put("/complete-habit/:id", authenticateToken, async (req, res) => {
//   try {
//     const habit = await Habit.findOne({ _id: req.params.id, userId: req.user.userId });
//     if (!habit) return res.status(404).json({ message: "Habit not found" });

//     if (habit.streakEnabled) habit.streak += 1;
//     habit.lastCompleted = new Date();
//     await habit.save();
//     res.json({ message: "Habit marked as completed", habit });
//   } catch (error) {
//     res.status(500).json({ message: "Error completing habit" });
//   }
// });
router.put("/complete-habit/:id", authenticateToken, async (req, res) => {
  try {
    const habit = await Habit.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!habit) return res.status(404).json({ message: "Habit not found" });

    // Get current date (without time)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get last completed date (if exists)
    const lastCompleted = habit.lastCompleted ? new Date(habit.lastCompleted) : null;
    if (lastCompleted) lastCompleted.setHours(0, 0, 0, 0);

    // If lastCompleted is today, prevent completion
    if (lastCompleted && lastCompleted.getTime() === today.getTime()) {
      return res.status(400).json({ message: "Habit already completed today. Try again tomorrow!" });
    }

    // Allow completion and update streak
    habit.lastCompleted = new Date();
    if (habit.streakEnabled) habit.streak += 1;

    await habit.save();
    res.json({ message: "Habit marked as completed", habit });
  } catch (error) {
    res.status(500).json({ message: "Error completing habit" });
  }
});

// Delete a habit
router.delete("/delete-habit/:id", authenticateToken, async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!habit) return res.status(404).json({ message: "Habit not found" });

    res.json({ message: "Habit deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting habit" });
  }
});

module.exports = router;
