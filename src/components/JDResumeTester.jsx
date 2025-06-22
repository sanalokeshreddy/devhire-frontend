import React, { useState } from "react";
import axios from "axios";
import ResultCard from "./ResultCard";

const JDResumeTester = () => {
  const [jd, setJD] = useState("");
  const [resume, setResume] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!jd || !resume) return alert("Please provide both JD and Resume");

    const formData = new FormData();
    formData.append("resumes", resume);
    formData.append("jobRole", "Custom JD Test");
    formData.append("jobDescription", jd);

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8080/api/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(response.data[0]); // Single resume test
    } catch (err) {
      console.error("Analysis failed", err);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-4xl mx-auto my-10">
      <h2 className="text-xl font-bold text-gray-800 mb-3">🧪 JD-Resume Tester</h2>

      <textarea
        value={jd}
        onChange={(e) => setJD(e.target.value)}
        placeholder="Paste job description..."
        rows={5}
        className="w-full border border-gray-300 p-3 rounded-lg mb-3"
      />

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setResume(e.target.files[0])}
        className="mb-4"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {result && (
        <div className="mt-6">
          <ResultCard
            matchScore={result.matchScore}
            missingSkills={result.missingSkills}
            suggestions={result.suggestions}
            filename={result.filename}
            extractedSkills={[]}
            summary={result.summary}
          />
        </div>
      )}
    </div>
  );
};

export default JDResumeTester;
