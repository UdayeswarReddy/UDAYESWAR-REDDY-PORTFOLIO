import React, { useState, useEffect } from 'react';
import { initialResumeData } from './data/resumeData';
import { Project, PortfolioData } from './types/portfolio';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { EducationSection } from './components/EducationSection';
import { SkillsSection } from './components/SkillsSection';
import { CertificationsSection } from './components/CertificationsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeViewerModal } from './components/ResumeViewerModal';
import { TerminalModal } from './components/TerminalModal';
import { EditProfileModal } from './components/EditProfileModal';
import { OwnerPasscodeModal } from './components/OwnerPasscodeModal';

export default function App() {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem('udayeswar_portfolio_data');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed reading saved portfolio data:', e);
    }
    return initialResumeData;
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isTerminalModalOpen, setIsTerminalModalOpen] = useState(false);
  const [isPasscodeModalOpen, setIsPasscodeModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleSaveData = (newData: PortfolioData) => {
    setData(newData);
    try {
      localStorage.setItem('udayeswar_portfolio_data', JSON.stringify(newData));
    } catch (e) {
      console.error('Failed saving portfolio data:', e);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret owner hotkey: Ctrl+Shift+E or Cmd+Shift+E
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        setIsPasscodeModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-slate-100 font-sans selection:bg-blue-600 selection:text-white relative">
      {/* Navigation Top Bar (Public) */}
      <Navbar
        profile={data.profile}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
        onOpenTerminalModal={() => setIsTerminalModalOpen(true)}
      />

      <main>
        {/* Split Hero Section (Public) */}
        <Hero
          profile={data.profile}
          education={data.education}
          certCount={data.certifications.length}
          projectCount={data.projects.length}
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
          onOpenTerminalModal={() => setIsTerminalModalOpen(true)}
        />

        {/* Selected Projects with Interactive Simulators */}
        <ProjectsSection
          projects={data.projects}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Education & Academic Leadership */}
        <EducationSection
          education={data.education}
          extracurricular={data.extracurricular}
        />

        {/* Technical Stack & LeetCode Practice */}
        <SkillsSection
          skills={data.skills}
          profile={data.profile}
        />

        {/* Industry Certifications (7 Credentials) */}
        <CertificationsSection
          certifications={data.certifications}
        />

        {/* Direct Contact & Outreach Form */}
        <ContactSection
          profile={data.profile}
        />
      </main>

      {/* Footer with Discreet Owner Access */}
      <Footer
        profile={data.profile}
        onOpenPasscodeModal={() => setIsPasscodeModalOpen(true)}
      />

      {/* Modals */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {isResumeModalOpen && (
        <ResumeViewerModal
          data={data}
          onClose={() => setIsResumeModalOpen(false)}
        />
      )}

      {isTerminalModalOpen && (
        <TerminalModal
          data={data}
          onClose={() => setIsTerminalModalOpen(false)}
          onOpenEditModal={() => setIsPasscodeModalOpen(true)}
        />
      )}

      {isPasscodeModalOpen && (
        <OwnerPasscodeModal
          onSuccess={() => {
            setIsPasscodeModalOpen(false);
            setIsEditModalOpen(true);
          }}
          onClose={() => setIsPasscodeModalOpen(false)}
        />
      )}

      {isEditModalOpen && (
        <EditProfileModal
          currentData={data}
          onSave={handleSaveData}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
}
