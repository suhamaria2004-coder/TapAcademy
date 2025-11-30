const express = require("express");
const router = express.Router();

const {
  checkIn,
  checkOut,
  myHistory,
  mySummary,
  todayStatus
} = require("../controllers/attendanceController");

const authMiddleware = require("../middleware/authMiddleware");

// Employee attendance routes
router.post("/checkin", authMiddleware, checkIn);
router.post("/checkout", authMiddleware, checkOut);
router.get("/my-history", authMiddleware, myHistory);
router.get("/my-summary", authMiddleware, mySummary);
router.get("/today", authMiddleware, todayStatus);

module.exports = router;