import React, { useState } from "react";
import JDResumeTester from "./components/JDResumeTester";
import ResumeUploader from "./components/ResumeUploader";
import ResultCard from "./components/ResultCard";
import SkillChart from "./components/SkillChart";
import FilterSortBar from "./components/FilterSortBar";
import JDExtractor from "./components/JDExtractor"; // ✅ NEW
import JDHeatmap from "./components/JDHeatmap";
function App() {
  const [results, setResults] = useState([]);
  const [jobRole, setJobRole] = useState("Java Backend Developer");
  const [filterScore, setFilterScore] = useState(0);
  const [sortOrder, setSortOrder] = useState("desc");

  const filteredResults = results
    .filter((res) => res.matchScore >= filterScore)
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.matchScore - b.matchScore
        : b.matchScore - a.matchScore
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center text-blue-800 mb-6">
        DevHire AI – Resume Analyzer
      </h1>
      <JDResumeTester />
      {/* ✅ Add JD Skill Extractor UI */}
      <JDExtractor />
      <JDHeatmap />


      {/* Resume Upload + Analysis Section */}
      <ResumeUploader onResults={setResults} jobRole={jobRole} setJobRole={setJobRole} />

      {results.length > 0 && (
        <>
          <FilterSortBar
            filterScore={filterScore}
            setFilterScore={setFilterScore}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />

          <h2 className="text-xl font-semibold text-gray-800 mb-2">Analysis Results</h2>
          {filteredResults.map((result, idx) => (
            <ResultCard key={idx} result={result} />
          ))}
          <SkillChart resumeResults={filteredResults} selectedRole={jobRole} />
        </>
      )}
    </div>
  );
}

export default App;
