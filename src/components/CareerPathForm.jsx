import React, { useState } from "react";
import { motion } from "framer-motion";
import CareerPathResult from "./CareerPathResult";

const CareerPathForm = () => {
  const [activeTab, setActiveTab] = useState('generator');
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [interests, setInterests] = useState([]);
  const [careerSteps, setCareerSteps] = useState([]);
  const [careerResult, setCareerResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);

  const popularInterests = [
    'Machine Learning', 'Cloud Computing', 'Mobile Development', 
    'DevOps', 'UI/UX Design', 'Blockchain', 'Cybersecurity', 'Data Science'
  ];

  const addInterest = (interest) => {
    if (interest && !interests.includes(interest)) {
      setInterests([...interests, interest]);
    }
  };

  const removeInterest = (interest) => {
    setInterests(interests.filter(i => i !== interest));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleGeneratePath = async () => {
    if (!role || !skills) return alert("Please enter role and skills");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('role', role);
      formData.append('skills', skills);
      formData.append('experience', experience);
      formData.append('timeframe', timeframe);
      formData.append('interests', interests.join(', '));
      
      if (resumeFile) {
        formData.append('resume', resumeFile);
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/career-roadmap`, {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      setCareerSteps(data.timeline || []);
      setCareerResult(data);
      setActiveTab('roadmap');
    } catch (error) {
      console.error("Error generating career path:", error);
      alert("Failed to generate roadmap.");
    }

    setLoading(false);
  };

  const StatCard = ({ icon, title, value, color }) => (
    <div className={`bg-gradient-to-br ${color} p-6 rounded-xl text-white shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  );

  return (
    <motion.div
      className="bg-white shadow-2xl rounded-2xl max-w-6xl mx-auto mt-12 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-extrabold mb-2">🚀 Career Roadmap Generator</h2>
            <p className="text-purple-100">Get personalized career guidance powered by AI</p>
          </div>
          <div className="text-4xl">🎯</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'generator', label: '📝 Generator', icon: '🎯' },
            { id: 'roadmap', label: '🗺️ My Roadmap', icon: '🗺️' },
            { id: 'insights', label: '💡 Insights', icon: '📊' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id 
                  ? 'border-purple-500 text-purple-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-8">
        {/* Generator Tab */}
        {activeTab === 'generator' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Enhanced Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🎯 Target Role *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Full Stack Developer, Data Scientist"
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    💼 Experience Level
                  </label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                  >
                    <option value="">Select experience level</option>
                    <option value="entry">🌱 Entry Level (0-2 years)</option>
                    <option value="mid">🌿 Mid Level (2-5 years)</option>
                    <option value="senior">🌳 Senior Level (5+ years)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ⏰ Learning Timeframe
                  </label>
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                  >
                    <option value="">Select timeframe</option>
                    <option value="3months">⚡ 3 Months (Intensive)</option>
                    <option value="6months">🎯 6 Months (Balanced)</option>
                    <option value="1year">📈 1 Year (Comprehensive)</option>
                    <option value="2years">🏆 2 Years (Mastery)</option>
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    💻 Your Current Skills *
                  </label>
                  <textarea
                    placeholder="JavaScript, React, Node.js, Python, SQL, Git..."
                    className="w-full h-32 p-4 border border-gray-300 rounded-lg shadow-sm resize-y focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                  <p className="text-sm text-gray-500 mt-1">💡 Separate skills with commas</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🎨 Areas of Interest
                  </label>
                  {interests.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {interests.map(interest => (
                        <span 
                          key={interest} 
                          className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center space-x-2 transition-all hover:bg-purple-200"
                        >
                          <span>{interest}</span>
                          <button 
                            onClick={() => removeInterest(interest)}
                            className="text-purple-500 hover:text-purple-700 font-bold"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {popularInterests.filter(i => !interests.includes(i)).map(interest => (
                      <button
                        key={interest}
                        onClick={() => addInterest(interest)}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-all flex items-center space-x-1"
                      >
                        <span>+</span>
                        <span>{interest}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Resume Upload Section */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Your Resume (Optional)</h3>
              <p className="text-gray-600 mb-4">Get more personalized recommendations</p>
              
              {resumeFile ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <p className="text-green-700 font-medium">✅ {resumeFile.name} uploaded successfully!</p>
                </div>
              ) : null}
              
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
                id="resume-upload"
              />
              <label
                htmlFor="resume-upload"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer inline-block"
              >
                📁 Choose PDF File
              </label>
            </div>

            {/* Generate Button */}
            <motion.button
              onClick={handleGeneratePath}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-4 px-6 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Generating Your Roadmap...</span>
                </span>
              ) : (
                "✨ Generate My Career Roadmap"
              )}
            </motion.button>
          </motion.div>
        )}

        {/* Roadmap Tab */}
        {activeTab === 'roadmap' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {careerResult ? (
              <>
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <StatCard 
                    icon="🎯" 
                    title="Match Score" 
                    value="85%" 
                    color="from-green-500 to-emerald-600" 
                  />
                  <StatCard 
                    icon="📚" 
                    title="Skills to Learn" 
                    value={careerResult.missingSkills?.length || 0} 
                    color="from-blue-500 to-indigo-600" 
                  />
                  <StatCard 
                    icon="⏰" 
                    title="Timeline" 
                    value={timeframe || '6 months'} 
                    color="from-purple-500 to-violet-600" 
                  />
                  <StatCard 
                    icon="🏆" 
                    title="Progress" 
                    value="0%" 
                    color="from-orange-500 to-red-600" 
                  />
                </div>

                {/* Enhanced Career Path Result */}
                <CareerPathResult result={careerResult} />
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Roadmap Generated Yet</h3>
                <p className="text-gray-600 mb-6">Generate your personalized career roadmap to see it here</p>
                <button
                  onClick={() => setActiveTab('generator')}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Go to Generator
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Insights Tab */}
        {activeTab === 'insights' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Market Trends */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <span>📈</span>
                <span>Market Insights</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-2">💰 Salary Range</h4>
                  <p className="text-2xl font-bold text-blue-600">$70K - $120K</p>
                  <p className="text-gray-600 text-sm">For {role || 'Target Role'}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-2">📊 Job Demand</h4>
                  <p className="text-2xl font-bold text-green-600">High</p>
                  <p className="text-gray-600 text-sm">15% growth expected</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-2">🏢 Top Companies</h4>
                  <p className="text-2xl font-bold text-purple-600">500+</p>
                  <p className="text-gray-600 text-sm">Hiring for this role</p>
                </div>
              </div>
            </div>

            {/* Learning Resources */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <span>📚</span>
                <span>Top Learning Resources</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-gray-900 mb-2">🎓 Online Courses</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Coursera - Full Stack Development</li>
                    <li>• Udemy - React Complete Guide</li>
                    <li>• Pluralsight - Node.js Path</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-gray-900 mb-2">👥 Communities</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Stack Overflow</li>
                    <li>• Reddit - WebDev</li>
                    <li>• Discord - Developer Communities</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Practice Platforms */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <span>💻</span>
                <span>Practice Platforms</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <div className="text-2xl mb-2">🧠</div>
                  <h4 className="font-medium text-gray-900">LeetCode</h4>
                  <p className="text-gray-600 text-sm">Algorithm Practice</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <div className="text-2xl mb-2">🏗️</div>
                  <h4 className="font-medium text-gray-900">GitHub</h4>
                  <p className="text-gray-600 text-sm">Project Hosting</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <div className="text-2xl mb-2">🎨</div>
                  <h4 className="font-medium text-gray-900">CodePen</h4>
                  <p className="text-gray-600 text-sm">Frontend Practice</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CareerPathForm;