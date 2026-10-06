import React, { useState } from 'react';
import { X, Save, RotateCcw, Plus, Trash2, Check, Award, Copy, Download } from 'lucide-react';
import { PortfolioData, Certification, Project } from '../types/portfolio';
import { initialResumeData } from '../data/resumeData';

interface EditProfileModalProps {
  currentData: PortfolioData;
  onSave: (newData: PortfolioData) => void;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  currentData,
  onSave,
  onClose,
}) => {
  const [data, setData] = useState<PortfolioData>(JSON.parse(JSON.stringify(currentData)));
  const [activeTab, setActiveTab] = useState<'profile' | 'education' | 'skills' | 'projects' | 'certs'>('profile');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [gitCopied, setGitCopied] = useState(false);

  const generateTsCode = () => {
    return `import { PortfolioData } from '../types/portfolio';\n\nexport const initialResumeData: PortfolioData = ${JSON.stringify(data, null, 2)};\n`;
  };

  const handleCopyGitCode = () => {
    navigator.clipboard.writeText(generateTsCode());
    setGitCopied(true);
    setTimeout(() => setGitCopied(false), 2500);
  };

  const handleDownloadGitFile = () => {
    const code = generateTsCode();
    const blob = new Blob([code], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resumeData.ts';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // New Cert State
  const [newCert, setNewCert] = useState<Partial<Certification>>({
    title: '',
    issuer: '',
    year: '2026',
    credentialType: 'Cloud',
    description: '',
    skillsVerified: [],
    badgeColor: '#3B82F6',
  });
  const [newCertSkillsText, setNewCertSkillsText] = useState('');
  const [showAddCertForm, setShowAddCertForm] = useState(false);

  const handleSave = () => {
    onSave(data);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 700);
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset all details back to original resume?')) {
      setData(JSON.parse(JSON.stringify(initialResumeData)));
    }
  };

  const handleAddNewCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCert.title || !newCert.issuer) return;

    const createdCert: Certification = {
      id: `cert-${Date.now()}`,
      title: newCert.title || 'New Certification',
      issuer: newCert.issuer || 'Issuer Organization',
      year: newCert.year || new Date().getFullYear().toString(),
      credentialType: newCert.credentialType || 'Cloud',
      description: newCert.description || 'Verified technical competency credential.',
      skillsVerified: newCertSkillsText
        ? newCertSkillsText.split(',').map((s) => s.trim()).filter(Boolean)
        : ['Technical Skills'],
      badgeColor: newCert.badgeColor || '#3B82F6',
    };

    setData({
      ...data,
      certifications: [createdCert, ...data.certifications],
    });

    // Reset form
    setNewCert({
      title: '',
      issuer: '',
      year: new Date().getFullYear().toString(),
      credentialType: 'Cloud',
      description: '',
      skillsVerified: [],
      badgeColor: '#3B82F6',
    });
    setNewCertSkillsText('');
    setShowAddCertForm(false);
  };

  const handleDeleteCert = (id: string) => {
    if (window.confirm('Remove this certification from your portfolio?')) {
      setData({
        ...data,
        certifications: data.certifications.filter((c) => c.id !== id),
      });
    }
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Remove this project from your portfolio?')) {
      setData({
        ...data,
        projects: data.projects.filter((p) => p.id !== id),
      });
    }
  };

  const handleAddNewProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: 'New Project Title',
      subtitle: 'Software Engineering Project',
      type: 'Academic Project',
      description: 'Describe the problem solved, architecture, and results of this project.',
      highlights: ['Designed and implemented core architecture', 'Ensured optimal performance and data validation'],
      techStack: ['Java', 'SQL', 'HTML/CSS'],
      architectureDetails: 'Detailed architecture and database design patterns used in this system.',
      features: ['Core functional module', 'Data tracking and validation'],
      impact: 'Outcome achieved and efficiency gains.',
    };
    setData({
      ...data,
      projects: [...data.projects, newProj],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#111420] border border-white/20 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#181C2C] px-6 py-4 border-b border-white/10 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-base font-bold text-white font-display flex items-center gap-2">
              <span>Owner Portfolio Editor</span>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Private Mode
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Only accessible to you. Edit your profile or add new certificates whenever you earn them!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetToDefault}
              className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Reset back to default resume"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>

            <button
              onClick={handleSave}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center gap-1.5 shadow-md shadow-blue-600/30 cursor-pointer"
            >
              {savedSuccess ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
              <span>{savedSuccess ? 'Saved!' : 'Save & Publish'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors ml-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#141724] px-6 py-2 border-b border-white/10 flex gap-2 overflow-x-auto text-xs shrink-0">
          <button
            onClick={() => setActiveTab('certs')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'certs'
                ? 'bg-blue-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Certifications ({data.certifications.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-blue-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Personal Info
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'education'
                ? 'bg-blue-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Education
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'skills'
                ? 'bg-blue-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Skills
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-blue-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Projects
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-slate-300">
          {/* TAB: CERTIFICATIONS (PROMINENT FOR EASY ADDING) */}
          {activeTab === 'certs' && (
            <div className="space-y-6 max-w-3xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Manage Your Certificates
                  </h3>
                  <p className="text-slate-400 text-xs">
                    Whenever you earn a new certificate (AWS, Azure, Google Cloud, Oracle, NPTEL, etc.), add it here!
                  </p>
                </div>

                <button
                  onClick={() => setShowAddCertForm(!showAddCertForm)}
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-600/30 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{showAddCertForm ? 'Close Form' : '+ Add New Certificate'}</span>
                </button>
              </div>

              {/* Add New Certificate Form */}
              {showAddCertForm && (
                <form
                  onSubmit={handleAddNewCert}
                  className="bg-[#141824] border border-emerald-500/30 rounded-xl p-5 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
                      Add New Credential Details
                    </span>
                    <span className="text-[11px] text-slate-400">Fill and click Save Certificate</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-300 mb-1">
                        Certificate Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Google Cloud Associate Cloud Engineer"
                        value={newCert.title}
                        onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                        className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-300 mb-1">
                        Issuer Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Google Cloud / Microsoft / NPTEL"
                        value={newCert.issuer}
                        onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                        className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-300 mb-1">
                        Year Received
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 2026"
                        value={newCert.year}
                        onChange={(e) => setNewCert({ ...newCert, year: e.target.value })}
                        className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-300 mb-1">
                        Credential Category
                      </label>
                      <select
                        value={newCert.credentialType}
                        onChange={(e) =>
                          setNewCert({
                            ...newCert,
                            credentialType: e.target.value as any,
                          })
                        }
                        className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Cloud">Cloud</option>
                        <option value="AI / GenAI">AI / GenAI</option>
                        <option value="Security">Security</option>
                        <option value="DevOps">DevOps</option>
                        <option value="Core Engineering">Core Engineering</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1">
                      Brief Description / What this credential verifies
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Validated foundational understanding of cloud compute, IAM security, and storage architecture."
                      value={newCert.description}
                      onChange={(e) => setNewCert({ ...newCert, description: e.target.value })}
                      className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-300 mb-1">
                      Verified Topics / Skills (comma-separated tags)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Cloud Security, Compute, IAM, VPC"
                      value={newCertSkillsText}
                      onChange={(e) => setNewCertSkillsText(e.target.value)}
                      className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowAddCertForm(false)}
                      className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-white/5 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow cursor-pointer"
                    >
                      Add This Certificate
                    </button>
                  </div>
                </form>
              )}

              {/* Current Certificates List */}
              <div className="space-y-3">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  Current Certificates ({data.certifications.length}):
                </span>

                {data.certifications.map((cert, idx) => (
                  <div
                    key={cert.id}
                    className="bg-black/40 border border-white/10 rounded-xl p-4 space-y-3 relative group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-blue-400 font-semibold">
                            #{idx + 1}
                          </span>
                          <span className="text-xs font-mono text-slate-400">
                            [{cert.credentialType}]
                          </span>
                        </div>
                        <input
                          type="text"
                          value={cert.title}
                          onChange={(e) => {
                            const updated = [...data.certifications];
                            updated[idx].title = e.target.value;
                            setData({ ...data, certifications: updated });
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded px-2.5 py-1 text-sm font-bold text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <button
                        onClick={() => handleDeleteCert(cert.id)}
                        className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                        title="Delete certificate"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div>
                        <label className="block text-[10px] text-slate-400 mb-0.5">
                          Issuer
                        </label>
                        <input
                          type="text"
                          value={cert.issuer}
                          onChange={(e) => {
                            const updated = [...data.certifications];
                            updated[idx].issuer = e.target.value;
                            setData({ ...data, certifications: updated });
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-slate-400 mb-0.5">
                          Year
                        </label>
                        <input
                          type="text"
                          value={cert.year}
                          onChange={(e) => {
                            const updated = [...data.certifications];
                            updated[idx].year = e.target.value;
                            setData({ ...data, certifications: updated });
                          }}
                          className="w-full bg-black/60 border border-white/10 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-400 mb-0.5">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={cert.description}
                        onChange={(e) => {
                          const updated = [...data.certifications];
                          updated[idx].description = e.target.value;
                          setData({ ...data, certifications: updated });
                        }}
                        className="w-full bg-black/60 border border-white/10 rounded px-2 py-1 text-xs text-slate-300 focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 1: PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-5 max-w-2xl">
              {/* Profile Photo Management */}
              <div className="bg-[#141824] border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
                <div className="relative shrink-0">
                  {data.profile.avatarUrl ? (
                    <img
                      src={data.profile.avatarUrl}
                      alt="Profile Avatar"
                      className="w-16 h-16 rounded-xl object-cover ring-2 ring-blue-500/40"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                      UR
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-1.5 w-full">
                  <label className="block text-slate-300 font-semibold text-xs">
                    Profile Picture / Headshot Photo
                  </label>
                  <p className="text-[11px] text-slate-400">
                    A professional portrait headshot has been generated for you. You can also upload your own photo anytime!
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <label className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg cursor-pointer transition-colors shadow">
                      <span>Upload My Own Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setData({
                                ...data,
                                profile: {
                                  ...data.profile,
                                  avatarUrl: reader.result as string,
                                },
                              });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>

                    {data.profile.avatarUrl && (
                      <button
                        type="button"
                        onClick={() =>
                          setData({
                            ...data,
                            profile: { ...data.profile, avatarUrl: '' },
                          })
                        }
                        className="px-2.5 py-1.5 text-xs text-slate-400 hover:text-red-400 bg-white/5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                      >
                        Remove Photo
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Display Name (Main Title)
                  </label>
                  <p className="text-[11px] text-slate-400 mb-1">
                    This is the main headline name displayed on your website.
                  </p>
                  <input
                    type="text"
                    placeholder="e.g. Udayeswar Reddy"
                    value={data.profile.shortName}
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, shortName: e.target.value },
                      })
                    }
                    className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Full Name / Surname (Optional)
                  </label>
                  <p className="text-[11px] text-slate-400 mb-1">
                    Shown on your printed resume and in subtle subtitle text.
                  </p>
                  <input
                    type="text"
                    placeholder="e.g. Udayeswar Reddy Veeramreddygari"
                    value={data.profile.fullName}
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, fullName: e.target.value },
                      })
                    }
                    className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Target Role
                  </label>
                  <input
                    type="text"
                    value={data.profile.targetRole}
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, targetRole: e.target.value },
                      })
                    }
                    className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={data.profile.location}
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, location: e.target.value },
                      })
                    }
                    className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={data.profile.email}
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, email: e.target.value },
                      })
                    }
                    className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={data.profile.phone}
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, phone: e.target.value },
                      })
                    }
                    className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    LinkedIn URL
                  </label>
                  <input
                    type="text"
                    value={data.profile.linkedin}
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, linkedin: e.target.value },
                      })
                    }
                    className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="text"
                    value={data.profile.github}
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, github: e.target.value },
                      })
                    }
                    className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Objective Statement (Summary)
                </label>
                <textarea
                  rows={4}
                  value={data.profile.objective}
                  onChange={(e) =>
                    setData({
                      ...data,
                      profile: { ...data.profile, objective: e.target.value },
                    })
                  }
                  className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {/* TAB 2: EDUCATION */}
          {activeTab === 'education' && (
            <div className="space-y-4 max-w-2xl">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  College / Institution Name
                </label>
                <input
                  type="text"
                  value={data.education.institution}
                  onChange={(e) =>
                    setData({
                      ...data,
                      education: { ...data.education, institution: e.target.value },
                    })
                  }
                  className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Degree
                  </label>
                  <input
                    type="text"
                    value={data.education.degree}
                    onChange={(e) =>
                      setData({
                        ...data,
                        education: { ...data.education, degree: e.target.value },
                      })
                    }
                    className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    CGPA
                  </label>
                  <input
                    type="text"
                    value={data.education.cgpa}
                    onChange={(e) =>
                      setData({
                        ...data,
                        education: { ...data.education, cgpa: e.target.value },
                      })
                    }
                    className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Expected Graduation
                  </label>
                  <input
                    type="text"
                    value={data.education.expectedGraduation}
                    onChange={(e) =>
                      setData({
                        ...data,
                        education: {
                          ...data.education,
                          expectedGraduation: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Coursework (comma-separated)
                </label>
                <textarea
                  rows={3}
                  value={data.education.coursework.join(', ')}
                  onChange={(e) =>
                    setData({
                      ...data,
                      education: {
                        ...data.education,
                        coursework: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                      },
                    })
                  }
                  className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {/* TAB 3: SKILLS */}
          {activeTab === 'skills' && (
            <div className="space-y-4 max-w-3xl">
              <p className="text-slate-400">
                Edit items for each skill group (comma separated):
              </p>
              {data.skills.map((skillGroup, idx) => (
                <div
                  key={idx}
                  className="bg-black/30 border border-white/10 rounded-xl p-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">
                      {skillGroup.category}
                    </span>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      Skills (comma-separated):
                    </label>
                    <input
                      type="text"
                      value={skillGroup.items.join(', ')}
                      onChange={(e) => {
                        const newSkills = [...data.skills];
                        newSkills[idx].items = e.target.value
                          .split(',')
                          .map((s) => s.trim())
                          .filter(Boolean);
                        setData({ ...data, skills: newSkills });
                      }}
                      className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6 max-w-3xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Manage Software Projects ({data.projects.length})
                  </h3>
                  <p className="text-slate-400 text-xs">
                    Update any project details, or add/remove projects anytime.
                  </p>
                </div>

                <button
                  onClick={handleAddNewProject}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center gap-1.5 shadow-md shadow-blue-600/30 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add New Project</span>
                </button>
              </div>

              {data.projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className="bg-black/30 border border-white/10 rounded-xl p-4 space-y-3 relative group"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="font-bold text-white text-sm">
                      Project #{idx + 1}: {proj.title}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-blue-400 font-mono">
                        {proj.type}
                      </span>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-1 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors cursor-pointer"
                        title="Remove project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => {
                          const newProjects = [...data.projects];
                          newProjects[idx].title = e.target.value;
                          setData({ ...data, projects: newProjects });
                        }}
                        className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">
                        Subtitle / Context
                      </label>
                      <input
                        type="text"
                        value={proj.subtitle}
                        onChange={(e) => {
                          const newProjects = [...data.projects];
                          newProjects[idx].subtitle = e.target.value;
                          setData({ ...data, projects: newProjects });
                        }}
                        className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      value={proj.description}
                      onChange={(e) => {
                        const newProjects = [...data.projects];
                        newProjects[idx].description = e.target.value;
                        setData({ ...data, projects: newProjects });
                      }}
                      className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      Tech Stack (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={proj.techStack.join(', ')}
                      onChange={(e) => {
                        const newProjects = [...data.projects];
                        newProjects[idx].techStack = e.target.value
                          .split(',')
                          .map((s) => s.trim())
                          .filter(Boolean);
                        setData({ ...data, projects: newProjects });
                      }}
                      className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#181C2C] px-6 py-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyGitCode}
              className="px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Copy TypeScript code to paste into src/data/resumeData.ts"
            >
              {gitCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-blue-400" />}
              <span>{gitCopied ? 'Code Copied!' : 'Copy Code for Git'}</span>
            </button>

            <button
              onClick={handleDownloadGitFile}
              className="px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Download resumeData.ts file to push to your Git repo"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Download resumeData.ts</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-md shadow-blue-600/30 cursor-pointer"
            >
              Save & Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
