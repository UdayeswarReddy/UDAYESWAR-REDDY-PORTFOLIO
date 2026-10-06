import React, { useState } from 'react';
import {
  ArrowRight,
  FileText,
  Terminal,
  MapPin,
  Mail,
  Check,
  Copy,
  GraduationCap,
  Award,
  Code2,
  Cpu,
  Github,
  Linkedin
} from 'lucide-react';
import { PersonalProfile, Education } from '../types/portfolio';

interface HeroProps {
  profile: PersonalProfile;
  education: Education;
  certCount: number;
  projectCount: number;
  onOpenResumeModal: () => void;
  onOpenTerminalModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  profile,
  education,
  certCount,
  projectCount,
  onOpenResumeModal,
  onOpenTerminalModal,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="relative pt-24 pb-14 md:pt-32 md:pb-20 overflow-hidden">
      {/* Subtle background ambient mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] pointer-events-none opacity-20">
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[120px]" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Top Status Kicker: Clean unboxed text with dot */}
        <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Seeking Software Engineer Intern Opportunities</span>
          <span className="text-slate-600" aria-hidden="true">·</span>
          <span className="text-slate-400">Summer & Fall 2025/2026</span>
        </div>

        {/* 2-Column Split Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          {/* Left Column: Bold Typographic Headline & Narrative */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-start sm:items-center gap-5">
              {profile.avatarUrl ? (
                <div className="relative shrink-0 group">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.shortName}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-2 ring-blue-500/40 shadow-xl shadow-blue-500/20 group-hover:ring-blue-400 transition-all"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <span
                    className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0b101d]"
                    title="Available for Internship"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-xl shrink-0">
                  UR
                </div>
              )}

              <div>
                <p className="text-xs uppercase tracking-wider text-blue-400 font-semibold mb-1 font-mono">
                  Computer Science Undergraduate & Builder
                </p>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight font-display">
                  {profile.shortName}
                </h1>
                {profile.fullName && (
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    {profile.fullName}
                  </p>
                )}
              </div>
            </div>

            {/* Objective statement */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-xl">
              {profile.objective}
            </p>

            {/* Unboxed Meta Row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400 border-t border-b border-white/10 py-3 font-mono">
              <span className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>{profile.location}</span>
              </span>
              <span className="text-slate-700" aria-hidden="true">·</span>
              <span className="text-slate-300">{profile.phone}</span>
              <span className="text-slate-700" aria-hidden="true">·</span>
              <button
                onClick={handleCopyEmail}
                className="hover:text-blue-400 transition-colors flex items-center gap-1 text-slate-300 cursor-pointer"
                title="Click to copy email address"
              >
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>{profile.email}</span>
                {copied ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3 text-slate-500" />
                )}
              </button>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-lg shadow-blue-600/20"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenResumeModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/15 rounded-lg transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4 text-blue-400" />
                <span>View Full Resume</span>
              </button>

              <button
                onClick={onOpenTerminalModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono text-slate-300 hover:text-white bg-black/40 hover:bg-black/60 border border-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>$ cli</span>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-2 text-xs text-slate-400">
              <span className="text-slate-500">Profiles:</span>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <span className="text-slate-700" aria-hidden="true">·</span>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>LinkedIn</span>
              </a>
              <span className="text-slate-700" aria-hidden="true">·</span>
              <span className="text-slate-300">LeetCode Active</span>
            </div>
          </div>

          {/* Right Column: Engineering Snapshot & Academic Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#131b2e]/80 border border-slate-700/60 rounded-2xl p-6 sm:p-7 relative shadow-2xl shadow-blue-950/30 backdrop-blur-xl space-y-6 hover:border-blue-500/40 transition-colors">
              {/* Header inside card */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-sm font-semibold text-white tracking-wide">
                    Academic & Engineering Profile
                  </h2>
                  <p className="text-xs text-slate-400">
                    B.Tech Computer Science (2024 – 2028)
                  </p>
                </div>
                <span className="px-2.5 py-1 text-xs font-mono font-semibold text-blue-400 bg-blue-500/15 border border-blue-500/30 rounded-lg shadow-sm">
                  CGPA: {education.cgpa}
                </span>
              </div>

              {/* Institution Row */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                  <GraduationCap className="w-4 h-4 text-blue-400" />
                  <span>Institution</span>
                </div>
                <p className="text-sm font-medium text-slate-200">
                  {education.institution}
                </p>
                <p className="text-xs text-slate-400">
                  Expected Graduation: {education.expectedGraduation}
                </p>
              </div>

              {/* Key Competencies Breakdown */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-900/60 border border-slate-700/40 rounded-xl p-3.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Primary Languages</span>
                  </div>
                  <p className="text-sm font-semibold text-white font-mono">
                    Java, C, Python
                  </p>
                  <p className="text-[11px] text-slate-400">OOP & Core DSA</p>
                </div>

                <div className="bg-slate-900/60 border border-slate-700/40 rounded-xl p-3.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>Certifications</span>
                  </div>
                  <p className="text-sm font-semibold text-white font-mono">
                    {certCount} Credentials
                  </p>
                  <p className="text-[11px] text-slate-400">AWS · Oracle · Zscaler</p>
                </div>
              </div>

              {/* LeetCode & Problem Solving Tracker */}
              <div className="bg-slate-900/60 border border-slate-700/40 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                    <span>DSA Problem Solving</span>
                  </span>
                  <span className="text-emerald-400 font-mono text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Active Practice
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Focusing on optimal solutions in Data Structures & Algorithms, Space/Time Complexity analysis on LeetCode.
                </p>
              </div>

              {/* Quick Email Copy Action Card */}
              <div className="pt-2">
                <button
                  onClick={handleCopyEmail}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/60 rounded-xl transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    <span>Quick Email: {profile.email}</span>
                  </span>
                  {copied ? (
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </span>
                  ) : (
                    <span className="text-slate-400 hover:text-slate-200">
                      Copy
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
