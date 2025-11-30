import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Camera, CheckCircle, XCircle, AlertCircle, Calendar, User } from 'lucide-react';

const MarkAttendance = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState(null); // null, 'checkedIn', 'checkedOut'
  const [todayRecord, setTodayRecord] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Mock employee data - replace with actual auth user
  const employee = {
    id: 1,
    name: 'John Doe',
    employeeId: 'EMP001',
    department: 'Engineering',
    designation: 'Senior Developer'
  };

  // Office location for geofencing (mock data)
  const officeLocation = {
    lat: 12.9716,
    lng: 77.5946,
    radius: 200 // meters
  };

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Get user location
    getUserLocation();

    // Check today's attendance status
    checkTodayAttendance();

    return () => clearInterval(timer);
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setLocation(userLoc);
          
          // Check if within office radius
          const distance = calculateDistance(userLoc, officeLocation);
          if (distance > officeLocation.radius) {
            setLocationError(`You are ${Math.round(distance)}m away from office. Please be within ${officeLocation.radius}m radius.`);
          } else {
            setLocationError('');
          }
        },
        (error) => {
          setLocationError('Unable to get your location. Please enable location services.');
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser.');
    }
  };

  const calculateDistance = (loc1, loc2) => {
    // Haversine formula to calculate distance between two coordinates
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (loc1.lat * Math.PI) / 180;
    const φ2 = (loc2.lat * Math.PI) / 180;
    const Δφ = ((loc2.lat - loc1.lat) * Math.PI) / 180;
    const Δλ = ((loc2.lng - loc1.lng) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const checkTodayAttendance = () => {
    // Mock API call - replace with actual API
    // Simulating already checked in
    const mockRecord = {
      date: new Date().toISOString().split('T')[0],
      checkIn: null,
      checkOut: null,
      status: null
    };
    setTodayRecord(mockRecord);
    setAttendanceStatus(mockRecord.status);
  };

  const handleCheckIn = async () => {
    if (locationError) {
      showNotification('error', 'Cannot check in. ' + locationError);
      return;
    }

    setIsLoading(true);

    // Mock API call - replace with actual API
    setTimeout(() => {
      const checkInTime = new Date().toLocaleTimeString('en-US', { hour12: false });
      setTodayRecord({
        ...todayRecord,
        checkIn: checkInTime,
        status: 'checkedIn'
      });
      setAttendanceStatus('checkedIn');
      setIsLoading(false);
      showNotification('success', `Successfully checked in at ${checkInTime}`);
    }, 1500);
  };

  const handleCheckOut = async () => {
    if (locationError) {
      showNotification('error', 'Cannot check out. ' + locationError);
      return;
    }

    setIsLoading(true);

    // Mock API call - replace with actual API
    setTimeout(() => {
      const checkOutTime = new Date().toLocaleTimeString('en-US', { hour12: false });
      const workHours = calculateWorkHours(todayRecord.checkIn, checkOutTime);
      
      setTodayRecord({
        ...todayRecord,
        checkOut: checkOutTime,
        workHours: workHours,
        status: 'checkedOut'
      });
      setAttendanceStatus('checkedOut');
      setIsLoading(false);
      showNotification('success', `Successfully checked out at ${checkOutTime}. Total work hours: ${workHours}`);
    }, 1500);
  };

  const calculateWorkHours = (checkIn, checkOut) => {
    const [inHour, inMin] = checkIn.split(':').map(Number);
    const [outHour, outMin] = checkOut.split(':').map(Number);
    
    const inMinutes = inHour * 60 + inMin;
    const outMinutes = outHour * 60 + outMin;
    const diffMinutes = outMinutes - inMinutes;
    
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    
    return `${hours}h ${minutes}m`;
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {notification.type === 'success' ? <CheckCircle size={24} /> : <XCircle size={24} />}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mark Attendance</h1>
              <p className="text-sm text-gray-500 mt-1">Track your work hours</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-500">Welcome,</p>
                <p className="text-lg font-semibold text-gray-900">{employee.name}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                {employee.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Time Display */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-6">
          <div className="text-center">
            <Calendar className="mx-auto text-blue-600 mb-4" size={48} />
            <h2 className="text-4xl font-bold text-gray-900 mb-2">{formatTime(currentTime)}</h2>
            <p className="text-lg text-gray-600">{formatDate(currentTime)}</p>
          </div>
        </div>

        {/* Location Status */}
        <div className={`rounded-xl shadow-md border p-4 mb-6 ${
          locationError ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
        }`}>
          <div className="flex items-start gap-3">
            <MapPin className={locationError ? 'text-red-600' : 'text-green-600'} size={24} />
            <div className="flex-1">
              <h3 className={`font-semibold ${locationError ? 'text-red-900' : 'text-green-900'}`}>
                Location Status
              </h3>
              <p className={`text-sm mt-1 ${locationError ? 'text-red-700' : 'text-green-700'}`}>
                {locationError || 'You are within office premises'}
              </p>
              {location && !locationError && (
                <p className="text-xs text-green-600 mt-1">
                  Coordinates: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Today's Attendance Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <h3 className="text-xl font-bold text-white">Today's Attendance</h3>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Check In Status */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                    todayRecord?.checkIn ? 'bg-green-100' : 'bg-gray-200'
                  }`}>
                    <Clock className={todayRecord?.checkIn ? 'text-green-600' : 'text-gray-400'} size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Check In</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {todayRecord?.checkIn || '--:--:--'}
                    </p>
                  </div>
                </div>
                {todayRecord?.checkIn && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle size={16} />
                    <span>Checked in successfully</span>
                  </div>
                )}
              </div>

              {/* Check Out Status */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                    todayRecord?.checkOut ? 'bg-blue-100' : 'bg-gray-200'
                  }`}>
                    <Clock className={todayRecord?.checkOut ? 'text-blue-600' : 'text-gray-400'} size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Check Out</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {todayRecord?.checkOut || '--:--:--'}
                    </p>
                  </div>
                </div>
                {todayRecord?.checkOut && (
                  <div className="flex items-center gap-2 text-sm text-blue-600">
                    <CheckCircle size={16} />
                    <span>Work hours: {todayRecord.workHours}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {attendanceStatus === null && (
                <button
                  onClick={handleCheckIn}
                  disabled={isLoading || !!locationError}
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-black font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={24} />
                      Check In
                    </>
                  )}
                </button>
              )}

              {attendanceStatus === 'checkedIn' && (
                <button
                  onClick={handleCheckOut}
                  disabled={isLoading || !!locationError}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-black font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <XCircle size={24} />
                      Check Out
                    </>
                  )}
                </button>
              )}

              {attendanceStatus === 'checkedOut' && (
                <div className="text-center py-4">
                  <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-100 text-green-800 rounded-full">
                    <CheckCircle size={24} />
                    <span className="font-semibold">Attendance marked for today</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="text-blue-600" size={24} />
              <div>
                <p className="text-sm text-gray-500">Office Hours</p>
                <p className="font-semibold text-gray-900">9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <User className="text-purple-600" size={24} />
              <div>
                <p className="text-sm text-gray-500">Employee ID</p>
                <p className="font-semibold text-gray-900">{employee.employeeId}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <MapPin className="text-green-600" size={24} />
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-semibold text-gray-900">{employee.department}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkAttendance;