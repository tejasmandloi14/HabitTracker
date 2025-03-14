// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Dashboard = ({ token, setToken }) => {
//   const [habits, setHabits] = useState([]);
//   const [habitName, setHabitName] = useState("");
//   const [streakEnabled, setStreakEnabled] = useState(false);

//   useEffect(() => {
//     fetchHabits();
//   }, []);

//   const fetchHabits = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/habits", {
//         headers: { Authorization: token },
//       });
//       setHabits(res.data);
//     } catch (error) {
//       console.error("❌ Error fetching habits:", error);
//     }
//   };

//   const addHabit = async () => {
//     if (!habitName.trim()) return;
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/habits/add-habit",
//         { name: habitName, streakEnabled, completed: false, streak: 0 },
//         { headers: { Authorization: token } }
//       );
//       setHabits([...habits, res.data.habit]);
//       setHabitName("");
//     } catch (error) {
//       console.error("❌ Error adding habit:", error);
//     }
//   };

//   const completeHabit = async (id) => {
//     try {
//       const res = await axios.put(
//         `http://localhost:5000/api/habits/complete-habit/${id}`,
//         {},
//         { headers: { Authorization: token } }
//       );
  
//       setHabits(
//         habits.map((habit) =>
//           habit._id === id
//             ? { ...habit, completed: true, lastCompleted: new Date().toISOString(), streak: habit.streak + 1 }
//             : habit
//         )
//       );
//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         alert("🚫 You have already completed this habit today!");
//       } else {
//         console.error("❌ Error completing habit:", error);
//       }
//     }
//   };

//   const deleteHabit = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/habits/delete-habit/${id}`, {
//         headers: { Authorization: token },
//       });
//       setHabits(habits.filter((habit) => habit._id !== id));
//     } catch (error) {
//       console.error("❌ Error deleting habit:", error);
//     }
//   };

//   const handleLogout = () => {
//     setToken(null);
//     localStorage.removeItem("token");
//   };

//   return (
//     <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
//       <h2>📋 Habit Tracker Dashboard</h2>
//       <button
//         onClick={handleLogout}
//         style={{
//           backgroundColor: "red",
//           color: "white",
//           padding: "8px",
//           borderRadius: "5px",
//           marginBottom: "20px",
//         }}
//       >
//         🚪 Logout
//       </button>

//       {/* Input for adding a new habit */}
//       <div style={{ marginBottom: "20px" }}>
//         <input
//           type="text"
//           placeholder="✏️ New Habit"
//           value={habitName}
//           onChange={(e) => setHabitName(e.target.value)}
//           required
//           style={{ padding: "5px", marginRight: "10px" }}
//         />
//         <label style={{ marginRight: "10px" }}>
//           <input
//             type="checkbox"
//             checked={streakEnabled}
//             onChange={() => setStreakEnabled(!streakEnabled)}
//           />
//           🔥 Enable Streak
//         </label>
//         <button
//           onClick={addHabit}
//           style={{
//             backgroundColor: "green",
//             color: "white",
//             padding: "8px",
//             borderRadius: "5px",
//           }}
//         >
//           ➕ Add Habit
//         </button>
//       </div>

//       {/* List of habits */}
//       <ul style={{ listStyle: "none", padding: "0" }}>
//         {habits.map((habit) => (
//           <li
//             key={habit._id}
//             style={{
//               padding: "10px",
//               borderBottom: "1px solid gray",
//               textDecoration: habit.completed ? "line-through" : "none",
//               color: habit.completed ? "gray" : "black",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               gap: "10px",
//             }}
//           >
//             <span>
//               {habit.streakEnabled
//                 ? `🔥 ${habit.name} (Streak: ${habit.streak})`
//                 : `✅ ${habit.name}`}
//             </span>

//             {habit.streakEnabled ? (
//               <button
//                 onClick={() => completeHabit(habit._id)}
//                 style={{
//                   backgroundColor: habit.completed ? "gray" : "blue",
//                   color: "white",
//                   padding: "5px",
//                   borderRadius: "5px",
//                 }}
//               >
//                 {habit.completed ? "🔄 Undo" : "✔️ Complete"}
//               </button>
//             ) : (
//               <button
//                 onClick={() => deleteHabit(habit._id)}
//                 style={{
//                   backgroundColor: "darkred",
//                   color: "white",
//                   padding: "5px",
//                   borderRadius: "5px",
//                 }}
//               >
//                 🗑️ Delete
//               </button>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css"; // Import external CSS

const Dashboard = ({ token, setToken }) => {
  const [habits, setHabits] = useState([]);
  const [habitName, setHabitName] = useState("");
  const [streakEnabled, setStreakEnabled] = useState(false);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/habits", {
        headers: { Authorization: token },
      });
      setHabits(res.data);
    } catch (error) {
      console.error("❌ Error fetching habits:", error);
    }
  };

  const addHabit = async () => {
    if (!habitName.trim()) return;
    try {
      const res = await axios.post(
        "http://localhost:5000/api/habits/add-habit",
        { name: habitName, streakEnabled, completed: false, streak: 0 },
        { headers: { Authorization: token } }
      );
      setHabits([...habits, res.data.habit]);
      setHabitName("");
    } catch (error) {
      console.error("❌ Error adding habit:", error);
    }
  };

  const completeHabit = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/habits/complete-habit/${id}`,
        {},
        { headers: { Authorization: token } }
      );
      setHabits(
        habits.map((habit) =>
          habit._id === id
            ? { ...habit, completed: true, lastCompleted: new Date().toISOString(), streak: habit.streak + 1 }
            : habit
        )
      );
    } catch (error) {
      alert("🚫 You have already completed this habit today!");
    }
  };

  const deleteHabit = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/habits/delete-habit/${id}`, {
        headers: { Authorization: token },
      });
      setHabits(habits.filter((habit) => habit._id !== id));
    } catch (error) {
      console.error("❌ Error deleting habit:", error);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">📋 Habit Tracker Dashboard</h2>
      <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>

      <div className="habit-input-container">
        <input
          type="text"
          placeholder="✏️ New Habit"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          className="habit-input"
        />
        <label className="streak-checkbox">
          <input
            type="checkbox"
            checked={streakEnabled}
            onChange={() => setStreakEnabled(!streakEnabled)}
          />
          🔥 Enable Streak
        </label>
        <button className="add-habit-btn" onClick={addHabit}>➕ Add Habit</button>
      </div>

      <ul className="habit-list">
        {habits.map((habit) => (
          <li key={habit._id} className={`habit-card ${habit.completed ? "completed" : ""}`}>
            <span>
              {habit.streakEnabled ? ` ${habit.name} (Streak 🔥: ${habit.streak})` : ` ${habit.name}`}
            </span>
            {habit.streakEnabled ? (
              <button
                className={`complete-btn ${habit.completed ? "disabled" : ""}`}
                onClick={() => completeHabit(habit._id)}
                disabled={habit.completed}
              >
                {habit.completed ? "✅ Done" : "✔️ Complete"}
              </button>
            ) : (
              <button className="delete-btn" onClick={() => deleteHabit(habit._id)}>🗑️ Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
