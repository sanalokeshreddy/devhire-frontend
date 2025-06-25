// src/components/LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-100 via-white to-purple-100 p-6">

      {/* Blobs Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      </div>

      {/* Header */}
      <motion.h1
        className="text-4xl sm:text-5xl font-extrabold text-center text-blue-800 mb-10 drop-shadow-lg"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Welcome to <span className="text-purple-700">DevHire AI</span> 🌟
      </motion.h1>

      {/* Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Link
          to="/student"
          className="bg-gradient-to-r from-green-400 to-green-600 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition transform duration-300"
        >
          🎓 I’m a Student
        </Link>
        <Link
          to="/recruiter"
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition transform duration-300"
        >
          🧑‍💼 I’m a Recruiter
        </Link>
      </motion.div>
    </div>
  );
};

export default LandingPage;
