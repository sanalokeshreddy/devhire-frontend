import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ResumeUploader from "./components/ResumeUploader";
import ResultCard from "./components/ResultCard";
import SkillChart from "./components/SkillChart";
import FilterSortBar from "./components/FilterSortBar";
import JDHeatmap from "./components/JDHeatmap";
import CareerPathForm from "./components/CareerPathForm";
import { AnimatePresence, motion } from "framer-motion";
import EnhancedLandingPage from './components/EnhancedLandingPage';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition = {
  type: "spring",
  stiffness: 50,
  damping: 20,
};

const HomePage = () => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
    className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-6"
  >
    <h1 className="text-4xl font-bold text-center text-blue-800 mb-8 animate-pulse">
      Welcome to DevHire AI 🌟
    </h1>
    <div className="flex flex-col sm:flex-row gap-6">
      <Link
        to="/student"
        className="bg-green-500 hover:bg-green-600 transition-all duration-300 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transform hover:scale-105"
      >
        🎓 I'm a Student
      </Link>
      <Link
        to="/recruiter"
        className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transform hover:scale-105"
      >
        🧑‍💼 I'm a Recruiter
      </Link>
    </div>
  </motion.div>
);

const StudentPage = () => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
    className="p-6 min-h-screen bg-gradient-to-br from-blue-50 to-white"
  >
    <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
      DevHire AI – Student Portal 🚀
    </h1>
    <JDHeatmap />
    <div className="mt-10">
      <h2 className="text-2xl font-semibold text-purple-700 mb-4 text-center">
        Career Roadmap Generator
      </h2>
      <CareerPathForm />
    </div>
  </motion.div>
);

const RecruiterPage = () => {
  const [results, setResults] = React.useState([]);
  const [jobRole, setJobRole] = React.useState("Java Backend Developer");
  const [filterScore, setFilterScore] = React.useState(0);
  const [sortOrder, setSortOrder] = React.useState("desc");

  const filteredResults = results
    .filter((res) => res.matchScore >= filterScore)
    .sort((a, b) =>
      sortOrder === "asc" ? a.matchScore - b.matchScore : b.matchScore - a.matchScore
    );

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="p-6 min-h-screen bg-gradient-to-br from-white to-blue-50"
    >
      <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        DevHire AI – Recruiter Dashboard 📂
      </h1>
      <ResumeUploader
        onResults={setResults}
        jobRole={jobRole}
        setJobRole={setJobRole}
      />
      {results.length > 0 && (
        <>
          <FilterSortBar
            filterScore={filterScore}
            setFilterScore={setFilterScore}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />

          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Analysis Results
          </h2>
          {filteredResults.map((result, idx) => (
            <ResultCard key={idx} result={result} />
          ))}
          <SkillChart resumeResults={filteredResults} selectedRole={jobRole} />
        </>
      )}
    </motion.div>
  );
};

const App = () => (
  <Router>
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<EnhancedLandingPage />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/recruiter" element={<RecruiterPage />} />
      </Routes>
    </AnimatePresence>
  </Router>
);

export default App;
