# Udayeswar Reddy — Software Engineer Portfolio

> Portfolio website of **Udayeswar Reddy Veeramreddygari** — Computer Science Undergraduate & Aspiring Software Engineer Intern (Rajeev Gandhi Memorial College of Engineering and Technology, Class of 2028).

![React 19](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-6.1-646cff?logo=vite)

---

## 🚀 Features

- **Split-Screen Hero**: Clean typography, professional headshot photo, and quick contact actions.
- **Projects Showcase & Interactive Simulators**:
  - *IT Asset Movement Tracker with Audit Trail* — Layered architecture with interactive real-time movement & audit logging simulation.
  - *Personalised Learning Companion for First-Generation Students* — GeeksforGeeks College Hackathon prototype with interactive subject roadmap picker.
  - *Bug Tracking System (In Progress)* — Lifecycle state machine transition simulator.
- **Technical Skills & DSA Focus**:
  - Languages: Java, C, Python
  - Web: HTML5, CSS3, JavaScript
  - Core CS: Data Structures & Algorithms, OOP, Relational Databases (SQL)
  - Cloud & Tools: AWS, Oracle Cloud Infrastructure (OCI), Git, IntelliJ IDEA, Linux
  - Active LeetCode problem solving tracker
- **7 Industry Certifications**:
  - AWS Certified Cloud Practitioner (2026)
  - Oracle Cloud Infrastructure 2025 Certified Generative AI Professional (2025)
  - Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate (2025)
  - Zscaler Zero Trust Associate (2026)
  - DevOps & Cloud Automation 8-Week Credential — EduSkills Academy (2025)
  - Introduction to Internet of Things — NPTEL (2026)
  - Soft Skills — NPTEL (2025)
- **Developer CLI Mode**: Interactive terminal emulator supporting commands (`whoami`, `education`, `skills`, `projects`, `certs`, `contact`, `clear`).
- **ATS-Optimized Printable Resume**: View and print/save full resume as PDF (`window.print()`).
- **Owner Verification & Private Editor**: Protected by passcode (`uday99`) for adding new certificates, updating details, and downloading updated `resumeData.ts` files for Git.

---

## 🛠️ Getting Started Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/UdayeswarReddy/<your-repo-name>.git

# Navigate to the folder
cd <your-repo-name>

# Install dependencies
npm install

# Start the local development server
npm run dev
```

Visit `http://localhost:3000` or `http://localhost:5173` in your browser.

---

## 📦 How to Update Your Portfolio Data

All information is cleanly organized in:
```
src/data/resumeData.ts
```

### Adding New Certificates
To add a new certificate, open `src/data/resumeData.ts` and add a new item to `certifications: [...]`:

```typescript
{
  id: "my-cert",
  title: "Certificate Name",
  issuer: "Issuer Organization",
  year: "2026",
  credentialType: "Cloud",
  description: "Brief summary of skills verified.",
  skillsVerified: ["Skill 1", "Skill 2"],
  badgeColor: "#3B82F6"
}
```

Then commit and push:
```bash
git add src/data/resumeData.ts
git commit -m "Add new certificate"
git push
```

---

## 🌐 Deploying to GitHub Pages or Vercel

### Deploy to Vercel (Easiest)
1. Go to [vercel.com](https://vercel.com)
2. Click **Import Project** and select your GitHub repository.
3. Keep default settings (`Vite` framework preset) and click **Deploy**.

### Deploy to GitHub Pages
1. Build the production output:
   ```bash
   npm run build
   ```
2. Follow standard GitHub Pages deployment using the `dist` folder.

---

## 📄 License & Copyright

©UDAYESWAR REDDY. All rights reserved.  
since 2026
