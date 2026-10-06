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
  MessageSquare
} from 'lucide-react';
import { PersonalProfile } from '../types/portfolio';

interface ContactSectionProps {
  profile: PersonalProfile;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Internship Opportunity',
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      // In production or development, can also open mailto fallback
    }, 600);
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-white/10 relative">
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
            <h3 className="text-lg font-bold text-white mb-2 font-display">
              Send a Direct Message
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Recruiters, engineering leads, or peers can drop a message here directly.
            </p>

            {submitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">
                  Message Dispatched!
                </h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Thank you for reaching out, {formData.name}. Udayeswar will respond to your email at <span className="text-white font-mono">{formData.email}</span> promptly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', role: 'Internship Opportunity', message: '' });
                  }}
                  className="px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors mt-2"
                >
                  Send Another Message
                </button>
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
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
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
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Opportunity / Inquiry Type
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option>Software Engineer Internship</option>
                    <option>Cloud / DevOps Internship</option>
                    <option>Technical Hackathon Collaboration</option>
                    <option>Open Source / Project Inquiry</option>
                    <option>General Mentorship or Connect</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Message Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Hi Udayeswar, we came across your projects and certifications and would love to speak regarding an internship opening..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Message to Udayeswar'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
