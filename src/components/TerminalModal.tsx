import React, { useState, useRef, useEffect } from 'react';
import { X, Terminal as TerminalIcon, CornerDownLeft, Maximize2, Minimize2 } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface TerminalModalProps {
  data: PortfolioData;
  onClose: () => void;
  onOpenEditModal: () => void;
}

interface CommandHistoryItem {
  command: string;
  output: React.ReactNode;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({ data, onClose, onOpenEditModal }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-emerald-400 font-bold">
            Udayeswar Reddy [Interactive Terminal Shell v1.0.4]
          </p>
          <p className="text-slate-400">
            Type <span className="text-blue-400 font-semibold">help</span> to view available commands, or explore portfolio data directly.
          </p>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let output: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-slate-300">
            <p className="text-blue-400 font-bold">Available Commands:</p>
            <p><span className="text-emerald-400 w-24 inline-block">whoami</span> — Display candidate background & target role</p>
            <p><span className="text-emerald-400 w-24 inline-block">education</span> — View college, CGPA, graduation, and coursework</p>
            <p><span className="text-emerald-400 w-24 inline-block">skills</span> — List languages, tools, databases, and AI stack</p>
            <p><span className="text-emerald-400 w-24 inline-block">projects</span> — View built systems and hackathon projects</p>
            <p><span className="text-emerald-400 w-24 inline-block">certs</span> — List verified certifications (AWS, Oracle, Zscaler)</p>
            <p><span className="text-emerald-400 w-24 inline-block">contact</span> — Get direct contact links (Email, Phone, LinkedIn)</p>
            <p><span className="text-emerald-400 w-24 inline-block">clear</span> — Clear terminal output</p>
          </div>
        );
        break;

      case 'whoami':
      case 'about':
        output = (
          <div className="space-y-1.5 text-slate-300">
            <p className="text-white font-bold">{data.profile.fullName}</p>
            <p className="text-slate-400">Target Role: <span className="text-emerald-400">{data.profile.targetRole}</span></p>
            <p className="text-slate-400">Location: {data.profile.location}</p>
            <p className="text-slate-300 pt-1 leading-relaxed">{data.profile.objective}</p>
          </div>
        );
        break;

      case 'education':
        output = (
          <div className="space-y-1.5 text-slate-300">
            <p className="text-blue-400 font-bold">{data.education.institution}</p>
            <p className="text-slate-200">{data.education.degree}</p>
            <p className="text-emerald-400 font-mono">CGPA: {data.education.cgpa} · Expected Grad: {data.education.expectedGraduation}</p>
            <p className="text-slate-400 pt-1">Coursework: {data.education.coursework.join(', ')}</p>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-2 text-slate-300">
            {data.skills.map((s, idx) => (
              <div key={idx}>
                <span className="text-blue-400 font-bold">{s.category}:</span>{' '}
                <span className="text-slate-200">{s.items.join(', ')}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2.5 text-slate-300">
            {data.projects.map((p) => (
              <div key={p.id} className="border-l-2 border-blue-500/50 pl-3">
                <p className="text-white font-bold">{p.title} <span className="text-xs text-blue-400 font-normal">[{p.type}]</span></p>
                <p className="text-slate-400 text-xs">{p.description}</p>
                <p className="text-emerald-400 text-xs font-mono mt-0.5">Stack: {p.techStack.join(', ')}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'certs':
      case 'certifications':
        output = (
          <div className="space-y-1.5 text-slate-300">
            <p className="text-blue-400 font-bold">Verified Industry Credentials ({data.certifications.length}):</p>
            {data.certifications.map((c) => (
              <p key={c.id}>
                • <span className="text-white">{c.title}</span> — <span className="text-slate-400">{c.issuer}</span> ({c.year})
              </p>
            ))}
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-slate-300">
            <p>Email: <a href={`mailto:${data.profile.email}`} className="text-blue-400 hover:underline">{data.profile.email}</a></p>
            <p>Phone: <span className="text-slate-200">{data.profile.phone}</span></p>
            <p>LinkedIn: <a href={data.profile.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">{data.profile.linkedin}</a></p>
            <p>GitHub: <a href={data.profile.github} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">{data.profile.github}</a></p>
          </div>
        );
        break;

      case 'admin':
      case 'edit':
        setTimeout(() => {
          onClose();
          onOpenEditModal();
        }, 300);
        output = (
          <p className="text-emerald-400">Opening Owner Portfolio Editor...</p>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        output = (
          <p className="text-red-400">
            Command not recognized: "{cmd}". Type <span className="text-white underline cursor-pointer" onClick={() => setInput('help')}>help</span> for list of commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: input, output }]);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <div
        className="bg-[#0f172a] border border-slate-700/80 rounded-2xl w-full max-w-3xl h-[620px] max-h-[90vh] flex flex-col shadow-2xl font-mono text-xs overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Terminal Header */}
        <div className="bg-[#121520] border-b border-white/10 px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-slate-400 text-xs ml-2 font-mono flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-blue-400" />
              <span>udayeswar@dev-box:~</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close terminal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Console Log Area */}
        <div ref={scrollRef} className="flex-1 p-5 overflow-y-auto space-y-4 text-slate-200">
          {history.map((item, index) => (
            <div key={index} className="space-y-1.5">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-emerald-400">udayeswar@dev-box:~$</span>
                <span className="text-white font-semibold">{item.command}</span>
              </div>
              <div className="pl-4 text-slate-300">{item.output}</div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleCommand} className="bg-[#0F121C] border-t border-white/10 px-4 py-3 flex items-center gap-2 shrink-0">
          <span className="text-emerald-400 shrink-0 font-bold">udayeswar@dev-box:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help', 'skills', 'projects', 'certs', 'education'..."
            className="flex-1 bg-transparent text-white focus:outline-none text-xs font-mono placeholder:text-slate-600"
          />
          <button
            type="submit"
            className="text-slate-400 hover:text-white p-1"
            title="Execute"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
