const Attendance = require("../models/Attendance");
const User = require("../models/User");
const { Parser } = require("json2csv");
const moment = require("moment");

// --------------------- ALL EMPLOYEES ATTENDANCE ---------------------
exports.getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find()
      .populate("userId", "name employeeId department")
      .sort({ date: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --------------------- SPECIFIC EMPLOYEE ATTENDANCE ---------------------
exports.getEmployeeAttendance = async (req, res) => {
  try {
    const userId = req.params.id;

    const records = await Attendance.find({ userId }).sort({ date: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --------------------- TEAM SUMMARY ---------------------
exports.teamSummary = async (req, res) => {
  try {
    const records = await Attendance.find();

    const summary = {
      present: records.filter((r) => r.status === "present").length,
      absent: records.filter((r) => r.status === "absent").length,
      late: records.filter((r) => r.status === "late").length,
      halfDay: records.filter((r) => r.status === "half-day").length,
      todayPresent: records.filter((r) => r.date === moment().format("YYYY-MM-DD")).length
    };

    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --------------------- EXPORT CSV ---------------------
exports.exportCSV = async (req, res) => {
  try {
    const records = await Attendance.find().populate("userId", "name employeeId");

    const formatted = records.map((r) => ({
      Name: r.userId.name,
      EmployeeID: r.userId.employeeId,
      Date: r.date,
      CheckIn: r.checkInTime,
      CheckOut: r.checkOutTime,
      Status: r.status,
      TotalHours: r.totalHours
    }));

    const parser = new Parser();
    const csv = parser.parse(formatted);

    res.header("Content-Type", "text/csv");
    res.attachment("attendance.csv");
    return res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --------------------- WHO'S PRESENT TODAY ---------------------
exports.todayStatus = async (req, res) => {
  try {
    const today = moment().format("YYYY-MM-DD");

    const records = await Attendance.find({ date: today }).populate(
      "userId",
      "name employeeId"
    );

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};