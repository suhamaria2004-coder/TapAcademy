const Attendance = require("../models/Attendance");
const moment = require("moment");

// --------------------- CHECK IN ---------------------
exports.checkIn = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = moment().format("YYYY-MM-DD");

    // Check if already checked in
    const existing = await Attendance.findOne({ userId, date: today });
    if (existing)
      return res.status(400).json({ message: "Already checked in today" });

    const attendance = await Attendance.create({
      userId,
      date: today,
      checkInTime: moment().format("hh:mm A"),
      status: "present"
    });

    res.json({ message: "Checked in", attendance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --------------------- CHECK OUT ---------------------
exports.checkOut = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = moment().format("YYYY-MM-DD");

    const attendance = await Attendance.findOne({ userId, date: today });
    if (!attendance)
      return res.status(400).json({ message: "You haven't checked in yet" });

    if (attendance.checkOutTime)
      return res.json({ message: "Already checked out today" });

    const checkOutTime = moment();
    const checkInTime = moment(attendance.checkInTime, "hh:mm A");

    const totalHours = moment
      .duration(checkOutTime.diff(checkInTime))
      .asHours();

    attendance.checkOutTime = checkOutTime.format("hh:mm A");
    attendance.totalHours = Number(totalHours.toFixed(2));

    await attendance.save();

    res.json({
      message: "Checked out",
      attendance
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --------------------- MY HISTORY ---------------------
exports.myHistory = async (req, res) => {
  try {
    const records = await Attendance.find({ userId: req.user.id }).sort({
      date: -1
    });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --------------------- MY MONTHLY SUMMARY ---------------------
exports.mySummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const month = moment().format("YYYY-MM");

    const records = await Attendance.find({
      userId,
      date: { $regex: month }
    });

    const summary = {
      present: records.filter((r) => r.status === "present").length,
      absent: records.filter((r) => r.status === "absent").length,
      late: records.filter((r) => r.status === "late").length,
      halfDay: records.filter((r) => r.status === "half-day").length,
      totalHours: records.reduce((acc, r) => acc + r.totalHours, 0)
    };

    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --------------------- TODAY STATUS ---------------------
exports.todayStatus = async (req, res) => {
  try {
    const today = moment().format("YYYY-MM-DD");

    const record = await Attendance.findOne({
      userId: req.user.id,
      date: today
    });

    res.json(record || { message: "Not checked in" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};