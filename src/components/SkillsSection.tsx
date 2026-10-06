import React, { useState } from 'react';
import {
  Code2,
  Database,
  Cloud,
  Cpu,
  Terminal,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Flame
} from 'lucide-react';
import { SkillGroup, PersonalProfile } from '../types/portfolio';

interface SkillsSectionProps {
  skills: SkillGroup[];
  profile: PersonalProfile;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, profile }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  // Icons mapping for categories
  const getIcon = (category: string) => {
    switch (category) {
      case 'Programming Languages':
        return <Code2 className="w-4 h-4 text-emerald-400" />;
      case 'Web Development':
        return <Terminal className="w-4 h-4 text-blue-400" />;
      case 'Core Computer Science':
        return <Cpu className="w-4 h-4 text-indigo-400" />;
      case 'Databases':
        return <Database className="w-4 h-4 text-amber-400" />;
      case 'Cloud & Dev Tools':
        return <Cloud className="w-4 h-4 text-cyan-400" />;
      case 'Emerging & Generative AI':
        return <Sparkles className="w-4 h-4 text-pink-400" />;
      default:
        return <Code2 className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 md:py-24 border-t border-white/10 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-2 font-mono">
              Technical Stack & Practice
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight font-display">
              Core Engineering Competencies
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Grounded in solid object-oriented design and algorithm complexity analysis, with practical hands-on implementation across modern tools.
            </p>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((group, idx) => (
            <div
              key={idx}
              className="bg-[#131b2e]/75 border border-slate-700/50 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-500/40 transition-all space-y-4 backdrop-blur-md shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  {getIcon(group.category)}
                  <span className="font-semibold">{group.category}</span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {group.description}
                </p>

                {/* Items list rendered as clean unboxed tags */}
                <div className="space-y-1.5 pt-2">
                  {group.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="bg-black/30 border border-white/5 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 flex items-center justify-between"
                    >
                      <span>{item}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* LeetCode & DSA Problem Solving Focus Card */}
        <div className="mt-8 bg-gradient-to-r from-[#101322] via-[#0E111D] to-[#121626] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                <Flame className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
                  <span>Continuous Algorithmic Practice</span>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Active on LeetCode
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Dedicated to algorithmic problem solving, optimal time/space complexity analysis, and edge case mastery.
                </p>
              </div>
            </div>

            <a
              href={`https://github.com/${profile.leetcode.handle}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>GitHub Repositories</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Target Problem-Solving Domains:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs font-mono text-slate-300">
              {profile.leetcode.topics.map((topic, i) => (
                <div
                  key={i}
                  className="bg-black/40 border border-white/5 rounded-lg p-2.5 text-center text-[11px] hover:border-blue-500/30 transition-colors"
                >
                  {topic}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
