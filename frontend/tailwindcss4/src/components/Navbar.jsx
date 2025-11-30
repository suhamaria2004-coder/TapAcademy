import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, LogIn } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="w-full bg-white border-b shadow-sm">
      <div className="max-w-[1800px] mx-auto px-16 py-6 flex items-center justify-center gap-32">

        {/* Left - Logo */}
        <div className="flex items-center gap-4">
          <Clock size={40} className="text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Attendify
          </h1>
        </div>

        {/* Middle - Nav links */}
        <div className="flex items-center gap-16 text-gray-700 text-lg font-semibold">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <Link to="/login" className="hover:text-blue-600 transition-colors">Login</Link>
          <Link to="/register" className="hover:text-blue-600 transition-colors">Register</Link>
          <Link to="/employee/dashboard" className="hover:text-blue-600 transition-colors">Employee</Link>
          <Link to="/manager/dashboard" className="hover:text-blue-600 transition-colors">Manager</Link>
        </div>

        {/* Right - CTA */}
        <Link
          to="/login"
          className="flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg text-lg"
        >
          <LogIn size={22} />
          <span className="text-white">Sign In</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;