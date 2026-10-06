import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Lock } from 'lucide-react';
import { PersonalProfile } from '../types/portfolio';

interface FooterProps {
  profile: PersonalProfile;
  onOpenPasscodeModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onOpenPasscodeModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800 py-10 bg-[#0B101D]/80 backdrop-blur-md text-xs text-slate-400">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left space-y-0.5">
          <p className="font-semibold text-slate-200 tracking-wide font-display">
            ©UDAYESWAR REDDY. All rights reserved.
          </p>
          <p className="text-[11px] text-slate-400 font-mono">
            since 2026
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-white transition-colors"
          >
            Email
          </a>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

          {/* Discreet Owner Access Link */}
          <button
            onClick={onOpenPasscodeModal}
            className="text-slate-600 hover:text-blue-400 hover:bg-white/5 rounded transition-colors p-1.5 cursor-pointer"
            title="Owner Portal (Passcode Required)"
            aria-label="Owner Portal"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
