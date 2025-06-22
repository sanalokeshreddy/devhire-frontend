import React, { useState } from "react";
import axios from "axios";
import { ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar, Cell } from "recharts";

const JDHeatmap = () => {
  const [resumes, setResumes] = useState([]);
  const [jds, setJDs] = useState(["", "", ""]);
  const [heatmapData, setHeatmapData] = useState([]);
  const [loading, setLoading] = useState(false);

  const analyzeAll = async () => {
    if (resumes.length === 0 || jds.every((jd) => jd.trim() === "")) {
      return alert("Upload resumes and fill at least one JD.");
    }

    const allResults = [];

    setLoading(true);
    for (let jdIndex = 0; jdIndex < jds.length; jdIndex++) {
      const jdText = jds[jdIndex].trim();
      if (!jdText) continue;

      for (let i = 0; i < resumes.length; i++) {
        const formData = new FormData();
        formData.append("resumes", resumes[i]);
        formData.append("jobRole", `JD ${jdIndex + 1}`);
        formData.append("jobDescription", jdText);

        try {
          const res = await axios.post("http://localhost:8080/api/analyze", formData);
          const match = res.data[0].matchScore;
          allResults.push({
            resume: resumes[i].name,
            jd: `JD ${jdIndex + 1}`,
            score: match,
          });
        } catch (err) {
          allResults.push({
            resume: resumes[i].name,
            jd: `JD ${jdIndex + 1}`,
            score: 0,
          });
        }
      }
    }

    setHeatmapData(allResults);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-6xl mx-auto mt-12">
      <h2 className="text-xl font-bold text-gray-800 mb-4">🔥 JD-Resume Match Heatmap</h2>

      {/* JD Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {jds.map((jd, index) => (
          <textarea
            key={index}
            value={jd}
            onChange={(e) => {
              const newJDs = [...jds];
              newJDs[index] = e.target.value;
              setJDs(newJDs);
            }}
            placeholder={`Paste JD ${index + 1}`}
            rows={4}
            className="border p-2 rounded w-full"
          />
        ))}
      </div>

      {/* Resume Upload */}
      <input
        type="file"
        multiple
        accept=".pdf"
        onChange={(e) => setResumes(Array.from(e.target.files))}
        className="mb-4"
      />

      <button
        onClick={analyzeAll}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Analyzing..." : "Generate Heatmap"}
      </button>

      {/* Heatmap Chart */}
      {heatmapData.length > 0 && (
        <div className="overflow-auto mt-6">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead>
              <tr>
                <th className="border p-2">Resume</th>
                {jds.map((_, idx) => (
                  <th key={idx} className="border p-2">JD {idx + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {resumes.map((file, i) => (
                <tr key={i}>
                  <td className="border p-2 font-medium">{file.name}</td>
                  {jds.map((_, j) => {
                    const match = heatmapData.find(
                      (d) => d.resume === file.name && d.jd === `JD ${j + 1}`
                    );
                    const score = match ? match.score : 0;
                    const bg =
                      score >= 80 ? "bg-green-200" : score >= 50 ? "bg-yellow-100" : "bg-red-100";
                    return (
                      <td key={j} className={`border p-2 text-center font-semibold ${bg}`}>
                        {score.toFixed(0)}%
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JDHeatmap;
