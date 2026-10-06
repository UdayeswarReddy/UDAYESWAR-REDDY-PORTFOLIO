import React, { useState } from 'react';
import { Award, CheckCircle2, ShieldCheck, Sparkles, Cloud, Terminal, Check } from 'lucide-react';
import { Certification } from '../types/portfolio';

interface CertificationsSectionProps {
  certifications: Certification[];
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  certifications,
}) => {
  const [filter, setFilter] = useState<string>('all');
  const [activeCert, setActiveCert] = useState<Certification | null>(null);

  const filteredCerts = certifications.filter((c) => {
    if (filter === 'all') return true;
    if (filter === 'cloud') return c.credentialType === 'Cloud';
    if (filter === 'ai') return c.credentialType === 'AI / GenAI';
    if (filter === 'security') return c.credentialType === 'Security' || c.credentialType === 'DevOps';
    return true;
  });

  return (
    <section id="certifications" className="py-20 md:py-24 border-t border-white/10 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-2 font-mono">
              Verified Industry Credentials
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight font-display">
              Professional Certifications ({certifications.length})
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Accredited credentials across AWS Cloud architecture, Oracle GenAI engineering, Zero Trust Security, and DevOps automation.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-white/5 border border-white/10 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({certifications.length})
            </button>
            <button
              onClick={() => setFilter('cloud')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filter === 'cloud'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Cloud
            </button>
            <button
              onClick={() => setFilter('ai')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filter === 'ai'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              AI & GenAI
            </button>
            <button
              onClick={() => setFilter('security')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filter === 'security'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Security & DevOps
            </button>
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setActiveCert(activeCert?.id === cert.id ? null : cert)}
              className="bg-[#131b2e]/75 border border-slate-700/50 hover:border-blue-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 space-y-4 cursor-pointer backdrop-blur-md"
            >
              <div className="space-y-3">
                {/* Unboxed Metadata Header (NO PILLS) */}
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="text-blue-400 font-medium">{cert.issuer}</span>
                  <span className="text-slate-300 font-semibold">{cert.year}</span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-white font-display">
                  {cert.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed">
                  {cert.description}
                </p>
              </div>

              {/* Skills Verified List */}
              <div className="pt-4 border-t border-white/5 space-y-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Verified Topics:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {cert.skillsVerified.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[11px] font-mono text-slate-300 bg-black/40 border border-white/5 px-2 py-0.5 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
