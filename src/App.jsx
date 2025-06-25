import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import EnhancedLandingPage from './components/EnhancedLandingPage';
import StudentPage from "./pages/StudentPage";
import RecruiterPage from "./pages/RecruiterPage";

const AnimatedPage = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

function App() {
  return (
    <Router>
      <Navbar />
      <div className="bg-gradient-to-br from-white via-blue-50 to-blue-100 min-h-screen font-sans">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<EnhancedLandingPage />} />
            <Route
              path="/student"
              element={
                <AnimatedPage>
                  <StudentPage />
                </AnimatedPage>
              }
            />
            <Route
              path="/recruiter"
              element={
                <AnimatedPage>
                  <RecruiterPage />
                </AnimatedPage>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
