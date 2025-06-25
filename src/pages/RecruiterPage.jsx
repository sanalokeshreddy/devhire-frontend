import React, { useState } from "react";
import ResumeUploader from "../components/ResumeUploader";
import JDHeatmap from "../components/JDHeatmap";
import FilterSortBar from "../components/FilterSortBar";
import SkillChart from "../components/SkillChart";
import ResultCard from "../components/ResultCard";
import { motion } from "framer-motion";

const RecruiterPage = () => {
  const [results, setResults] = useState([]);
  const [jobRole, setJobRole] = useState("");
  const [filterScore, setFilterScore] = useState(0);
  const [sortOrder, setSortOrder] = useState("desc");

  const filteredResults = results
    .filter((res) => res.matchPercentage >= filterScore)
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.matchPercentage - b.matchPercentage
        : b.matchPercentage - a.matchPercentage
    );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Header */}
      <motion.div
        className="bg-gradient-to-r from-blue-700 to-purple-700 py-12 text-center text-white shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-extrabold mb-2">🧑‍💼 Recruiter Dashboard</h1>
        <p className="text-lg opacity-90">
          Upload multiple resumes, compare them across job descriptions, and download insights.
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="mt-10 px-4 md:px-12">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <JDHeatmap />
        </motion.section>

        <motion.section
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ResumeUploader
            onResults={setResults}
            jobRole={jobRole}
            setJobRole={setJobRole}
          />
        </motion.section>

        {results.length > 0 && (
          <motion.div
            className="mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <FilterSortBar
              filterScore={filterScore}
              setFilterScore={setFilterScore}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />

            <div className="mt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                📊 Candidate Match Results
              </h2>
              {filteredResults.map((res, index) => (
                <ResultCard
                  key={index}
                  matchScore={res.matchPercentage}
                  missingSkills={res.missingSkills}
                  suggestions={res.suggestions}
                  filename={res.fileName || `Resume_${index + 1}`}
                  extractedSkills={[]}
                  summary={res.summary || ""}
                  targetRole={res.targetRole || ""}
                  courses={res.courses || []}
                  miniProject={res.miniProject || ""}
                  timeline={res.timeline || []}
                  githubLinks={res.githubLinks || []}
                />
              ))}
            </div>

            {jobRole && (
              <div className="mt-12">
                <SkillChart resumeResults={filteredResults} selectedRole={jobRole} />
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RecruiterPage;
