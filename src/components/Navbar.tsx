import React, { useState, useEffect } from 'react';
import { FileText, Mail, Menu, X, Terminal, Edit3 } from 'lucide-react';
import { PersonalProfile } from '../types/portfolio';

interface NavbarProps {
  profile: PersonalProfile;
  onOpenResumeModal: () => void;
  onOpenTerminalModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  onOpenResumeModal,
  onOpenTerminalModal,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Education', href: '#education' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-[#0b101d]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-white hover:text-blue-400 transition-colors shrink-0 font-display"
        >
          {profile.shortName}
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors relative py-1 text-slate-300 hover:text-slate-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={onOpenTerminalModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white border border-white/10 rounded-lg hover:border-white/20 hover:bg-white/5 transition-colors whitespace-nowrap cursor-pointer"
            title="Open Developer Terminal CLI"
          >
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            <span>CLI Mode</span>
          </button>

          <button
            onClick={onOpenResumeModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap shadow-sm shadow-blue-500/20 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume / CV</span>
          </button>

          <a
            href="#contact"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-200 border border-white/15 hover:border-white/30 rounded-lg transition-colors whitespace-nowrap"
          >
            <Mail className="w-3.5 h-3.5 text-slate-400" />
            <span>Contact</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenResumeModal}
            className="p-2 text-slate-300 hover:text-white border border-white/10 rounded-lg"
            title="Resume"
          >
            <FileText className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white border border-white/10 rounded-lg"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0D1017] border-b border-white/10 px-6 py-4 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-300 hover:text-white py-1.5 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminalModal();
              }}
              className="flex items-center justify-center gap-2 w-full py-2 text-xs font-mono text-slate-200 border border-white/10 rounded-lg"
            >
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span>Launch Terminal CLI</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResumeModal();
              }}
              className="flex items-center justify-center gap-2 w-full py-2 text-xs font-medium text-white bg-blue-600 rounded-lg"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View & Download Resume</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
