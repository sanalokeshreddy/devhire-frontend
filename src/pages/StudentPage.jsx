import React from "react";
import JDHeatmap from "../components/JDHeatmap";
import CareerPathForm from "../components/CareerPathForm";
import { motion } from "framer-motion";

const StudentPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pb-20">
      {/* Hero Header */}
      <motion.div
        className="bg-gradient-to-r from-indigo-700 to-purple-700 py-12 text-center text-white shadow-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-extrabold mb-2">🎓 Student Dashboard</h1>
        <p className="text-lg opacity-90">
          Explore your resume's fit with job descriptions and generate a personalized career roadmap.
        </p>
      </motion.div>

      {/* JD Heatmap Section */}
      <motion.div
        className="mt-12 px-4 md:px-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <JDHeatmap />
      </motion.div>

      {/* Career Roadmap Generator */}
      <motion.div
        className="mt-16 px-4 md:px-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <CareerPathForm />
      </motion.div>
    </div>
  );
};

export default StudentPage;
