import React, { useState, useEffect } from 'react';
import { Calendar, Users, Clock, TrendingUp, Download, Filter, Search, ChevronDown } from 'lucide-react';

const ManagerDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('today');

  const [dashboardData, setDashboardData] = useState({
    totalEmployees: 45,
    presentToday: 38,
    absentToday: 5,
    onLeave: 2,
    avgAttendance: 87.5
  });

  const [employeeAttendance, setEmployeeAttendance] = useState([
    { id: 1, name: 'John Doe', department: 'Engineering', checkIn: '09:15', checkOut: '18:30', status: 'present', hours: '9.25' },
    { id: 2, name: 'Sarah Smith', department: 'Marketing', checkIn: '09:00', checkOut: '17:45', status: 'present', hours: '8.75' },
    { id: 3, name: 'Mike Johnson', department: 'Engineering', checkIn: '-', checkOut: '-', status: 'absent', hours: '0' },
    { id: 4, name: 'Emily Brown', department: 'HR', checkIn: '08:45', checkOut: '18:00', status: 'present', hours: '9.25' },
    { id: 5, name: 'David Wilson', department: 'Sales', checkIn: '-', checkOut: '-', status: 'leave', hours: '0' },
    { id: 6, name: 'Lisa Anderson', department: 'Engineering', checkIn: '09:30', checkOut: 'In Progress', status: 'present', hours: '6.5' },
    { id: 7, name: 'Tom Martinez', department: 'Marketing', checkIn: '09:10', checkOut: '18:15', status: 'present', hours: '9.08' },
    { id: 8, name: 'Amy Taylor', department: 'Sales', checkIn: '08:55', checkOut: '17:30', status: 'present', hours: '8.58' },
    { id: 9, name: 'Robert Lee', department: 'Engineering', checkIn: '09:05', checkOut: '18:20', status: 'present', hours: '9.25' },
    { id: 10, name: 'Jennifer White', department: 'HR', checkIn: '08:50', checkOut: '17:40', status: 'present', hours: '8.83' }
  ]);

  const teams = ['all', 'Engineering', 'Marketing', 'Sales', 'HR'];

  const filteredEmployees = employeeAttendance.filter(emp => {
    const matchesTeam = selectedTeam === 'all' || emp.department === selectedTeam;
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTeam && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'leave': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadge = (status) => {
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-[1600px] mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manager Dashboard</h1>
              <p className="text-sm text-gray-600 mt-2">Monitor and manage team attendance in real-time</p>
            </div>
            <button className="flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl font-medium">
              <Download size={20} />
              Export Report
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Total Employees</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{dashboardData.totalEmployees}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-full">
                <Users className="text-blue-600" size={36} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Present Today</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{dashboardData.presentToday}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-full">
                <Clock className="text-green-600" size={36} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Absent Today</p>
                <p className="text-3xl font-bold text-red-600 mt-2">{dashboardData.absentToday}</p>
              </div>
              <div className="bg-red-50 p-4 rounded-full">
                <Users className="text-red-600" size={36} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">On Leave</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">{dashboardData.onLeave}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-full">
                <Calendar className="text-yellow-600" size={36} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Avg Attendance</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{dashboardData.avgAttendance}%</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-full">
                <TrendingUp className="text-blue-600" size={36} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Team / Department</label>
              <select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-base cursor-pointer"
              >
                {teams.map(team => (
                  <option key={team} value={team}>
                    {team.charAt(0).toUpperCase() + team.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">View Mode</label>
              <select
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-base cursor-pointer"
              >
                <option value="today">Today</option>
                <option value="weekly">This Week</option>
                <option value="monthly">This Month</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search Employee</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-bold text-gray-900">Employee Attendance Details</h2>
            <p className="text-sm text-gray-600 mt-1">Showing {filteredEmployees.length} employee(s)</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b-2 border-gray-300">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Employee Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Check In Time</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Check Out Time</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Total Hours</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-blue-50 transition cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-4">
                          <div className="text-base font-semibold text-gray-900">{employee.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-base text-gray-700 font-medium">{employee.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-base text-gray-900 font-medium">{employee.checkIn}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-base text-gray-900 font-medium">{employee.checkOut}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-base font-bold text-gray-900">{employee.hours}h</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(employee.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredEmployees.length === 0 && (
            <div className="text-center py-16 bg-gray-50">
              <Users className="mx-auto text-gray-400 mb-4" size={64} />
              <p className="text-gray-600 text-lg font-medium">No employees found matching your criteria</p>
              <p className="text-gray-500 text-sm mt-2">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;