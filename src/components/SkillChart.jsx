import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import skillBenchmarks from "../skillsConfig";

function SkillChart({ resumeResults, selectedRole }) {
  const expectedSkills = skillBenchmarks[selectedRole] || [];

  const skillFrequency = {};

  resumeResults.forEach(result => {
    result.missingSkills
      .filter(skill => expectedSkills.includes(skill))
      .forEach(skill => {
        skillFrequency[skill] = (skillFrequency[skill] || 0) + 1;
      });
  });

  const data = Object.entries(skillFrequency).map(([skill, count]) => ({
    skill,
    count
  }));

  return (
    <div className="mt-8 bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">🔍 Missing Skills for "{selectedRole}"</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="skill" type="category" width={200} />
          <Tooltip />
          <Bar dataKey="count" fill="#60a5fa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SkillChart;
