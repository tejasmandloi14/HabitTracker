import React from "react";

const HabitList = ({ habits, completeHabit }) => {
  return (
    <ul>
      {habits.map((habit) => (
        <li
          key={habit.id}
          style={{
            textDecoration: habit.completed ? "line-through" : "none",
            cursor: "pointer",
          }}
        >
          {habit.name} - Streak: {habit.streak}
          <button onClick={() => completeHabit(habit.id)} disabled={habit.completed}>
            {habit.completed ? "Completed" : "Complete"}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default HabitList;
