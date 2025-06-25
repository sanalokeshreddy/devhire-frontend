import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, Target, Zap, TrendingUp } from "lucide-react";

const JDHeatmap = () => {
  const [resumes, setResumes] = useState([]);
  const [jds, setJDs] = useState(["", "", ""]);
  const [heatmapData, setHeatmapData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeAll = async () => {
    if (resumes.length === 0 || jds.every((jd) => jd.trim() === "")) {
      return alert("Upload resumes and at least one JD.");
    }

    setLoading(true);
    setError("");
    const results = [];

    try {
      for (let jdIndex = 0; jdIndex < jds.length; jdIndex++) {
        const jd = jds[jdIndex].trim();
        if (!jd) continue;

        for (const resume of resumes) {
          const formData = new FormData();
          formData.append("resume", resume);
          formData.append("jobDescription", jd);

          try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/analyze-single`, {
              method: "POST",
              body: formData,
            });

            if (!res.ok) throw new Error(`Status ${res.status}`);

            const data = await res.json();
            results.push({
              resume: resume.name,
              jd: `JD ${jdIndex + 1}`,
              score: data.matchPercentage || 0,
              missingSkills: data.missingSkills || [],
              suggestions: data.suggestions || "",
              extractedSkills: data.extractedSkills || [],
            });
          } catch (err) {
            console.error("Error:", err.message);
            results.push({
              resume: resume.name,
              jd: `JD ${jdIndex + 1}`,
              score: 0,
              missingSkills: [],
              suggestions: `Error: ${err.message}`,
              extractedSkills: [],
            });
          }
        }
      }

      setHeatmapData(results);
    } catch (err) {
      setError("Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-700 bg-green-100";
    if (score >= 75) return "text-yellow-700 bg-yellow-100";
    if (score >= 50) return "text-orange-700 bg-orange-100";
    return "text-red-700 bg-red-100";
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full shadow">
          <Target className="w-5 h-5" />
          <h1 className="text-xl font-bold">JD-Resume Match Heatmap</h1>
        </div>
        <p className="text-slate-600 mt-4">
          Upload resumes and paste job descriptions to compare
        </p>
      </div>

      {/* JD Textareas */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {jds.map((jd, idx) => (
          <textarea
            key={idx}
            value={jd}
            onChange={(e) => {
              const updated = [...jds];
              updated[idx] = e.target.value;
              setJDs(updated);
            }}
            placeholder={`Job Description ${idx + 1}`}
            className="border border-slate-300 rounded p-3 text-sm h-40 resize-none focus:ring focus:ring-blue-300"
          />
        ))}
      </div>

      {/* Resume Upload */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Upload PDF Resumes:</label>
        <input
          type="file"
          multiple
          accept=".pdf"
          onChange={(e) => setResumes(Array.from(e.target.files))}
          className="border border-slate-300 p-2 rounded w-full"
        />
        {resumes.length > 0 && (
          <p className="mt-2 text-sm text-green-600">{resumes.length} file(s) selected</p>
        )}
      </div>

      {/* Button */}
      <button
        onClick={analyzeAll}
        disabled={loading}
        className="bg-indigo-600 text-white py-2 px-5 rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Generate Heatmap"}
      </button>

      {/* Error */}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      {/* Results */}
      {heatmapData.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-bold mb-4">Results</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-slate-200">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-3 text-left">Resume</th>
                  <th className="p-3 text-left">Job Description</th>
                  <th className="p-3 text-left">Match %</th>
                  <th className="p-3 text-left">Missing Skills</th>
                  <th className="p-3 text-left">Suggestions</th>
                </tr>
              </thead>
              <tbody>
                {heatmapData.map((row, idx) => (
                  <tr key={idx} className="border-t border-slate-200">
                    <td className="p-3">{row.resume}</td>
                    <td className="p-3">{row.jd}</td>
                    <td className={`p-3 font-semibold ${getScoreColor(row.score)}`}>
                      {row.score}%
                    </td>
                    <td className="p-3">{row.missingSkills.join(", ")}</td>
                    <td className="p-3">{row.suggestions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default JDHeatmap;
