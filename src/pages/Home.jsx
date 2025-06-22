import React, { useState } from "react";
import ResumeUploader from "../components/ResumeUploader";
import ResultCard from "../components/ResultCard";

const Home = () => {
  const [resultData, setResultData] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <ResumeUploader onResult={(result) => setResultData(result)} />
      
      {/* Render ResultCard if resultData is available */}
      {resultData && (
        <ResultCard
          matchScore={resultData.matchPercentage}
          missingSkills={resultData.missingSkills}
          suggestions={resultData.suggestions}
        />
      )}
    </div>
  );
};

export default Home;
