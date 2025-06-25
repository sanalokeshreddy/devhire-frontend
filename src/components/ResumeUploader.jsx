import React, { useState } from "react";
import axios from "axios";
import ResultCard from "./ResultCard";
import SkillChart from "./SkillChart";
import skillBenchmarks from "../skillsConfig";
import { downloadAllPDFs } from "../utils/downloadAllPDFs";
import { exportToCSV } from "../utils/exportToCSV";
import { motion } from "framer-motion";

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
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/analyze`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
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
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/extract-skills`,
        { jobDescription }
      );
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
    <motion.div
      className="mt-10 max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.input
        type="text"
        placeholder="Enter Job Role (e.g., Java Backend Developer)"
        className="w-full p-3 border border-gray-300 rounded mb-4 shadow-sm"
        value={jobRole}
        onChange={(e) => setJobRole(e.target.value)}
        whileFocus={{ scale: 1.02 }}
      />

      <motion.div className="mb-4">
        <textarea
          placeholder="Paste Job Description (Optional)"
          className="w-full p-3 border border-gray-300 rounded resize-y mb-2 shadow-sm"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <motion.button
          onClick={handleExtractSkills}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          whileHover={{ scale: 1.05 }}
        >
          Extract Skills
        </motion.button>

        {extractedSkills.length > 0 && (
          <div className="mt-3">
            <p className="font-medium text-sm text-gray-700 mb-1">
              🔑 Extracted Skills:
            </p>
            <div className="flex flex-wrap gap-2">
              {extractedSkills.map((skill, idx) => (
                <motion.span
                  key={idx}
                  className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full"
                  whileHover={{ scale: 1.1 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      <motion.input
        type="file"
        accept=".pdf"
        multiple
        onChange={handleFileChange}
        className="mb-4"
        whileFocus={{ scale: 1.02 }}
      />

      <motion.button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        whileHover={{ scale: 1.03 }}
      >
        Analyze Resumes
      </motion.button>

      {results.length > 0 && (
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
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

          <div className="flex flex-wrap gap-4 mb-6">
            <motion.button
              onClick={() => downloadAllPDFs(filteredSortedResults)}
              className="bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700 transition"
              whileHover={{ scale: 1.05 }}
            >
              Download All Reports
            </motion.button>
            <motion.button
              onClick={() => exportToCSV(filteredSortedResults)}
              className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-600 transition"
              whileHover={{ scale: 1.05 }}
            >
              Export as CSV
            </motion.button>
          </div>

          {filteredSortedResults.length >= 3 && (
            <motion.div
              className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-bold text-yellow-700 mb-2">
                ⭐ Top 3 Recommended Candidates
              </h3>
              <ul className="list-decimal list-inside space-y-1 text-gray-800">
                {filteredSortedResults.slice(0, 3).map((res, idx) => (
                  <li key={idx}>
                    <strong>{res.fileName || `Resume_${idx + 1}`}</strong> – Match Score: <span className="text-blue-600 font-semibold">{res.matchPercentage.toFixed(2)}%</span> | Missing Skills: <span className="text-red-500 font-semibold">{res.missingSkills.length}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {filteredSortedResults.map((res, index) => (
            <ResultCard
              key={index}
              matchScore={res.matchPercentage}
              missingSkills={res.missingSkills}
              suggestions={res.suggestions}
              filename={res.fileName || `Resume_${index + 1}`}
              extractedSkills={extractedSkills}
              summary={res.summary || ""}
              targetRole={res.targetRole || ""}
              courses={res.courses || []}
              miniProject={res.miniProject || ""}
              timeline={res.timeline || []}
              githubLinks={res.githubLinks || []}
            />
          ))}

          {skillBenchmarks[jobRole] && (
            <SkillChart
              resumeResults={filteredSortedResults}
              selectedRole={jobRole}
            />
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ResumeUploader;
