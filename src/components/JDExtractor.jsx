import React, { useState } from 'react';
import axios from 'axios';

const JDExtractor = () => {
  const [jdText, setJdText] = useState('');
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleExtract = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:8080/api/extract-skills', {
        jobDescription: jdText,
      });

      setSkills(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to extract skills. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">📝 JD Skill Extractor</h2>

      <textarea
        className="w-full h-40 border border-gray-300 rounded-lg p-4 text-sm focus:outline-none focus:ring focus:ring-blue-400"
        placeholder="Paste your job description here..."
        value={jdText}
        onChange={(e) => setJdText(e.target.value)}
      />

      <button
        onClick={handleExtract}
        disabled={loading || !jdText.trim()}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
      >
        🚀 Extract Skills
      </button>

      {loading && <p className="mt-4 text-gray-500">Extracting skills using Gemini...</p>}

      {error && <p className="mt-4 text-red-500 font-medium">{error}</p>}

      {skills.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">🔍 Extracted Skills:</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JDExtractor;
