import React, { useState } from 'react';
import { ExternalLink, Github, ArrowUpRight, CheckCircle2, Sparkles, Code2 } from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectsSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onSelectProject,
}) => {
  const [filter, setFilter] = useState<string>('all');

  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'academic') return p.type === 'Academic Project';
    if (filter === 'hackathon') return p.type === 'Hackathon';
    if (filter === 'inprogress') return p.type === 'In Progress';
    return true;
  });

  return (
    <section id="projects" className="py-20 md:py-28 border-t border-white/10 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-2 font-mono">
              Selected Software Projects
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight font-display">
              Built Systems & Working Prototypes
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Systems engineered with Java, Python, SQL, and Web technologies with emphasis on data integrity, state tracking, and student impact.
            </p>
          </div>

          {/* Interactive Filter Tabs (Button segmented control) */}
          <div className="flex items-center gap-1 p-1 bg-white/5 border border-white/10 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Works ({projects.length})
            </button>
            <button
              onClick={() => setFilter('academic')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filter === 'academic'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Academic
            </button>
            <button
              onClick={() => setFilter('hackathon')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filter === 'hackathon'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Hackathon
            </button>
            <button
              onClick={() => setFilter('inprogress')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filter === 'inprogress'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              In Progress
            </button>
          </div>
        </div>

        {/* Dynamic Bento Box Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {filteredProjects.map((project, idx) => {
            // Give the flagship project a prominent bento span
            const isFlagship = project.id === 'it-asset-tracker';
            const colSpan = isFlagship ? 'lg:col-span-7' : idx === 1 ? 'lg:col-span-5' : 'lg:col-span-12';

            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className={`${colSpan} group bg-[#131b2e]/75 border border-slate-700/50 hover:border-blue-500/50 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer relative overflow-hidden backdrop-blur-md`}
              >
                {/* Subtle hover gradient accent */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors pointer-events-none" />

                <div className="space-y-4">
                  {/* Unboxed Metadata Header (NO PILLS) */}
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-400 font-medium">{project.type}</span>
                      <span className="text-slate-700" aria-hidden="true">·</span>
                      <span className="text-slate-400">{project.subtitle.split('·')[0].trim()}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-400 group-hover:text-white transition-colors">
                      <span className="text-[11px]">Interactive Study</span>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors font-display">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-300 mt-2.5 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="space-y-1.5 pt-1">
                    {project.highlights.slice(0, isFlagship ? 3 : 2).map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Unboxed Tech Stack & Simulator Trigger */}
                <div className="pt-6 mt-6 border-t border-white/5 space-y-3">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-slate-400">
                    <span className="text-slate-500">Tech:</span>
                    {project.techStack.map((tech, i) => (
                      <React.Fragment key={tech}>
                        <span className="text-slate-300">{tech}</span>
                        {i < project.techStack.length - 1 && (
                          <span className="text-slate-700" aria-hidden="true">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                      <Sparkles className="w-3 h-3" />
                      <span>Interactive Live Simulator Included</span>
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                      className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                    >
                      <span>Explore Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
