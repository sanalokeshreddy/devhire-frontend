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
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/analyze`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("✅ Backend response:", response.data);
      setResult(response.data); // Single resume test
    } catch (err) {
      console.error("Analysis failed", err);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">🧪 JD-Resume Tester</h2>

      <textarea
        value={jd}
        onChange={(e) => setJD(e.target.value)}
        placeholder="Paste job description..."
        rows={5}
        className="w-full border border-gray-300 rounded-lg p-4 mb-4 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-400"
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
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {result && (
        <div className="mt-8">
          <ResultCard
            matchScore={result.matchPercentage}
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
