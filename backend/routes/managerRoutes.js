const express = require("express");
const router = express.Router();

const {
  getAllAttendance,
  getEmployeeAttendance,
  teamSummary,
  exportCSV,
  todayStatus
} = require("../controllers/managerController");

const authMiddleware = require("../middleware/authMiddleware");
const managerOnly = require("../middleware/managerOnly");

// manager routes (only manager can access)
router.get("/all", authMiddleware, managerOnly, getAllAttendance);
router.get("/employee/:id", authMiddleware, managerOnly, getEmployeeAttendance);
router.get("/summary", authMiddleware, managerOnly, teamSummary);
router.get("/export", authMiddleware, managerOnly, exportCSV);
router.get("/today-status", authMiddleware, managerOnly, todayStatus);

module.exports = router;