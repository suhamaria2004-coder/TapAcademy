import { useState, useEffect } from "react";
import axios from "../api/axios";

export default function Reports() {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get("/attendance/reports");
        setReportData(res.data);
      } catch (error) {
        console.error("Error loading reports:", error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50">

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="w-full bg-white py-16 border-b">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900">Reports & Analytics</h1>

          <p className="mt-4 text-lg text-gray-600">
            Overview of employee productivity, attendance patterns, and time tracking insights.
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Export PDF
            </button>
            <button className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition">
              Export CSV
            </button>
          </div>
        </div>
      </section>

      {/* ---------------- FILTER SECTION ---------------- */}
      <div className="max-w-6xl mx-auto bg-white shadow-sm rounded-xl p-6 mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Filters</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input className="border px-3 py-2 rounded-lg" type="date" />

          <input className="border px-3 py-2 rounded-lg" type="date" />

          <select className="border px-3 py-2 rounded-lg">
            <option value="">Select Employee</option>
            <option>All</option>
            <option>Suha</option>
            <option>Maria</option>
          </select>

          <button className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700">
            Apply Filter
          </button>
        </div>
      </div>

      {/* ---------------- SUMMARY CARDS ---------------- */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

        <div className="bg-white p-6 shadow-sm rounded-xl">
          <p className="text-gray-600">Total Working Hours</p>
          <h2 className="text-3xl font-bold mt-2">148 hrs</h2>
        </div>

        <div className="bg-white p-6 shadow-sm rounded-xl">
          <p className="text-gray-600">Average Daily Hours</p>
          <h2 className="text-3xl font-bold mt-2">7.4 hrs/day</h2>
        </div>

        <div className="bg-white p-6 shadow-sm rounded-xl">
          <p className="text-gray-600">Employee Attendance Score</p>
          <h2 className="text-3xl font-bold mt-2">93%</h2>
        </div>

      </div>

      {/* ---------------- CHART PLACEHOLDER ---------------- */}
      <div className="max-w-6xl mx-auto mt-10 bg-white shadow-sm rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Attendance Trend</h2>

        <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
          (Chart Placeholder – can integrate Recharts/ChartJS later)
        </div>
      </div>

      {/* ---------------- TABLE SECTION ---------------- */}
      <div className="max-w-6xl mx-auto mt-10 bg-white shadow-sm rounded-xl">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Detailed Report</h2>
        </div>

        <div className="overflow-x-auto p-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 font-medium text-gray-700 border-b">Employee</th>
                <th className="p-3 font-medium text-gray-700 border-b">Date</th>
                <th className="p-3 font-medium text-gray-700 border-b">Check In</th>
                <th className="p-3 font-medium text-gray-700 border-b">Check Out</th>
                <th className="p-3 font-medium text-gray-700 border-b">Working Hours</th>
              </tr>
            </thead>

            <tbody>
              {reportData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No report data available.
                  </td>
                </tr>
              ) : (
                reportData.map((entry) => (
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
