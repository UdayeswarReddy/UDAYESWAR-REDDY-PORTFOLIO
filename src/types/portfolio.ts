export interface Project {
  id: string;
  title: string;
  subtitle: string;
  type: 'Academic Project' | 'Hackathon' | 'In Progress';
  description: string;
  highlights: string[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  architectureDetails: string;
  features: string[];
  impact: string;
}

export interface Education {
  institution: string;
  period: string;
  degree: string;
  cgpa: string;
  expectedGraduation: string;
  coursework: string[];
  activities: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credentialType: 'Cloud' | 'AI / GenAI' | 'Security' | 'DevOps' | 'Core Engineering';
  description: string;
  skillsVerified: string[];
  badgeColor: string;
}

export interface Extracurricular {
  title: string;
  organization: string;
  description: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
  description: string;
}

export interface PersonalProfile {
  fullName: string;
  shortName: string;
  avatarUrl?: string;
  targetRole: string;
  location: string;
  phone: string;
  email: string;
  altEmail?: string;
  linkedin: string;
  github: string;
  objective: string;
  leetcode: {
    handle: string;
    focus: string;
    topics: string[];
  };
}

export interface PortfolioData {
  profile: PersonalProfile;
  education: Education;
  skills: SkillGroup[];
  projects: Project[];
  certifications: Certification[];
  extracurricular: Extracurricular[];
}
