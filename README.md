# DevHire AI - Frontend

## 🚀 Overview

DevHire AI Frontend is the user-facing application for an AI-powered recruitment and career guidance platform. It allows students and developers to get personalized career roadmaps and analyze their resumes against job descriptions. For recruiters, it provides tools to efficiently screen resumes and find the best candidates.

The application leverages Gemini AI through a Spring Boot backend to deliver intelligent resume analysis, skill extraction, and personalized career planning.

## ✨ Features

**For Students & Developers:**

* **Multi-JD Comparison (JD-Resume Match Heatmap):** Upload your resume and compare it against multiple job descriptions simultaneously, visualized with a color-coded heatmap showing compatibility.
* **AI Career Mentor:** Get personalized roadmaps with skills, courses, and project ideas tailored to your career goals.
* **Learning Timeline:** Week-wise learning plans with course recommendations to help you achieve your career aspirations.
* **Project Inspiration:** Discover GitHub links and mini-project ideas to build a strong portfolio.
* **Skill Gap Analysis:** Identify missing skills for your target role and receive suggestions for improvement.

**For Recruiters:**

* **Resume Analysis & Job Fit Scoring:** Upload multiple resumes and analyze them against a job description to get a match percentage, identify missing skills, and receive improvement suggestions.
* **AI Skill Extractor:** Paste a job description to automatically extract relevant skills using Gemini AI.

## 🛠️ Tech Stack

* **React.js:** A JavaScript library for building user interfaces.
* **Vite (or CRA):** A fast build tool for modern web projects.
* **Tailwind CSS:** A utility-first CSS framework for rapidly styling.
* **Framer Motion:** A production-ready motion library for React.
* **Axios:** A promise-based HTTP client for the browser and Node.js.

## ⚙️ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/devhire-ai-frontend.git](https://github.com/your-username/devhire-ai-frontend.git)
    cd devhire-ai-frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root of the project and add your backend API URL:
    ```
    VITE_REACT_APP_API_URL=[https://your-backend.onrender.com](https://your-backend.onrender.com)
    ```
    *Replace `https://your-backend.onrender.com` with the actual URL of your deployed backend.*

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application will typically be available at `http://localhost:5173`.

## 🚀 Deployment

The frontend is designed for easy deployment on platforms like Vercel.

* **Vercel:** Connect your GitHub repository to Vercel, and it will automatically deploy on every `git push` to your main branch. Ensure your `VITE_REACT_APP_API_URL` environment variable is set correctly in Vercel's project settings.

## 📸 Screenshots

Here are some screenshots showcasing the different sections and features of the DevHire AI platform:

### Landing Page
*(This is the main entry point where users choose between "Student" or "Recruiter" portals.)*
![Landing Page](https://github.com/your-username/devhire-ai-frontend/blob/main/screenshots/landing-page.jpg?raw=true)

### Get Started Section
*(Highlights the two main user categories: Students & Developers and Recruiters.)*
![Get Started Section](https://github.com/your-username/devhire-ai-frontend/blob/main/screenshots/get-started-section.jpg?raw=true)

### Student & Developer Features Overview
*(Displays the various features available for Students & Developers, such as Multi-JD Comparison, Match Score & Heatmap, AI Career Mentor, etc.)*
![Student & Developer Features Overview](https://github.com/your-username/devhire-ai-frontend/blob/main/screenshots/student-developer-features.jpg?raw=true)

### Student Portal - JD-Resume Match Heatmap Input
*(Allows students to upload resumes and paste job descriptions for comparison.)*
![Student Portal - JD-Resume Match Heatmap Input](https://github.com/your-username/devhire-ai-frontend/blob/main/screenshots/jd-resume-match-heatmap-input.jpg?raw=true)

### Student Portal - Career Roadmap Generator Input
*(Enables users to input details and generate a personalized career roadmap.)*
![Student Portal - Career Roadmap Generator Input](https://github.com/your-username/devhire-ai-frontend/blob/main/screenshots/career-roadmap-generator-input.jpg?raw=true)

### Recruiter Dashboard
*(Provides recruiters with tools to enter job roles, paste job descriptions, extract skills, and analyze resumes.)*
![Recruiter Dashboard](https://github.com/your-username/devhire-ai-frontend/blob/main/screenshots/recruiter-dashboard-input.jpg?raw=true)

*(**Important:** Remember to rename your actual image files to match these `.jpg` names, place them in the `screenshots/` folder in your repository, and replace `https://github.com/your-username/devhire-ai-frontend/blob/main/screenshots/` with the actual base URL of your repository's screenshots folder. Don't forget the `?raw=true` at the end of each URL.)*

## 🙏 Acknowledgements

* Powered by Google Gemini AI
* Apache Tika (for resume parsing, likely handled by the backend)
