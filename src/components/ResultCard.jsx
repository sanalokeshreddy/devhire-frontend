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
import { motion } from 'framer-motion';

const ResultCard = ({
  matchScore = 2,
  missingSkills = [],
  suggestions = '',
  filename = 'Resume',
  extractedSkills = [],
  summary = '',
  targetRole = '',
  courses = [],
  miniProject = '',
  timeline = [],
  githubLinks = [],
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

  const normalizedMissing = missingSkills.map((s) => s.toLowerCase().trim());

  return (
    <motion.div
      id={`report-${filename}`}
      className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-3xl mx-auto mt-10"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-extrabold mb-6 text-blue-900 text-center">
        📄 {filename}
      </h2>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <h3 className="text-lg font-semibold">🎯 Match Score</h3>
        <div className="w-full bg-gray-200 rounded-full h-5 mb-2 overflow-hidden">
          <div
            className={`${progressColor} h-5 transition-all duration-700 ease-in-out`}
            style={{ width: `${matchScore}%` }}
          />
        </div>
        <p className="text-center font-medium text-lg">
          {matchScore.toFixed(2)}%
        </p>
      </motion.div>

      {summary && (
        <motion.div className="mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <h3 className="text-lg font-semibold mb-2">🧠 AI Summary</h3>
          <p className="text-gray-700 bg-gray-50 p-4 rounded shadow-inner">
            {summary}
          </p>
        </motion.div>
      )}

      {extractedSkills.length > 0 && (
        <motion.div className="mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <h3 className="text-lg font-semibold mb-2">🧠 JD Skill Match Overview</h3>
          <div className="flex flex-wrap gap-2">
            {extractedSkills.map((skill, idx) => {
              const isMissing = normalizedMissing.includes(skill.toLowerCase().trim());
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
        </motion.div>
      )}

      {missingSkills.length > 0 && (
        <motion.div className="mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <h3 className="text-lg font-semibold mb-2">📋 Missing Skills</h3>
          <div className="flex flex-wrap gap-2">
            {missingSkills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {suggestions && (
        <motion.div className="mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <h3 className="text-lg font-semibold mb-2">💡 Suggestions</h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            {suggestions
              .split('. ')
              .map((point, idx) =>
                point.trim() ? (
                  <li key={idx}>{point.trim().replace(/\.$/, '')}.</li>
                ) : null
              )}
          </ul>
        </motion.div>
      )}

      {missingSkills.length > 0 && (
        <motion.div className="mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <h3 className="text-lg font-semibold mb-2">📊 Skill Match Overview</h3>
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
        </motion.div>
      )}

      {targetRole && (
        <motion.div className="mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          <h3 className="text-xl font-bold text-purple-700 mb-2">🎯 Target Role</h3>
          <p className="text-md text-gray-800 mb-4">{targetRole}</p>

          <h3 className="text-xl font-bold text-red-500 mb-2">💬 Missing Skills</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {missingSkills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>

          <h3 className="text-xl font-bold text-blue-700 mb-2">📚 Recommended Courses</h3>
          <ul className="list-disc list-inside mb-4 text-gray-800">
            {courses.map((course, idx) => (
              <li key={idx}>{course}</li>
            ))}
          </ul>

          <h3 className="text-xl font-bold text-yellow-600 mb-2">💡 Mini Project Suggestion</h3>
          <p className="text-gray-800 mb-4">{miniProject}</p>

          <h3 className="text-xl font-bold text-green-600 mb-2">🗓 Suggested Timeline</h3>
          <ol className="list-decimal list-inside text-gray-800 mb-4 space-y-1">
            {timeline.map((item, idx) => (
              <li key={idx}>
                <strong>{item.week}:</strong> {item.focus}
              </li>
            ))}
          </ol>

          <h3 className="text-xl font-bold text-indigo-700 mb-2">🔗 GitHub Inspiration</h3>
          <ul className="list-disc list-inside text-blue-600">
            {githubLinks.map((link, idx) => (
              <li key={idx}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        <button
          onClick={downloadReport}
          className="mt-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-5 py-2 rounded-lg shadow transition"
        >
          ⬇️ Download Report
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ResultCard;