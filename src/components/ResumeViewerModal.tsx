import React, { useState } from 'react';
import { X, Printer, Copy, Check, Download, ExternalLink, Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface ResumeViewerModalProps {
  data: PortfolioData;
  onClose: () => void;
}

export const ResumeViewerModal: React.FC<ResumeViewerModalProps> = ({ data, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const fullResumeText = `
${data.profile.fullName}
${data.profile.location} | ${data.profile.phone} | ${data.profile.email} | linkedin.com/in/udayeswarreddy99 | github.com/UdayeswarReddy

OBJECTIVE
${data.profile.objective}

EDUCATION
${data.education.institution} (${data.education.period})
${data.education.degree} | CGPA: ${data.education.cgpa} | Expected Graduation: ${data.education.expectedGraduation}
• Coursework: ${data.education.coursework.join(', ')}
• Activities: ${data.education.activities.join('; ')}

TECHNICAL SKILLS
${data.skills.map((s) => `• ${s.category}: ${s.items.join(', ')}`).join('\n')}

PROJECTS
${data.projects
  .map(
    (p) => `• ${p.title} (${p.type})
  - ${p.highlights.join('\n  - ')}
  - Technologies: ${p.techStack.join(', ')}`
  )
  .join('\n\n')}

CERTIFICATIONS
${data.certifications.map((c) => `• ${c.title} — ${c.issuer} (${c.year})`).join('\n')}

LEADERSHIP & EXTRACURRICULAR
${data.extracurricular.map((e) => `• ${e.title} — ${e.organization}: ${e.description}`).join('\n')}
`.trim();

  const handleCopyText = () => {
    navigator.clipboard.writeText(fullResumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div
        className="bg-[#0D1017] border border-white/15 rounded-2xl w-full max-w-4xl max-h-[94vh] flex flex-col shadow-2xl relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Control Bar */}
        <div className="bg-[#111420] border-b border-white/10 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white font-display">
              Resume Document Viewer
            </span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              ATS-Optimized
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors cursor-pointer"
              title="Copy formatted resume text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors ml-2 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Body */}
        <div className="p-6 sm:p-10 overflow-y-auto bg-white text-slate-900 font-sans print:p-0 print:m-0 selection:bg-blue-100 selection:text-slate-900">
          {/* Header */}
          <div className="text-center border-b border-slate-300 pb-4 mb-5">
            <h1 className="text-2xl font-bold tracking-tight text-slate-950 uppercase font-sans">
              {data.profile.fullName}
            </h1>
            <p className="text-xs text-slate-700 mt-1.5 font-medium flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
              <span>{data.profile.location}</span>
              <span aria-hidden="true">|</span>
              <span>{data.profile.phone}</span>
              <span aria-hidden="true">|</span>
              <span>{data.profile.email}</span>
              <span aria-hidden="true">|</span>
              <a
                href={data.profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-blue-700 hover:underline"
              >
                linkedin.com/in/udayeswarreddy99
              </a>
              <span aria-hidden="true">|</span>
              <a
                href={data.profile.github}
                target="_blank"
                rel="noreferrer"
                className="text-blue-700 hover:underline"
              >
                github.com/UdayeswarReddy
              </a>
            </p>
          </div>

          {/* Objective */}
          <div className="mb-5">
            <h2 className="text-xs font-bold text-slate-950 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
              Objective
            </h2>
            <p className="text-xs text-slate-800 leading-relaxed text-justify">
              {data.profile.objective}
            </p>
          </div>

          {/* Education */}
          <div className="mb-5">
            <h2 className="text-xs font-bold text-slate-950 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
              Education
            </h2>
            <div className="flex justify-between items-baseline text-xs font-bold text-slate-950">
              <span>{data.education.institution}</span>
              <span>{data.education.period}</span>
            </div>
            <div className="flex justify-between items-baseline text-xs text-slate-800 font-medium mb-1">
              <span>
                {data.education.degree} | CGPA: {data.education.cgpa}
              </span>
              <span>Expected Graduation: {data.education.expectedGraduation}</span>
            </div>
            <ul className="list-disc list-outside ml-4 text-[11px] text-slate-700 space-y-0.5">
              <li>
                <span className="font-semibold">Coursework:</span>{' '}
                {data.education.coursework.join(', ')}
              </li>
              <li>
                <span className="font-semibold">Activities:</span>{' '}
                {data.education.activities.join('; ')}
              </li>
            </ul>
          </div>

          {/* Technical Skills */}
          <div className="mb-5">
            <h2 className="text-xs font-bold text-slate-950 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
              Technical Skills
            </h2>
            <div className="text-[11px] text-slate-800 space-y-1">
              {data.skills.map((grp, i) => (
                <p key={i}>
                  <span className="font-bold text-slate-950">{grp.category}:</span>{' '}
                  {grp.items.join(', ')}
                </p>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="mb-5">
            <h2 className="text-xs font-bold text-slate-950 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
              Projects
            </h2>
            <div className="space-y-3.5">
              {data.projects.map((proj) => (
                <div key={proj.id} className="text-xs">
                  <div className="flex justify-between items-baseline font-bold text-slate-950">
                    <span>{proj.title}</span>
                    <span className="font-normal italic text-[11px] text-slate-600">
                      {proj.subtitle}
                    </span>
                  </div>
                  <ul className="list-disc list-outside ml-4 text-[11px] text-slate-700 space-y-0.5 mt-1">
                    {proj.highlights.map((hl, hIdx) => (
                      <li key={hIdx}>{hl}</li>
                    ))}
                    <li>
                      <span className="font-semibold">Technologies:</span>{' '}
                      {proj.techStack.join(', ')}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="mb-5">
            <h2 className="text-xs font-bold text-slate-950 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
              Certifications
            </h2>
            <ul className="list-disc list-outside ml-4 text-[11px] text-slate-800 space-y-1">
              {data.certifications.map((cert) => (
                <li key={cert.id}>
                  <span className="font-semibold text-slate-950">{cert.title}</span> —{' '}
                  {cert.issuer} ({cert.year})
                </li>
              ))}
            </ul>
          </div>

          {/* Leadership & Extracurricular */}
          <div>
            <h2 className="text-xs font-bold text-slate-950 uppercase tracking-wider border-b border-slate-300 pb-1 mb-2">
              Leadership & Extracurricular
            </h2>
            <ul className="list-disc list-outside ml-4 text-[11px] text-slate-800 space-y-1">
              {data.extracurricular.map((item, idx) => (
                <li key={idx}>
                  <span className="font-semibold text-slate-950">{item.title}</span>,{' '}
                  {item.organization} — {item.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
