import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const ResultCard = ({
  matchScore = 0,
  missingSkills = [],
  suggestions = '',
  filename = 'Resume',
  extractedSkills = [],
  summary = '',
}) => {
  const progressColor =
    matchScore >= 80
      ? 'bg-green-500'
      : matchScore >= 50
      ? 'bg-yellow-400'
      : 'bg-red-400';

  const downloadReport = async () => {
    const input = document.getElementById(`report-${filename}`);
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save(`${filename}-DevHire-Report.pdf`);
  };

  const normalizedMissing = missingSkills.map((s) =>
    s.toLowerCase().trim()
  );

  return (
    <div
      id={`report-${filename}`}
      className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-2xl mx-auto mt-10"
    >
      <h2 className="text-xl font-bold mb-1 text-blue-900">{filename}</h2>

      {/* Match Score */}
      <h3 className="text-lg font-semibold mt-4">🎯 Match Score</h3>
      <div className="w-full bg-gray-200 rounded-full h-5 mb-2 overflow-hidden">
        <div
          className={`${progressColor} h-5 transition-all duration-700 ease-in-out`}
          style={{ width: `${matchScore}%` }}
        />
      </div>
      <p className="text-center font-medium text-lg">
        {matchScore.toFixed(2)}%
      </p>

      {/* AI Summary */}
      {summary && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">🧠 AI Summary</h3>
          <p className="text-gray-700 bg-gray-50 p-4 rounded shadow">
            {summary}
          </p>
        </div>
      )}

      {/* JD Skill Match Overview */}
      {extractedSkills.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">
            🧠 JD Skill Match Overview
          </h3>
          <div className="flex flex-wrap gap-2">
            {extractedSkills.map((skill, idx) => {
              const normalizedSkill = skill.toLowerCase().trim();
              const isMissing = normalizedMissing.includes(
              skill.toLowerCase().trim()
              );

              return (
                <span
                  key={idx}
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    isMissing
                      ? 'bg-red-100 text-red-700 line-through'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {skill}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Missing Skills */}
      <h3 className="text-lg font-semibold mt-6 mb-2">📋 Missing Skills</h3>
      <div className="flex flex-wrap gap-2">
        {missingSkills.length > 0 ? (
          missingSkills.map((skill, index) => (
            <span
              key={index}
              className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))
        ) : (
          <p className="text-gray-500">No missing skills detected!</p>
        )}
      </div>

      {/* Suggestions */}
      <h3 className="text-lg font-semibold mt-6 mb-2">💡 Suggestions</h3>
      {suggestions ? (
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          {suggestions
            .split('. ')
            .map((point, index) =>
              point.trim() ? (
                <li key={index}>{point.trim().replace(/\.$/, '')}.</li>
              ) : null
            )}
        </ul>
      ) : (
        <p className="text-gray-500">No suggestions available.</p>
      )}

      {/* Skill Match Chart */}
      {missingSkills.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold text-gray-700 mb-2">
            📊 Skill Match Overview
          </h3>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart
              layout="vertical"
              data={[
                { name: 'Matched Skills', value: matchScore },
                { name: 'Missing Skills', value: 100 - matchScore },
              ]}
            >
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Bar dataKey="value" barSize={30}>
                <Cell fill="#4ade80" />
                <Cell fill="#f87171" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Download Button */}
      <button
        onClick={downloadReport}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
      >
        ⬇️ Download Report
      </button>
    </div>
  );
};

export default ResultCard;
