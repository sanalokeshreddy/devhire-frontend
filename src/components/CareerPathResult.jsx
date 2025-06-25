import React, { useState } from 'react'; 
import { motion } from 'framer-motion';

const CareerPathResult = ({ result }) => {
  const [activeSection, setActiveSection] = useState('overview');

  if (!result) return null;

  const progressPercentage = 25; // Example value, can be dynamic

  const ProgressBar = ({ percentage, color = "bg-purple-500" }) => (
    <div className="w-full bg-gray-200 rounded-full h-3">
      <motion.div 
        className={`h-3 rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );

  const SectionCard = ({ icon, title, children, color = "bg-white" }) => (
    <motion.div
      className={`${color} shadow-lg rounded-xl p-6 border border-gray-100 hover:shadow-xl transition-all`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-3 mb-4">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      </div>
      {children}
    </motion.div>
  );

  return (
    <div className="space-y-8">

      {/* Overview Section */}
      <SectionCard icon="🎯" title="Career Overview" color="bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Target Role</h4>
            <p className="text-lg font-medium text-indigo-700">{result.targetRole}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Overall Progress</h4>
            <div className="flex items-center space-x-3">
              <ProgressBar percentage={progressPercentage} color="bg-indigo-500" />
              <span className="text-indigo-600 font-semibold">{progressPercentage}%</span>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Skills Gap Analysis */}
      <SectionCard icon="🧠" title="Skills Gap Analysis" color="bg-gradient-to-br from-red-50 to-pink-50">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-700">Missing Skills</h4>
            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm font-medium">
              {result.missingSkills?.length || 0} skills to learn
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.missingSkills?.map((skill, idx) => (
              <motion.span
                key={idx}
                className="bg-red-100 text-red-800 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {skill}
              </motion.span>
            )) || <p className="text-gray-500 italic">No missing skills identified</p>}
          </div>
        </div>

        {/* Priority Levels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg border border-red-200">
            <h5 className="font-medium text-red-700 mb-2">🔥 High Priority</h5>
            <p className="text-sm text-gray-600">Core skills for the role</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-yellow-200">
            <h5 className="font-medium text-yellow-700 mb-2">⚡ Medium Priority</h5>
            <p className="text-sm text-gray-600">Important but not critical</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <h5 className="font-medium text-green-700 mb-2">💡 Nice to Have</h5>
            <p className="text-sm text-gray-600">Bonus skills</p>
          </div>
        </div>
      </SectionCard>

      {/* Learning Timeline */}
      <SectionCard icon="🗓️" title="Learning Timeline" color="bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="space-y-4">
          {result.timeline?.map((step, idx) => (
            <motion.div
              key={idx}
              className="bg-white p-4 rounded-lg border border-green-200 hover:border-green-300 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">{idx + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-gray-900">Week {step.week}</h4>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                      {step.week}
                    </span>
                  </div>
                  <p className="text-gray-700">{step.focus}</p>
                </div>
              </div>
            </motion.div>
          )) || (
            <p className="text-gray-500 italic text-center py-4">
              Timeline will be generated based on your selected timeframe
            </p>
          )}
        </div>
      </SectionCard>

      {/* Recommended Courses */}
      <SectionCard icon="📚" title="Recommended Learning Resources" color="bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.courses?.map((course, idx) => (
            <motion.div
              key={idx}
              className="bg-white p-4 rounded-lg border border-indigo-200 hover:border-indigo-300 transition-all hover:shadow-md"
              whileHover={{ y: -2 }}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-900 text-sm">{course}</h4>
                <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs">Course</span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center space-x-1">
                  <span>⭐</span>
                  <span>4.5</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span>⏰</span>
                  <span>10-20 hrs</span>
                </span>
              </div>
            </motion.div>
          )) || (
            <p className="text-gray-500 italic col-span-2 text-center py-4">
              Personalized course recommendations will appear here
            </p>
          )}
        </div>

        {/* Additional Resources */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-purple-200 text-center">
            <span className="text-2xl mb-2 block">📺</span>
            <h5 className="font-medium text-purple-700">YouTube Tutorials</h5>
            <p className="text-sm text-gray-600">Free video content</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-purple-200 text-center">
            <span className="text-2xl mb-2 block">📖</span>
            <h5 className="font-medium text-purple-700">Documentation</h5>
            <p className="text-sm text-gray-600">Official guides</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-purple-200 text-center">
            <span className="text-2xl mb-2 block">🏆</span>
            <h5 className="font-medium text-purple-700">GitHub Inspiration</h5>
            <p className="text-sm text-gray-600">Explore real-world projects</p>
          </div>
        </div>
      </SectionCard>

    </div>
  );
};

export default CareerPathResult;
