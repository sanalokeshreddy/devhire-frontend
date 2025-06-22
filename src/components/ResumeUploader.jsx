import React, { useState } from "react";
import axios from "axios";
import ResultCard from "./ResultCard";
import SkillChart from "./SkillChart";
// import SkillMatrix from "./SkillMatrix";
import skillBenchmarks from "../skillsConfig";
import { downloadAllPDFs } from "../utils/downloadAllPDFs";
import { exportToCSV } from "../utils/exportToCSV";

const ResumeUploader = () => {
  const [files, setFiles] = useState([]);
  const [jobRole, setJobRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [results, setResults] = useState([]);
  const [filterScore, setFilterScore] = useState(0);
  const [sortOrder, setSortOrder] = useState("desc");
  const [extractedSkills, setExtractedSkills] = useState([]);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jobRole || files.length === 0) {
      alert("Please provide a job role and at least one resume.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("resumes", file));
    formData.append("jobRole", jobRole);
    formData.append("jobDescription", jobDescription);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/analyze`, formData, {
  headers: { "Content-Type": "multipart/form-data" },
});
      setResults(response.data);
    } catch (error) {
      console.error("Error uploading resumes:", error);
      alert("Failed to analyze resumes.");
    }
  };

  const handleExtractSkills = async () => {
    if (!jobDescription.trim()) {
      alert("Please enter a Job Description first.");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/extract-skills`, {
      jobDescription,
      });

      setExtractedSkills(response.data);
    } catch (error) {
      console.error("Error extracting skills:", error);
      alert("Failed to extract skills from JD.");
    }
  };

  const filteredSortedResults = results
    .filter((res) => res.matchPercentage >= filterScore)
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.matchPercentage - b.matchPercentage
        : b.matchPercentage - a.matchPercentage
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        DevHire AI – Resume Analyzer
      </h2>

      {/* Job Role Input */}
      <input
        type="text"
        placeholder="Enter Job Role (e.g., Java Backend Developer)"
        className="w-full p-3 border border-gray-300 rounded mb-4"
        value={jobRole}
        onChange={(e) => setJobRole(e.target.value)}
      />

      {/* JD Input & Skill Extraction */}
      <div className="mb-4">
        <textarea
          placeholder="Paste Job Description (Optional)"
          className="w-full p-3 border border-gray-300 rounded resize-y mb-2"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <button
          onClick={handleExtractSkills}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Extract Skills
        </button>

        {extractedSkills.length > 0 && (
          <div className="mt-3">
            <p className="font-medium text-sm text-gray-700 mb-1">
              🔑 Extracted Skills:
            </p>
            <div className="flex flex-wrap gap-2">
              {extractedSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Resume Upload */}
      <input
        type="file"
        accept=".pdf"
        multiple
        onChange={handleFileChange}
        className="mb-4"
      />

      {/* Analyze Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
      >
        Analyze Resumes
      </button>

      {/* Results Section */}
      {results.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Analysis Results
          </h3>

          <div className="mb-6 bg-blue-50 p-4 rounded-lg shadow-md">
            <p className="text-sm text-gray-700">
              <strong>Analyzing for:</strong>{" "}
              <span className="text-blue-700">{jobRole}</span>
            </p>
            {jobDescription && (
              <p className="text-sm text-gray-600 mt-2 whitespace-pre-wrap">
                <strong>Job Description:</strong> {jobDescription}
              </p>
            )}
          </div>

          {/* Filter and Sort */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div>
              <label className="font-semibold">Minimum Match Score: </label>
              <input
                type="number"
                value={filterScore}
                onChange={(e) => setFilterScore(Number(e.target.value))}
                className="border rounded px-2 py-1 ml-2 w-20"
                min={0}
                max={100}
              />
            </div>
            <div>
              <label className="font-semibold">Sort by Score: </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border rounded px-2 py-1 ml-2"
              >
                <option value="desc">High to Low</option>
                <option value="asc">Low to High</option>
              </select>
            </div>
          </div>

          {/* Download / Export */}
          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={() => downloadAllPDFs(filteredSortedResults)}
              className="bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700 transition"
            >
              Download All Reports
            </button>
            <button
              onClick={() => exportToCSV(filteredSortedResults)}
              className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-600 transition"
            >
              Export as CSV
            </button>
          </div>

          {/* Top 3 Recommendations */}
          {filteredSortedResults.length >= 3 && (
            <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <h3 className="text-lg font-bold text-yellow-700 mb-2">
                ⭐ Top 3 Recommended Candidates
              </h3>
              <ul className="list-decimal list-inside space-y-1 text-gray-800">
                {filteredSortedResults.slice(0, 3).map((res, idx) => (
                  <li key={idx}>
                    <strong>{res.fileName || `Resume_${idx + 1}`}</strong> –{" "}
                    Match Score:{" "}
                    <span className="text-blue-600 font-semibold">
                      {res.matchPercentage.toFixed(2)}%
                    </span>{" "}
                    | Missing Skills:{" "}
                    <span className="text-red-500 font-semibold">
                      {res.missingSkills.length}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Result Cards */}
          {filteredSortedResults.map((res, index) => (
            <ResultCard
              key={index}
              matchScore={res.matchPercentage}
              missingSkills={res.missingSkills}
              suggestions={res.suggestions}
              filename={res.fileName || `Resume_${index + 1}`}
              extractedSkills={extractedSkills}
              summary={res.summary || ""}
            />
          ))}

          {/* Skill Matrix */}
          {/* <SkillMatrix
            extractedSkills={extractedSkills}
            results={filteredSortedResults}
          /> */}

          {/* Skill Chart */}
          {skillBenchmarks[jobRole] && (
            <SkillChart
              resumeResults={filteredSortedResults}
              selectedRole={jobRole}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeUploader;
