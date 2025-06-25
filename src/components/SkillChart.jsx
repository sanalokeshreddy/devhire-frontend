import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { motion } from "framer-motion";

const SkillChart = ({ resumeResults, selectedRole }) => {
  // Count how many resumes are missing each skill (for visualization)
  const skillFrequency = {};
  resumeResults.forEach((res) => {
    res.missingSkills?.forEach((skill) => {
      const lower = skill.toLowerCase();
      skillFrequency[lower] = (skillFrequency[lower] || 0) + 1;
    });
  });

  const chartData = Object.entries(skillFrequency).map(([skill, count]) => ({
    skill,
    count,
  }));

  return (
    <motion.div
      className="bg-white shadow-lg rounded-xl p-6 mt-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
        📊 Most Common Missing Skills – {selectedRole}
      </h3>

      {chartData.length === 0 ? (
        <p className="text-center text-gray-500">No missing skills to visualize.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData.sort((a, b) => b.count - a.count)}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 40, bottom: 20 }}
          >
            <XAxis type="number" allowDecimals={false} hide />
            <YAxis dataKey="skill" type="category" width={180} />
            <Tooltip cursor={{ fill: "#f3f4f6" }} />
            <Bar dataKey="count" barSize={22} radius={[4, 4, 4, 4]}>
              {chartData.map((_, idx) => (
                <Cell key={`cell-${idx}`} fill="#6366f1" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </motion.div>
  );
};

export default SkillChart;
