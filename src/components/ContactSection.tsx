import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Copy,
  Check,
  Send,
  ExternalLink,
  ArrowRight,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { PersonalProfile } from '../types/portfolio';

interface ContactSectionProps {
  profile: PersonalProfile;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedMessageBody, setCopiedMessageBody] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Software Engineer Internship',
    customRole: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(profile.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const effectiveSubject =
    formData.role === 'Other' && formData.customRole.trim()
      ? formData.customRole.trim()
      : formData.role;

  const emailSubject = `[Portfolio Inquiry] ${effectiveSubject} - from ${formData.name || 'Visitor'}`;

  const emailBody = `Hi Udayeswar,

Name: ${formData.name}
Email: ${formData.email}
Inquiry Topic: ${effectiveSubject}

Message:
${formData.message}

---
Sent from Udayeswar Reddy Portfolio`;

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    profile.email
  )}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  const mailtoUrl = `mailto:${encodeURIComponent(
    profile.email
  )}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    if (formData.role === 'Other' && !formData.customRole.trim()) return;

    setIsSubmitting(true);

    // Try opening Gmail compose in new tab directly so the sender can send with one click
    try {
      window.open(gmailComposeUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      // fallback
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  const handleCopyFullMessage = () => {
    navigator.clipboard.writeText(
      `To: ${profile.email}\nSubject: ${emailSubject}\n\n${emailBody}`
    );
    setCopiedMessageBody(true);
    setTimeout(() => setCopiedMessageBody(false), 2000);
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-slate-800/80 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-2 font-mono">
            Get In Touch
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight font-display">
            Let's Connect & Build Together
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-xl">
            Currently open to Software Engineer Intern roles, collaborative projects, and technical discussions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Info & Profiles */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <div className="bg-[#131b2e]/75 border border-slate-700/50 rounded-2xl p-6 space-y-3 backdrop-blur-md shadow-xl">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Primary Email
              </span>
              <div className="flex items-center justify-between">
                <a
                  href={`mailto:${profile.email}`}
                  className="text-sm sm:text-base font-semibold text-white hover:text-blue-400 transition-colors flex items-center gap-2 truncate"
                >
                  <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="truncate">{profile.email}</span>
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors shrink-0 ml-2 cursor-pointer"
                  title="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-[#131b2e]/75 border border-slate-700/50 rounded-2xl p-6 space-y-3 backdrop-blur-md shadow-xl">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Direct Phone / WhatsApp
              </span>
              <div className="flex items-center justify-between">
                <a
                  href={`tel:${profile.phone}`}
                  className="text-sm sm:text-base font-semibold text-white hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{profile.phone}</span>
                </a>

                <button
                  onClick={handleCopyPhone}
                  className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors shrink-0 ml-2 cursor-pointer"
                  title="Copy phone number"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-[#131b2e]/75 border border-slate-700/50 rounded-2xl p-6 space-y-2 backdrop-blur-md shadow-xl">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Location
              </span>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-200">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{profile.location}</span>
              </div>
              <p className="text-xs text-slate-400 pt-1">
                Open to remote internships globally and onsite relocations across India.
              </p>
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="bg-[#131b2e]/75 border border-slate-700/50 hover:border-blue-500/40 rounded-xl p-4 flex items-center justify-between transition-colors group backdrop-blur-md shadow-md"
              >
                <div className="flex items-center gap-2.5">
                  <Linkedin className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-medium text-slate-200 group-hover:text-white">
                    LinkedIn
                  </span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400" />
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="bg-[#131b2e]/75 border border-slate-700/50 hover:border-blue-500/40 rounded-xl p-4 flex items-center justify-between transition-colors group backdrop-blur-md shadow-md"
              >
                <div className="flex items-center gap-2.5">
                  <Github className="w-4 h-4 text-slate-300" />
                  <span className="text-xs font-medium text-slate-200 group-hover:text-white">
                    GitHub
                  </span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7 bg-[#131b2e]/75 border border-slate-700/50 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl">
            <h3 className="text-lg font-bold text-white mb-1.5 font-display">
              Send a Direct Message
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Recruiters and leads can send messages directly to <span className="text-blue-400 font-mono font-medium">{profile.email}</span>.
            </p>

            {submitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    Message Prepared for Udayeswar's Gmail!
                  </h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
                    Your message has been pre-filled directly addressed to <span className="text-white font-mono font-semibold">{profile.email}</span>.
                  </p>
                </div>

                {/* Direct Action Dispatch Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
                  <a
                    href={gmailComposeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md shadow-blue-600/30 cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send via Gmail Web</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={mailtoUrl}
                    className="w-full sm:w-auto px-4 py-2.5 text-xs font-medium text-slate-200 hover:text-white bg-white/10 hover:bg-white/15 border border-white/15 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Open in Email App</span>
                  </a>

                  <button
                    onClick={handleCopyFullMessage}
                    className="w-full sm:w-auto px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {copiedMessageBody ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedMessageBody ? 'Copied!' : 'Copy Text'}</span>
                  </button>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        role: 'Software Engineer Internship',
                        customRole: '',
                        message: '',
                      });
                    }}
                    className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Chen"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#0a0e1a] border border-slate-700/60 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#0a0e1a] border border-slate-700/60 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Inquiry Type with Custom Text Option */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Opportunity / Inquiry Type
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-[#0a0e1a] border border-slate-700/60 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="Software Engineer Internship">Software Engineer Internship</option>
                    <option value="Cloud / DevOps Internship">Cloud / DevOps Internship</option>
                    <option value="Technical Hackathon Collaboration">Technical Hackathon Collaboration</option>
                    <option value="Open Source / Project Inquiry">Open Source / Project Inquiry</option>
                    <option value="General Mentorship or Connect">General Mentorship or Connect</option>
                    <option value="Other">Other / Type Custom Topic...</option>
                  </select>

                  {/* Custom Topic Input if 'Other' is chosen */}
                  {formData.role === 'Other' && (
                    <div className="mt-2.5 space-y-1">
                      <label className="block text-[11px] font-mono text-blue-400">
                        Type Your Custom Inquiry Subject *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Freelance development, Coding discussion, Campus event invite..."
                        value={formData.customRole}
                        onChange={(e) => setFormData({ ...formData, customRole: e.target.value })}
                        className="w-full bg-[#0d1424] border border-blue-500/50 rounded-lg px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-400 shadow-sm"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Message Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Hi Udayeswar, I came across your portfolio and would love to connect regarding..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#0a0e1a] border border-slate-700/60 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-between">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-lg shadow-blue-600/25 disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Opening Gmail...' : 'Send Message to Gmail'}</span>
                  </button>

                  <span className="text-[11px] text-slate-400 font-mono">
                    Direct To: <span className="text-slate-300">{profile.email}</span>
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
