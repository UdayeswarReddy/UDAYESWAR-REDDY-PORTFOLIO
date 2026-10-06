import React, { useState } from 'react';
import {
  X,
  Github,
  CheckCircle2,
  Layers,
  Sparkles,
  ArrowRight,
  Database,
  History,
  AlertCircle,
  Clock,
  Send,
  BookOpen
} from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
}) => {
  if (!project) return null;

  // Simulator States
  // 1. IT Asset Tracker Simulator State
  const [selectedAsset, setSelectedAsset] = useState('AST-1042 (Dell Precision Laptop)');
  const [targetLocation, setTargetLocation] = useState('Engineering Lab 3');
  const [assetLogs, setAssetLogs] = useState([
    {
      id: 1,
      time: '10:45 AM',
      action: 'Initial Deployment',
      by: 'SysAdmin',
      location: 'Central IT Depot',
      status: 'In Service',
    },
    {
      id: 2,
      time: '01:15 PM',
      action: 'Transfer Approval',
      by: 'Lab Coordinator',
      location: 'Engineering Lab 3',
      status: 'Transferred',
    },
  ]);

  const handleSimulateAssetTransfer = () => {
    const newLog = {
      id: assetLogs.length + 1,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      action: `Location Reassigned -> ${targetLocation}`,
      by: 'Udayeswar (Tester)',
      location: targetLocation,
      status: 'Verified In Transit',
    };
    setAssetLogs([newLog, ...assetLogs]);
  };

  // 2. Learning Companion Simulator State
  const [selectedTopic, setSelectedTopic] = useState<'dsa' | 'sql' | 'java'>('dsa');
  const topicGuides = {
    dsa: {
      title: 'Data Structures & Algorithms Starter Roadmap',
      desc: 'Step-by-step progression tailored for college students with zero prior competitive programming background.',
      steps: [
        'Week 1-2: Array traversals, Two-Pointer technique & String hashing',
        'Week 3-4: Singly & Doubly Linked List mutations & cycle detection',
        'Week 5-6: Stack operations, Monotonic Stacks, and Queue buffering',
        'Week 7-8: Recursion trees, Binary Trees & Level Order traversals',
      ],
    },
    sql: {
      title: 'Relational Database Fundamentals Roadmap',
      desc: 'Master schema design, Boyce-Codd normal forms, and SQL joins through practical student scenarios.',
      steps: [
        'Module 1: Relational Schema Modeling & Primary/Foreign key constraints',
        'Module 2: Inner, Left, and Full Outer Joins with real-world aggregate data',
        'Module 3: Subqueries, Group By, Having, and Index optimization',
        'Module 4: ACID properties, Transactions, and Locking mechanisms',
      ],
    },
    java: {
      title: 'Object-Oriented Programming (Java) Deep Dive',
      desc: 'From primitive classes to robust polymorphism, encapsulation, and interface contracts.',
      steps: [
        'Phase 1: Classes, constructors, and encapsulation with access modifiers',
        'Phase 2: Inheritance hierarchies and Runtime Polymorphism (@Override)',
        'Phase 3: Abstract classes vs Interface design in modular software',
        'Phase 4: Collections Framework (ArrayList, HashMap, PriorityQueue)',
      ],
    },
  };

  // 3. Bug Tracker Simulator State
  const [bugState, setBugState] = useState<'Reported' | 'Triage' | 'In Progress' | 'Resolved' | 'Closed'>('Reported');
  const [bugNotes, setBugNotes] = useState<string[]>([
    'Issue logged: NullPointer exception when asset tag is empty string in batch import.',
  ]);
  const [newNote, setNewNote] = useState('');

  const nextBugStateMap: Record<string, 'Triage' | 'In Progress' | 'Resolved' | 'Closed' | 'Reported'> = {
    Reported: 'Triage',
    Triage: 'In Progress',
    'In Progress': 'Resolved',
    Resolved: 'Closed',
    Closed: 'Reported',
  };

  const handleAdvanceBugState = () => {
    const next = nextBugStateMap[bugState];
    setBugState(next);
    setBugNotes([
      `Status transitioned to [${next}] by Lead QA at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      ...bugNotes,
    ]);
  };

  const handleAddBugNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setBugNotes([`Comment: "${newNote}" (Added just now)`, ...bugNotes]);
    setNewNote('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div
        className="bg-[#0f172a] border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-[#0f172a]/95 backdrop-blur-md border-b border-white/10 px-6 py-5 flex items-start justify-between z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
              <span>{project.type}</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-slate-400">{project.subtitle}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Overview & Impact */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold font-mono">
              Project Overview
            </h3>
            <p className="text-base text-slate-200 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Highlights */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold font-mono">
              Key Contributions & Highlights
            </h3>
            <div className="space-y-2">
              {project.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture & Engineering Decisions */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
              <Layers className="w-4 h-4" />
              <span>System Architecture & Design Decisions</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.architectureDetails}
            </p>
          </div>

          {/* Tech Stack Unboxed */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold font-mono">
              Technologies & Methodologies
            </h3>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-300 font-mono">
              {project.techStack.map((tech, i) => (
                <React.Fragment key={tech}>
                  <span className="text-white font-medium">{tech}</span>
                  {i < project.techStack.length - 1 && (
                    <span className="text-slate-600" aria-hidden="true">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Features list */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold font-mono">
              Implemented Features & Validation Logic
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-black/30 border border-white/5 rounded-lg p-3 text-xs text-slate-300 flex items-start gap-2"
                >
                  <span className="text-blue-400 font-mono font-bold">0{idx + 1}.</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Live Simulator Area */}
          <div className="border-t border-white/10 pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Interactive Proof-of-Concept Simulator</span>
                </span>
                <p className="text-xs text-slate-400">
                  Test the actual workflow and logic implemented in this project
                </p>
              </div>
            </div>

            {/* IT Asset Movement Simulator */}
            {project.id === 'it-asset-tracker' && (
              <div className="bg-[#131622] border border-white/10 rounded-xl p-5 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Active Asset
                    </label>
                    <select
                      value={selectedAsset}
                      onChange={(e) => setSelectedAsset(e.target.value)}
                      className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option>AST-1042 (Dell Precision Laptop)</option>
                      <option>AST-2081 (Cisco Core Switch)</option>
                      <option>AST-3140 (Raspberry Pi Lab Node)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Target Destination
                    </label>
                    <select
                      value={targetLocation}
                      onChange={(e) => setTargetLocation(e.target.value)}
                      className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option>Engineering Lab 3</option>
                      <option>Faculty Research Room</option>
                      <option>Hardware Audit Depot</option>
                      <option>Main Server Rack #4</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={handleSimulateAssetTransfer}
                      className="w-full py-2 px-3 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Database className="w-3.5 h-3.5" />
                      <span>Execute Movement Record</span>
                    </button>
                  </div>
                </div>

                {/* Live Audit Log Preview */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1.5">
                      <History className="w-3.5 h-3.5 text-blue-400" />
                      <span>Immutable Audit Trail (Relational Table Simulation)</span>
                    </span>
                    <span>{assetLogs.length} events logged</span>
                  </div>

                  <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                    {assetLogs.map((log) => (
                      <div
                        key={log.id}
                        className="bg-black/50 border border-white/5 rounded-lg px-3 py-2 text-xs font-mono flex items-center justify-between text-slate-300"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 text-[11px]">{log.time}</span>
                          <span className="text-slate-200">{log.action}</span>
                        </div>
                        <div className="flex items-center gap-3 text-[11px]">
                          <span className="text-blue-400">{log.location}</span>
                          <span className="text-emerald-400">· {log.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Learning Companion Simulator */}
            {project.id === 'learning-companion' && (
              <div className="bg-[#131622] border border-white/10 rounded-xl p-5 space-y-4">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-medium text-slate-200">
                    Select Curated Student Roadmap:
                  </span>
                  <div className="flex items-center gap-2 ml-auto">
                    {(['dsa', 'sql', 'java'] as const).map((topic) => (
                      <button
                        key={topic}
                        onClick={() => setSelectedTopic(topic)}
                        className={`px-2.5 py-1 text-xs rounded transition-colors ${
                          selectedTopic === topic
                            ? 'bg-blue-600 text-white font-medium'
                            : 'bg-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        {topic.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-white">
                    {topicGuides[selectedTopic].title}
                  </h4>
                  <p className="text-xs text-slate-300">
                    {topicGuides[selectedTopic].desc}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {topicGuides[selectedTopic].steps.map((st, i) => (
                      <div
                        key={i}
                        className="bg-black/40 border border-white/5 rounded-lg p-2.5 text-xs text-slate-300 font-mono"
                      >
                        {st}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Bug Tracking System Simulator */}
            {project.id === 'bug-tracking-system' && (
              <div className="bg-[#131622] border border-white/10 rounded-xl p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <div>
                    <span className="text-xs text-slate-400 font-mono">
                      Bug ID: #BUG-304 · Severity: High
                    </span>
                    <h4 className="text-sm font-bold text-white">
                      NullPointer in Asset Parser on Empty Input
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Current State:</span>
                    <span className="px-2.5 py-1 text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded">
                      {bugState}
                    </span>
                    <button
                      onClick={handleAdvanceBugState}
                      className="px-3 py-1 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 rounded transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Transition State</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Bug Comments and Transition Log */}
                <div className="space-y-2">
                  <form onSubmit={handleAddBugNote} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add investigation comment or test step..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="flex-1 bg-black/40 border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 text-xs font-medium text-slate-200 bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Send className="w-3 h-3" />
                      <span>Comment</span>
                    </button>
                  </form>

                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {bugNotes.map((note, idx) => (
                      <div
                        key={idx}
                        className="bg-black/50 border border-white/5 rounded px-3 py-1.5 text-xs text-slate-300 font-mono"
                      >
                        {note}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <span className="text-xs text-slate-400 font-mono">
              Impact: {project.impact}
            </span>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-lg transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
              )}

              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
