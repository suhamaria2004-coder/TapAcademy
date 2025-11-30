import { useEffect, useState } from "react";
import api from "../api/axios";
import useAuthStore from "../store/authStore";
import Navbar from "../components/Navbar";
import { Clock, Calendar, TrendingUp, CheckCircle } from "lucide-react";

export default function EmployeeDashboard() {
  const { token, user } = useAuthStore();
  const [todayStatus, setTodayStatus] = useState(null);
  const [summary, setSummary] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  async function fetchTodayStatus() {
    try {
      const res = await api.get("/attendance/today", authHeader);
      setTodayStatus(res.data);
    } catch (err) {
      console.error("Error fetching today's status:", err);
    }
  }

  async function fetchSummary() {
    try {
      const res = await api.get("/attendance/my-summary", authHeader);
      setSummary(res.data);
    } catch (err) {
      console.error("Error fetching summary:", err);
    }
  }

  async function fetchRecentHistory() {
    try {
      const res = await api.get("/attendance/my-history", authHeader);
      const last7 = res.data.slice(0, 7);
      setRecent(last7);
    } catch (err) {
      console.error("Error fetching recent history:", err);
    }
  }

  async function handleCheckIn() {
    try {
      await api.post("/attendance/checkin", {}, authHeader);
      fetchTodayStatus();
      fetchSummary();
      fetchRecentHistory();
      alert("Checked in successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Already checked in.");
    }
  }

  async function handleCheckOut() {
    try {
      await api.post("/attendance/checkout", {}, authHeader);
      fetchTodayStatus();
      fetchSummary();
      fetchRecentHistory();
      alert("Checked out successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Check in first.");
    }
  }

  useEffect(() => {
    Promise.all([fetchTodayStatus(), fetchSummary(), fetchRecentHistory()]).finally(() =>
      setLoading(false)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Welcome, {user?.name}!</h1>
            <p className="text-gray-600 mt-2">Track your attendance and view your stats</p>
          </div>

          {/* Today's Attendance Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-gray-800">Today's Attendance</h2>
            </div>

            {todayStatus?.checkInTime ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">
                    Checked in at: {todayStatus.checkInTime}
                  </span>
                </div>

                {todayStatus.checkOutTime ? (
                  <div className="flex items-center gap-3 text-blue-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">
                      Checked out at: {todayStatus.checkOutTime}
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={handleCheckOut}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition"
                  >
                    Check Out
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={handleCheckIn}
                className="bg-primary hover:bg-secondary text-white px-8 py-4 rounded-lg font-semibold text-lg transition"
              >
                Check In Now
              </button>
            )}
          </div>

          {/* Monthly Summary */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-700">Present</h3>
              </div>
              <p className="text-3xl font-bold text-gray-800">{summary?.present || 0}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-100 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-700">Absent</h3>
              </div>
              <p className="text-3xl font-bold text-gray-800">{summary?.absent || 0}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-gray-700">Late</h3>
              </div>
              <p className="text-3xl font-bold text-gray-800">{summary?.late || 0}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-700">Total Hours</h3>
              </div>
              <p className="text-3xl font-bold text-gray-800">
                {summary?.totalHours?.toFixed(1) || 0}
              </p>
            </div>
          </div>

          {/* Recent Attendance */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Recent Attendance (Last 7 Days)
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hours
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recent.length > 0 ? (
                    recent.map((r, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-medium text-gray-900">{r.date}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              r.status === "present"
                                ? "bg-green-100 text-green-800"
                                : r.status === "late"
                                ? "bg-yellow-100 text-yellow-800"
                                : r.status === "half-day"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {r.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                          {r.totalHours || 0} hrs
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                        No recent attendance records
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}