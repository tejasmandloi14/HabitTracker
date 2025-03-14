const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  streak: { type: Number, default: 0 },
  streakEnabled: { type: Boolean, default: false },
  lastCompleted: { type: Date },
});

module.exports = mongoose.model("Habit", HabitSchema);
