import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
      <div className="max-w-6xl mx-auto text-center px-10">
        {/* Main Title */}
        <h1 className="text-8xl font-bold text-gray-900 leading-tight mb-10">
          Free Employee Attendance Tracker
        </h1>
        {/* Subtitle */}
        <p className="text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Track employee check-ins, working hours, and productivity with a simple and
          powerful cloud-based attendance system.
        </p>
        {/* CTA Button */}
        <div className="mt-16">
          <Link
            to="/register"
            className="inline-block px-16 py-6 text-2xl bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
          >
            <span className="text-white">Get Started — It's Free</span>
          </Link>
        </div>
        <p className="mt-8 text-lg text-gray-500 font-medium">
          No credit card required • Instant setup • Unlimited users
        </p>
      </div>
    </section>
  );
};

export default HeroSection;