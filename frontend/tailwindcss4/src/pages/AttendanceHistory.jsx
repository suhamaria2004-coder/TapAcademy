import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Download, Filter, Search, ChevronLeft, ChevronRight, TrendingUp, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const AttendanceHistory = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, present, absent, leave
  const [viewMode, setViewMode] = useState('list'); // list, calendar

  // Mock employee data
  const employee = {
    id: 1,
    name: 'John Doe',
    employeeId: 'EMP001',
    department: 'Engineering'
  };

  // Mock attendance data
  const [attendanceData, setAttendanceData] = useState([
    { date: '2024-11-28', checkIn: '09:15', checkOut: '18:30', hours: '9.25', status: 'present' },
    { date: '2024-11-27', checkIn: '09:00', checkOut: '17:45', hours: '8.75', status: 'present' },
    { date: '2024-11-26', checkIn: '09:30', checkOut: '18:00', hours: '8.50', status: 'present' },
    { date: '2024-11-25', checkIn: '-', checkOut: '-', hours: '0', status: 'absent' },
    { date: '2024-11-24', checkIn: '-', checkOut: '-', hours: '0', status: 'weekend' },
    { date: '2024-11-23', checkIn: '-', checkOut: '-', hours: '0', status: 'weekend' },
    { date: '2024-11-22', checkIn: '08:45', checkOut: '18:15', hours: '9.50', status: 'present' },
    { date: '2024-11-21', checkIn: '09:10', checkOut: '17:30', hours: '8.33', status: 'present' },
    { date: '2024-11-20', checkIn: '09:05', checkOut: '18:00', hours: '8.92', status: 'present' },
    { date: '2024-11-19', checkIn: '-', checkOut: '-', hours: '0', status: 'leave' },
    { date: '2024-11-18', checkIn: '09:20', checkOut: '17:50', hours: '8.50', status: 'present' },
    { date: '2024-11-17', checkIn: '-', checkOut: '-', hours: '0', status: 'weekend' },
    { date: '2024-11-16', checkIn: '-', checkOut: '-', hours: '0', status: 'weekend' },
    { date: '2024-11-15', checkIn: '09:00', checkOut: '18:10', hours: '9.17', status: 'present' },
    { date: '2024-11-14', checkIn: '08:55', checkOut: '17:45', hours: '8.83', status: 'present' },
    { date: '2024-11-13', checkIn: '09:15', checkOut: '18:00', hours: '8.75', status: 'present' },
    { date: '2024-11-12', checkIn: '09:25', checkOut: '17:55', hours: '8.50', status: 'present' },
    { date: '2024-11-11', checkIn: '09:00', checkOut: '18:20', hours: '9.33', status: 'present' },
  ]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  // Calculate statistics
  const calculateStats = () => {
    const filteredData = attendanceData.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate.getMonth() === selectedMonth && recordDate.getFullYear() === selectedYear;
    });

    const totalDays = filteredData.length;
    const presentDays = filteredData.filter(r => r.status === 'present').length;
    const absentDays = filteredData.filter(r => r.status === 'absent').length;
    const leaveDays = filteredData.filter(r => r.status === 'leave').length;
    const totalHours = filteredData
      .filter(r => r.status === 'present')
      .reduce((sum, r) => sum + parseFloat(r.hours), 0);
    const avgHours = presentDays > 0 ? (totalHours / presentDays).toFixed(2) : 0;
    const attendanceRate = totalDays > 0 ? ((presentDays / (totalDays - filteredData.filter(r => r.status === 'weekend').length)) * 100).toFixed(1) : 0;

    return { totalDays, presentDays, absentDays, leaveDays, totalHours: totalHours.toFixed(2), avgHours, attendanceRate };
  };

  const stats = calculateStats();

  // Filter attendance data
  const filteredAttendance = attendanceData.filter(record => {
    const recordDate = new Date(record.date);
    const matchesMonth = recordDate.getMonth() === selectedMonth;
    const matchesYear = recordDate.getFullYear() === selectedYear;
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    const matchesSearch = record.date.includes(searchQuery);

    return matchesMonth && matchesYear && matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'present': return 'bg-green-100 text-green-800 border-green-200';
      case 'absent': return 'bg-red-100 text-red-800 border-red-200';
      case 'leave': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'weekend': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'present': return <CheckCircle size={18} />;
      case 'absent': return <XCircle size={18} />;
      case 'leave': return <AlertCircle size={18} />;
      default: return <Calendar size={18} />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handlePreviousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Check In', 'Check Out', 'Hours', 'Status'];
    const csvData = filteredAttendance.map(record => [
      record.date,
      record.checkIn,
      record.checkOut,
      record.hours,
      record.status
    ]);

    const csv = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_${months[selectedMonth]}_${selectedYear}.csv`;
    a.click();
  };

  // Calendar view logic
  const getDaysInMonth = () => {
    return new Date(selectedYear, selectedMonth + 1, 0).getDate();
  };

  const getFirstDayOfMonth = () => {
    return new Date(selectedYear, selectedMonth, 1).getDay();
  };

  const renderCalendarView = () => {
    const daysInMonth = getDaysInMonth();
    const firstDay = getFirstDayOfMonth();
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const record = attendanceData.find(r => r.date === dateString);
      const isToday = dateString === new Date().toISOString().split('T')[0];

      days.push(
        <div
          key={day}
          className={`aspect-square border rounded-lg p-2 ${
            isToday ? 'border-blue-500 border-2' : 'border-gray-200'
          } ${record ? getStatusColor(record.status) : 'bg-white'}`}
        >
          <div className="font-semibold text-sm mb-1">{day}</div>
          {record && (
            <div className="text-xs">
              <div className="flex items-center gap-1 mb-1">
                {getStatusIcon(record.status)}
              </div>
              {record.status === 'present' && (
                <div className="text-xs">{record.hours}h</div>
              )}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Attendance History</h1>
              <p className="text-sm text-gray-500 mt-1">View your complete attendance records</p>
            </div>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Download size={18} />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Present Days</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{stats.presentDays}</p>
              </div>
              <CheckCircle className="text-green-600" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Absent Days</p>
                <p className="text-3xl font-bold text-red-600 mt-1">{stats.absentDays}</p>
              </div>
              <XCircle className="text-red-600" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg Hours/Day</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">{stats.avgHours}h</p>
              </div>
              <Clock className="text-blue-600" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Attendance Rate</p>
                <p className="text-3xl font-bold text-purple-600 mt-1">{stats.attendanceRate}%</p>
              </div>
              <TrendingUp className="text-purple-600" size={40} />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Month Navigation */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Month</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePreviousMonth}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex-1 text-center font-semibold text-lg">
                  {months[selectedMonth]} {selectedYear}
                </div>
                <button
                  onClick={handleNextMonth}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  disabled={selectedMonth === new Date().getMonth() && selectedYear === new Date().getFullYear()}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="leave">On Leave</option>
              </select>
            </div>

            {/* View Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">View</label>
              <select
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="list">List View</option>
                <option value="calendar">Calendar View</option>
              </select>
            </div>

            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search date..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {viewMode === 'list' ? (
          /* List View */
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">Attendance Records</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Work Hours</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAttendance.map((record, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar size={18} className="text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">
                            {formatDate(record.date)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{record.checkIn}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{record.checkOut}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">{record.hours}h</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(record.status)}`}>
                          {getStatusIcon(record.status)}
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredAttendance.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-500">No attendance records found</p>
              </div>
            )}
          </div>
        ) : (
          /* Calendar View */
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Calendar View</h2>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
                  <span>Present</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
                  <span>Absent</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded"></div>
                  <span>Leave</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-100 border border-gray-200 rounded"></div>
                  <span>Weekend</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-semibold text-sm text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {renderCalendarView()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceHistory;