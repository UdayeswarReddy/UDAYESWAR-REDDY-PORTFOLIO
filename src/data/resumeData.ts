/**
 * =======================================================================
 * UDAYESWAR REDDY'S PORTFOLIO DATA FILE
 * =======================================================================
 * You can edit all your details here easily!
 * - Change your name, phone, email, links, or objective in "profile".
 * - Change your college, CGPA, coursework in "education".
 * - Add or change your skills in "skills".
 * - Add or edit your projects in "projects".
 * - Add or edit your certifications in "certifications".
 *
 * NOTE: You can also click the "✏️ Edit My Details" button directly on the website!
 * =======================================================================
 */

import { PortfolioData } from '../types/portfolio';

export const initialResumeData: PortfolioData = {
  profile: {
    fullName: "Udayeswar Reddy Veeramreddygari",
    shortName: "Udayeswar Reddy",
    avatarUrl: "/src/assets/images/uday_profile_photo_1791287758173.jpg",
    targetRole: "Software Engineer Intern",
    location: "Nandyal, Andhra Pradesh, India",
    phone: "+91 9963741791",
    email: "udayeswarreddy99@gmail.com",
    altEmail: "udayeswarreddy777@gmail.com",
    linkedin: "https://linkedin.com/in/udayeswarreddy99",
    github: "https://github.com/UdayeswarReddy",
    objective:
      "Computer Science undergraduate with hands-on experience in Java, C, and Python, along with a foundation in data structures and web development, seeking a Software Engineer Intern role to contribute to scalable, high-quality software while learning from an experienced engineering team.",
    leetcode: {
      handle: "UdayeswarReddy",
      focus: "Data Structures & Algorithms Problem Solving",
      topics: [
        "Arrays & Strings",
        "Linked Lists",
        "Trees & Binary Search Trees",
        "Hash Maps & Sets",
        "Stack & Queue Operations",
        "Sorting & Binary Search"
      ]
    }
  },
  education: {
    institution: "Rajeev Gandhi Memorial College of Engineering and Technology",
    period: "Aug 2024 – May 2028",
    degree: "Bachelor of Technology, Computer Science",
    cgpa: "8.2 / 10",
    expectedGraduation: "May 2028",
    coursework: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming (OOP)",
      "SQL & Relational Databases",
      "Problem Solving & Logic Design",
      "Computer Organization & Architecture"
    ],
    activities: [
      "Participated in coding challenges and technical hackathons",
      "Built mini projects in Java and Python",
      "Collaborated on team-based academic software projects",
      "Active participant in the RGMCET Student Chapter of IEI"
    ]
  },
  skills: [
    {
      category: "Programming Languages",
      items: ["Java", "C", "Python (basic)"],
      description: "Core algorithmic thinking, Object-Oriented design patterns, clean coding, and memory fundamentals."
    },
    {
      category: "Web Development",
      items: ["HTML5", "CSS3", "JavaScript (ES6+)"],
      description: "Building responsive frontends, DOM manipulation, component styling, and client-side interactions."
    },
    {
      category: "Core Computer Science",
      items: [
        "Data Structures & Algorithms",
        "Object-Oriented Design",
        "Problem Solving",
        "Complexity Analysis (Time/Space)"
      ],
      description: "Writing optimal algorithms with sound asymptotic analysis and robust data structures."
    },
    {
      category: "Databases",
      items: ["SQL", "Relational Database Concepts", "Schema Design", "Data Integrity"],
      description: "Writing complex relational queries, normalization, table relationships, and index considerations."
    },
    {
      category: "Cloud & Dev Tools",
      items: ["AWS (Certified)", "Oracle Cloud Infrastructure (OCI)", "Git & GitHub", "IntelliJ IDEA", "Linux / Shell basics"],
      description: "Version control workflows, cloud compute/storage primitives, and developer IDE tooling."
    },
    {
      category: "Emerging & Generative AI",
      items: ["Prompt Engineering", "AI Agents", "Generative AI Fundamentals"],
      description: "Certified GenAI foundation from Oracle Cloud, understanding LLM architectures and prompt workflows."
    }
  ],
  projects: [
    {
      id: "it-asset-tracker",
      title: "IT Asset Movement Tracker with Audit Trail",
      subtitle: "Academic Project · Enterprise Asset Management",
      type: "Academic Project",
      description:
        "Designed and developed a comprehensive system to monitor and manage the physical and organizational movement of IT hardware assets in real time with an immutable audit log.",
      highlights: [
        "Designed and developed a system to monitor and manage the movement of organizational IT assets in real time",
        "Implemented asset location tracking, history logging, and audit trails to ensure transparency and accountability",
        "Improved data accuracy and asset visibility through structured record-keeping and validation logic"
      ],
      techStack: ["Java", "SQL / Relational DB", "HTML/CSS", "JavaScript", "OOP Design"],
      githubUrl: "https://github.com/UdayeswarReddy",
      architectureDetails:
        "Utilized a layered MVC pattern separating data entities (Assets, Locations, Employees, AuditLogs) from business validation logic. Every asset check-in, transfer, or reassignment automatically writes a timestamped record to the audit table with user context, preventing ghost inventory and unauthorized reassignments.",
      features: [
        "Real-time asset state tracking (Assigned, In Transit, Under Maintenance, Retired)",
        "Automated audit trail generation on every movement transaction",
        "Strict relational foreign-key validation to prevent orphaned records",
        "Search and filter assets by department, employee ID, or serial tag",
        "Exportable movement history for compliance audits"
      ],
      impact:
        "Eliminated inventory discrepancies by establishing strict validation checkpoints and transparent audit histories."
    },
    {
      id: "learning-companion",
      title: "Personalised Learning Companion for First-Generation Students",
      subtitle: "GeeksforGeeks College Hackathon · Educational Tech",
      type: "Hackathon",
      description:
        "A prototype learning companion built under time constraints to help first-generation college students navigate rigorous computer science academics through personalized guidance, curated study paths, and contextual resources.",
      highlights: [
        "Built a prototype learning companion aimed at helping first-generation college students navigate academics through personalized guidance and resources",
        "Collaborated in a team under time constraints to design and pitch the solution at a college-level hackathon organized by GeeksforGeeks",
        "Engineered intuitive student workflows and resource recommendations",
        "Code available at: github.com/UdayeswarReddy"
      ],
      techStack: ["Python", "JavaScript", "HTML5", "CSS3", "Git Collaboration"],
      githubUrl: "https://github.com/UdayeswarReddy",
      architectureDetails:
        "Designed a modular frontend interface backed by adaptive resource mappings. Students select their current semester or target subjects (e.g. DSA, Relational Databases) to receive tailored step-by-step roadmaps, verified open tutorials, and difficulty-curated practice problems.",
      features: [
        "Adaptive academic subject roadmaps based on semester & difficulty",
        "Curated starter guides for students without prior coding backgrounds",
        "Peer study checklists and resource bookmarking",
        "Lightweight, accessible UI designed for fast loading even on low-bandwidth networks"
      ],
      impact:
        "Pitched successfully to hackathon judges at GeeksforGeeks college event, receiving positive commendations for social empathy and practical applicability."
    },
    {
      id: "bug-tracking-system",
      title: "Bug Tracking System",
      subtitle: "College Project (In Progress) · Software Quality Engineering",
      type: "In Progress",
      description:
        "An end-to-end software issue tracking system designed to log, categorize, prioritize, and track software bugs through their full lifecycle from initial discovery to code resolution and verification.",
      highlights: [
        "Building a system to log, categorize, and track software bugs through their lifecycle from reporting to resolution",
        "Working on features for issue status updates, prioritization, and maintaining a clear resolution history",
        "Implementing role-aware triage workflows for reporters and developers"
      ],
      techStack: ["Java", "SQL / Relational DB", "OOP Design", "HTML/CSS", "JavaScript"],
      githubUrl: "https://github.com/UdayeswarReddy",
      architectureDetails:
        "Implemented using a state-machine pattern governing bug status transitions: [Reported] -> [Triage / Assigned] -> [In Progress] -> [Resolved / Testing] -> [Closed]. Built with relational integrity ensuring each bug links to module tags, severity metrics, and chronological comment history.",
      features: [
        "Bug lifecycle state machine with validation rules for transitions",
        "Severity and priority matrix (Critical, High, Medium, Low)",
        "Categorized issue tagging (UI, Backend, Database, Security)",
        "Comprehensive audit history of assignee changes and resolution comments",
        "Quick metrics dashboard showing open vs. resolved defects"
      ],
      impact:
        "Currently in active development to streamline bug reporting and resolution workflows for student development teams."
    }
  ],
  // =========================================================================
  // CERTIFICATIONS LIST:
  // Whenever you get a new certificate, you can add it right here in this list!
  // Example template to copy-paste:
  // {
  //   id: "google-cloud-ace",
  //   title: "Associate Cloud Engineer",
  //   issuer: "Google Cloud",
  //   year: "2026",
  //   credentialType: "Cloud", // Choose: 'Cloud' | 'AI / GenAI' | 'Security' | 'DevOps' | 'Core Engineering'
  //   description: "Validated skills in deploying and securing cloud solutions.",
  //   skillsVerified: ["GCP", "Kubernetes", "IAM", "Cloud Storage"],
  //   badgeColor: "#4285F4"
  // },
  // =========================================================================
  certifications: [
    {
      id: "aws-ccp",
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services (AWS)",
      year: "2026",
      credentialType: "Cloud",
      description:
        "Validated foundational understanding of AWS Cloud infrastructure, core services (EC2, S3, RDS, IAM, VPC), security principles, compliance, and cloud economics.",
      skillsVerified: ["AWS Architecture", "Cloud Security & IAM", "Compute & Storage", "Cloud Economics"],
      badgeColor: "#F59E0B"
    },
    {
      id: "oci-genai",
      title: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
      issuer: "Oracle",
      year: "2025",
      credentialType: "AI / GenAI",
      description:
        "Demonstrated technical proficiency in Large Language Models (LLMs), OCI Generative AI service, Retrieval-Augmented Generation (RAG), prompt engineering techniques, and fine-tuning concepts.",
      skillsVerified: ["Generative AI", "LLM Architectures", "Prompt Engineering", "RAG & Vector Embeddings"],
      badgeColor: "#EC4899"
    },
    {
      id: "oci-ai-foundations",
      title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
      issuer: "Oracle",
      year: "2025",
      credentialType: "AI / GenAI",
      description:
        "Certified in fundamental concepts of Artificial Intelligence, Machine Learning, Deep Learning, Natural Language Processing, Computer Vision, and OCI AI Services.",
      skillsVerified: ["AI Foundations", "Machine Learning Basics", "OCI AI Services", "Ethics in AI"],
      badgeColor: "#8B5CF6"
    },
    {
      id: "zscaler-zero-trust",
      title: "Zscaler Zero Trust Associate",
      issuer: "Zscaler",
      year: "2026",
      credentialType: "Security",
      description:
        "Comprehensive knowledge of Zero Trust Architecture principles, secure access service edge (SASE), microsegmentation, and perimeter-less cloud security models.",
      skillsVerified: ["Zero Trust Architecture", "Cloud Security", "Least Privilege Access", "Network Segmentation"],
      badgeColor: "#10B981"
    },
    {
      id: "devops-cloud-automation",
      title: "DevOps & Cloud Automation Credential (8-Week)",
      issuer: "EduSkills Academy",
      year: "2025",
      credentialType: "DevOps",
      description:
        "Hands-on 8-week intensive credential covering Git workflows, Linux administration & shell scripting, containerization fundamentals with Docker, and CI/CD pipelines.",
      skillsVerified: ["Git & GitHub", "Linux & Shell Scripting", "Docker Fundamentals", "CI/CD Concepts"],
      badgeColor: "#3B82F6"
    },
    {
      id: "nptel-iot",
      title: "Introduction to Internet of Things",
      issuer: "NPTEL",
      year: "2026",
      credentialType: "Core Engineering",
      description:
        "Academic certification covering IoT architecture, sensor networks, communication protocols, and embedded system fundamentals.",
      skillsVerified: ["IoT Architectures", "Sensor Networks", "Embedded Systems", "Protocols"],
      badgeColor: "#06B6D4"
    },
    {
      id: "nptel-soft-skills",
      title: "Soft Skills Certification",
      issuer: "NPTEL",
      year: "2025",
      credentialType: "Core Engineering",
      description:
        "Focus on professional communication, team dynamics, workplace problem-solving, and presentation skills.",
      skillsVerified: ["Technical Communication", "Team Collaboration", "Problem Solving"],
      badgeColor: "#64748B"
    }
  ],
  extracurricular: [
    {
      title: "Student Member",
      organization: "Institution of Engineers (India) — RGMCET Student Chapter",
      description:
        "Actively participate in technical seminars, guest lectures by industry leaders, and peer project exhibitions."
    },
    {
      title: "Hackathon Participant & Solution Designer",
      organization: "GeeksforGeeks College Hackathon",
      description:
        "Collaborated under tight deadlines to ideate, prototype, and pitch the Personalised Learning Companion for first-generation students."
    }
  ]
};
