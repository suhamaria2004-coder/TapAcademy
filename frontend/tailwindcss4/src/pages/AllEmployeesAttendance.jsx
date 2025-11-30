import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function AllEmployeesAttendance() {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get("/attendance/all");
        setAttendanceData(res.data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50">

      {/* ------------ TOP HERO (Clockify style) ------------ */}
      <section className="w-full bg-white py-16 border-b">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            All Employees Attendance
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            View attendance logs for all employees including date, check-in,
            check-out time, and working duration.
          </p>

          <div className="mt-6 flex justify-center">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Download Reports
            </button>
          </div>
        </div>
      </section>

      {/* ------------ DATA TABLE SECTION ------------ */}
      <div className="max-w-6xl mx-auto mt-10 bg-white shadow-sm rounded-xl">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Attendance Overview
          </h2>

          <input
            type="text"
            className="border px-3 py-2 rounded-lg text-sm w-60"
            placeholder="Search employee..."
          />
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto p-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 font-medium text-gray-700 border-b">Employee</th>
                <th className="p-3 font-medium text-gray-700 border-b">Date</th>
                <th className="p-3 font-medium text-gray-700 border-b">Check In</th>
                <th className="p-3 font-medium text-gray-700 border-b">Check Out</th>
                <th className="p-3 font-medium text-gray-700 border-b">Work Duration</th>
              </tr>
            </thead>

            <tbody>
              {attendanceData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No attendance records found.
                  </td>
                </tr>
              ) : (
                attendanceData.map((entry) => (
                  <tr key={entry._id} className="hover:bg-gray-50 transition">
                    <td className="p-3 border-b">{entry.employeeName}</td>
                    <td className="p-3 border-b">{entry.date}</td>
                    <td className="p-3 border-b">{entry.checkIn}</td>
                    <td className="p-3 border-b">{entry.checkOut}</td>
                    <td className="p-3 border-b">{entry.workDuration}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="h-20"></div>
    </div>
  );
}
