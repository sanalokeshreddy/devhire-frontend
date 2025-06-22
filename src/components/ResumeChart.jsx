import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const ResumeChart = ({ data }) => {
  const chartData = data.map((res, index) => ({
    name: res.fileName || `Resume ${index + 1}`,
    score: res.matchPercentage,
  }));

  return (
    <div className="bg-white p-4 shadow-md rounded-lg mt-8">
      <h3 className="text-lg font-semibold mb-4 text-blue-700">📊 Resume Match Scores</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Bar dataKey="score" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResumeChart;
