const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // parse JSON body

// Connect Database
connectDB();

// Routes
const authRoutes = require("./routes/authRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const managerRoutes = require("./routes/managerRoutes");

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/manager", managerRoutes);

// Base Route
app.get("/", (req, res) => {
  res.send("Employee Attendance Backend is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


