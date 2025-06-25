import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  Sparkles, 
  Users, 
  Target, 
  Zap, 
  ArrowRight,
  FileText,
  Brain,
  BarChart3,
  Download,
  BookOpen,
  GitBranch,
  Calendar,
  TrendingUp,
  Shield,
  Layers,
  Upload,
  Search
} from 'lucide-react';

const DevHireAILanding = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('students');

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleStudentClick = () => {
    navigate('/student');
  };

  const handleRecruiterClick = () => {
    navigate('/recruiter');
  };

  const AnimatedBlob = ({ className, delay = 0 }) => (
    <div 
      className={`absolute rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse ${className}`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: '4s'
      }}
    />
  );

  const FeatureCard = ({ icon: Icon, title, description, delay, gradient }) => (
    <div 
      className={`bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl group ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`w-12 h-12 ${gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  );

  const StudentFeatures = [
    { icon: FileText, title: "Multi-JD Comparison", description: "Upload resume & compare against multiple job descriptions simultaneously", gradient: "bg-gradient-to-r from-blue-500 to-cyan-500" },
    { icon: BarChart3, title: "Match Score & Heatmap", description: "Get color-coded heatmaps showing resume-JD compatibility", gradient: "bg-gradient-to-r from-green-500 to-emerald-500" },
    { icon: Brain, title: "AI Career Mentor", description: "Personalized roadmaps with skills, courses, and project ideas", gradient: "bg-gradient-to-r from-purple-500 to-pink-500" },
    { icon: BookOpen, title: "Learning Timeline", description: "Week-wise learning plans with course recommendations", gradient: "bg-gradient-to-r from-orange-500 to-red-500" },
    { icon: GitBranch, title: "Project Inspiration", description: "GitHub links and mini-project ideas to build portfolio", gradient: "bg-gradient-to-r from-indigo-500 to-purple-500" },
    { icon: TrendingUp, title: "Skill Gap Analysis", description: "Identify missing skills and get improvement suggestions", gradient: "bg-gradient-to-r from-teal-500 to-blue-500" }
  ];

  const RecruiterFeatures = [
    { icon: Upload, title: "Bulk Resume Upload", description: "Process multiple resumes simultaneously with AI analysis", gradient: "bg-gradient-to-r from-violet-500 to-purple-500" },
    { icon: Search, title: "JD-Based Screening", description: "Analyze all candidates against job requirements using Gemini AI", gradient: "bg-gradient-to-r from-blue-500 to-indigo-500" },
    { icon: Target, title: "Smart Candidate Ranking", description: "Sort and filter candidates by match percentage and skills", gradient: "bg-gradient-to-r from-green-500 to-teal-500" },
    { icon: Download, title: "PDF Reports & CSV Export", description: "Generate detailed reports and export data for analysis", gradient: "bg-gradient-to-r from-orange-500 to-amber-500" },
    { icon: BarChart3, title: "Real-time Visualization", description: "Interactive charts and heatmaps for data-driven decisions", gradient: "bg-gradient-to-r from-pink-500 to-rose-500" },
    { icon: Shield, title: "AI-Powered Insights", description: "Get comprehensive candidate summaries and recommendations", gradient: "bg-gradient-to-r from-cyan-500 to-blue-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <AnimatedBlob className="w-96 h-96 bg-purple-400 -top-10 -left-10" delay={0} />
      <AnimatedBlob className="w-96 h-96 bg-blue-400 top-20 -right-10" delay={2} />
      <AnimatedBlob className="w-96 h-96 bg-pink-400 -bottom-20 left-1/4" delay={4} />
      <AnimatedBlob className="w-96 h-96 bg-cyan-400 -bottom-20 right-1/4" delay={1} />

      {/* Interactive Mouse Follower */}
      <div 
        className="fixed w-6 h-6 bg-white/20 rounded-full pointer-events-none z-10 transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
      />

      {/* Navigation */}
      <nav className={`relative z-20 p-6 ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                DevHire AI
              </span>
              <div className="text-xs text-gray-400 -mt-1">Resume Analyzer & Career Mentor</div>
            </div>
          </div>
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={handleStudentClick}
              className="text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              For Students
            </button>
            <button 
              onClick={handleRecruiterClick}
              className="text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              For Recruiters
            </button>
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-24">
        <div className="text-center">
          {/* Main Heading */}
          <div className={`mb-12 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
            <div className="flex justify-center items-center mb-6">
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full px-4 py-2 text-sm text-blue-300 mb-6">
                🚀 Powered by Google Gemini AI + Apache Tika
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                DevHire AI
              </span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl text-gray-300">
                Resume Analyzer & Career Mentor
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-6">
              The ultimate AI-powered platform connecting developers with career opportunities through intelligent resume analysis and personalized mentoring.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400 mb-8">
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-blue-400" />
                <span>React + Spring Boot</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>AI-Powered Matching</span>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-green-400" />
                <span>Real-time Analytics</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
            <button 
              onClick={handleStudentClick}
              className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>I'm a Student</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <button 
              onClick={handleRecruiterClick}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>I'm a Recruiter</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

          {/* Feature Tabs */}
          <div className={`mb-16 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '600ms' }} id="features">
            <div className="flex justify-center mb-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-full p-2 border border-white/20">
                <button
                  onClick={() => setActiveTab('students')}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeTab === 'students' 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  For Students & Developers
                </button>
                <button
                  onClick={() => setActiveTab('recruiters')}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeTab === 'recruiters' 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  For Recruiters
                </button>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(activeTab === 'students' ? StudentFeatures : RecruiterFeatures).map((feature, index) => (
                <FeatureCard 
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  gradient={feature.gradient}
                  delay={800 + index * 100}
                />
              ))}
            </div>
          </div>

          {/* Quick Start Section */}
          <div className={`mt-20 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '1200ms' }}>
            <h3 className="text-3xl font-bold text-white mb-8">Get Started in Seconds</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div 
                onClick={handleStudentClick}
                className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-lg rounded-2xl p-8 border border-green-500/30 hover:border-green-400/50 transition-all duration-300 cursor-pointer hover:scale-105 group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">For Students & Developers</h4>
                <p className="text-gray-300 mb-6">Upload your resume, compare it with job descriptions, and get personalized career guidance with AI-powered insights.</p>
                <div className="flex items-center text-green-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              </div>

              <div 
                onClick={handleRecruiterClick}
                className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 cursor-pointer hover:scale-105 group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">For Recruiters</h4>
                <p className="text-gray-300 mb-6">Upload multiple resumes, analyze candidates against job requirements, and get AI-powered matching insights with detailed reports.</p>
                <div className="flex items-center text-blue-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span>Find Perfect Candidates</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '1400ms' }}>
            {[
              { number: '95%', label: 'Match Accuracy', icon: Target },
              { number: '10K+', label: 'Resumes Analyzed', icon: FileText },
              { number: '500+', label: 'Career Roadmaps', icon: BookOpen },
              { number: '24/7', label: 'AI Availability', icon: Brain }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className={`mt-20 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '1600ms' }}>
            <h3 className="text-2xl font-bold text-white mb-8">Built with Modern Technology</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { name: 'React', color: 'from-blue-400 to-cyan-400' },
                { name: 'Spring Boot', color: 'from-green-400 to-emerald-400' },
                { name: 'Google Gemini AI', color: 'from-purple-400 to-pink-400' },
                { name: 'Apache Tika', color: 'from-orange-400 to-red-400' },
                { name: 'Tailwind CSS', color: 'from-cyan-400 to-blue-400' },
                { name: 'Framer Motion', color: 'from-violet-400 to-purple-400' }
              ].map((tech, index) => (
                <div 
                  key={index}
                  className={`px-6 py-3 bg-gradient-to-r ${tech.color} bg-opacity-20 backdrop-blur-sm border border-white/10 rounded-full text-white font-medium hover:scale-105 transition-transform duration-300`}
                >
                  {tech.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-30">
        <button 
          onClick={() => {
            // Scroll to top or navigate to features
            document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-14 h-14 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        >
          <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease-out forwards;
        }

        @media (max-width: 768px) {
          .text-4xl {
            font-size: 2rem;
          }
          .text-6xl {
            font-size: 3rem;  
          }
          .text-7xl {
            font-size: 3.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default DevHireAILanding;