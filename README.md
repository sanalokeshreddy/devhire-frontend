# 📌 DevHire AI – Resume Analyzer (Frontend)

This is the React-based frontend for **DevHire AI**, a full-stack web application designed to help recruiters analyze and evaluate resumes using **Google Gemini AI**.

🌐 **Live Demo**: [https://devhire-frontend.vercel.app](https://devhire-frontend.vercel.app)

---

## 🧠 Features

- 🔼 Upload multiple resumes (PDF)
- 📥 Enter job role or paste job description
- 📊 Visual skill match via bar charts (Recharts)
- ✅ AI-predicted match score for each resume
- 📋 Matched vs missing skills display
- 💡 Gemini AI suggestions for resume improvement
- 🔍 Filter and ↕️ sort resumes by match score
- 📄 Download individual PDF reports
- 📦 Export all reports together
- 📌 Real-time JD-based skill extraction

---

## 🛠️ Tech Stack

- **React.js**
- **Tailwind CSS**
- **Axios** – API requests
- **Recharts** – Data visualization
- **html2canvas & jsPDF** – Report export
- **Deployed on Vercel**

---

## 📁 Folder Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   ├── App.js
│   └── index.js
├── .env
├── package.json
└── tailwind.config.js
```

---

## 🔧 Environment Variable

Create a `.env` file:
```
REACT_APP_API_URL=https://devhire-backend-6h12.onrender.com
```

---

## ▶️ Run Locally

```bash
cd frontend
npm install
npm start
```

---

## 🚀 Deployment

- Auto-deployed via **Vercel** on every push to `main`.

---
