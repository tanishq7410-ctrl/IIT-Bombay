import React, { useState } from 'react';
import { PassTicket } from '../types';
import { TECH_DOMAINS, FESTIVAL_METADATA } from '../data/techfestData';
import { X, ShieldCheck, Download, Sparkles, CheckCircle2, User, Mail, School, Cpu, QrCode } from 'lucide-react';
import { audioEngine } from '../utils/audio';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledDomain?: string;
  prefilledEmail?: string;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  prefilledDomain,
  prefilledEmail,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState(prefilledEmail || '');
  const [institution, setInstitution] = useState('');
  const [category, setCategory] = useState<'Student' | 'Scholar' | 'Professional'>('Student');
  const [domain, setDomain] = useState(prefilledDomain || TECH_DOMAINS[0].title);
  const [generatedTicket, setGeneratedTicket] = useState<PassTicket | null>(null);

  // Sync if prefilled changes
  React.useEffect(() => {
    if (prefilledEmail) setEmail(prefilledEmail);
    if (prefilledDomain) setDomain(prefilledDomain);
  }, [prefilledEmail, prefilledDomain]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playAccessChime();

    // Generate ticket
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    const ticket: PassTicket = {
      ticketId: `TF26-${randomHex}-SEC`,
      fullName: fullName || 'Innovator',
      email: email,
      institution: institution || 'Premier Engineering Institute',
      category: category,
      domain: domain,
      issueDate: '2026-12-22',
      clearanceLevel: 'LEVEL-3 VERIFIED ADMISSION',
      gateLocation: FESTIVAL_METADATA.mainGate,
    };

    setGeneratedTicket(ticket);
    setStep('success');
  };

  const handleDownloadTicket = () => {
    if (!generatedTicket) return;
    audioEngine.playBlip(800, 0.03);

    const ticketContent = `========================================================
   TECHFEST 2026 // IIT BOMBAY - OFFICIAL CYBER-PASS
========================================================
TICKET IDENTIFIER : ${generatedTicket.ticketId}
NAME              : ${generatedTicket.fullName.toUpperCase()}
EMAIL             : ${generatedTicket.email}
INSTITUTION       : ${generatedTicket.institution}
STATUS/CATEGORY   : ${generatedTicket.category}
PRIMARY TRACK     : ${generatedTicket.domain}
DATES             : ${FESTIVAL_METADATA.dates}
TERRESTRIAL LOCUS : ${FESTIVAL_METADATA.location}
COORDINATES       : ${FESTIVAL_METADATA.coordinates}
CLEARANCE LEVEL   : ${generatedTicket.clearanceLevel}
GATE ENTRY        : ${generatedTicket.gateLocation}
========================================================
PRESENT AT THE REGISTRATION DESK (ANAND VIHAR GATE).
SYSTEM CORE ENCRYPTION: SHA-256 VERIFIED
========================================================`;

    const blob = new Blob([ticketContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedTicket.ticketId}_PASS.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-[#0B0F18] border border-cyan-500/40 rounded-xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,240,255,0.3)] text-left max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-start justify-between pb-4 border-b border-cyan-500/20 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider">
              {step === 'form' ? 'ADMISSION REGISTRATION PROTOCOL' : 'CYBER-PASS GENERATED'}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close registration modal"
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h3 className="font-display font-black text-2xl text-white">
                ENTER TECHFEST 2026
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Complimentary digital pass providing admission to all keynotes, drone exhibitions, robot combat arenas, and pavilions at IIT Bombay.
              </p>
            </div>

            {/* Full Name */}
            <div>
              <label className="block font-mono text-xs text-slate-300 mb-1.5 flex items-center gap-1.5">
                <User size={13} className="text-cyan-400" />
                <span>FULL NAME</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Vikram Sarabhai"
                className="w-full px-3.5 py-2.5 rounded bg-[#111724] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-sm font-sans placeholder-slate-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-mono text-xs text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Mail size={13} className="text-cyan-400" />
                <span>EMAIL ADDRESS (STUDENT OR WORK)</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. developer@iitb.ac.in"
                className="w-full px-3.5 py-2.5 rounded bg-[#111724] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-sm font-sans placeholder-slate-400"
              />
            </div>

            {/* Institution / College */}
            <div>
              <label className="block font-mono text-xs text-slate-300 mb-1.5 flex items-center gap-1.5">
                <School size={13} className="text-cyan-400" />
                <span>COLLEGE / UNIVERSITY / AFFILIATION</span>
              </label>
              <input
                type="text"
                required
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder="e.g. IIT Bombay / MIT / Stanford"
                className="w-full px-3.5 py-2.5 rounded bg-[#111724] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-sm font-sans placeholder-slate-400"
              />
            </div>

            {/* Category selection */}
            <div>
              <label className="block font-mono text-xs text-slate-300 mb-1.5">
                DELEGATION CATEGORY
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Student', 'Scholar', 'Professional'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      audioEngine.playBlip(700, 0.02);
                      setCategory(cat);
                    }}
                    className={`py-2 px-3 rounded text-xs font-mono transition-all ${
                      category === cat
                        ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-bold'
                        : 'bg-[#111724] border border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Track */}
            <div>
              <label className="block font-mono text-xs text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Cpu size={13} className="text-cyan-400" />
                <span>PRIMARY TECHNOLOGY TRACK</span>
              </label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded bg-[#111724] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-sm font-mono"
              >
                {TECH_DOMAINS.map((d) => (
                  <option key={d.id} value={d.title} className="bg-[#0C101A]">
                    {d.code} // {d.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Consent & Submit */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>Instant cryptographically signed digital entry credentials.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 chamfer-button bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-mono font-bold text-xs tracking-wider transition-all shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:brightness-110 active:scale-[0.99] cursor-pointer"
              >
                GENERATE VERIFIED CYBER-PASS
              </button>
            </div>
          </form>
        ) : (
          /* Pass Generated State */
          generatedTicket && (
            <div className="space-y-6">
              {/* Pass Physical Preview Card */}
              <div className="relative p-6 rounded-lg bg-gradient-to-br from-[#0E1422] to-[#080B13] border-2 border-cyan-500/60 shadow-[0_0_40px_rgba(0,240,255,0.2)] overflow-hidden font-mono">
                {/* Background watermarked text */}
                <div className="absolute top-2 right-4 text-4xl font-display font-black text-cyan-500/5 select-none pointer-events-none">
                  TECHFEST
                </div>

                {/* Top Pass Header */}
                <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3 mb-4">
                  <div>
                    <span className="text-[10px] text-cyan-400 block tracking-wider">
                      IIT BOMBAY // 29TH EDITION
                    </span>
                    <span className="text-white font-bold text-base tracking-wider">
                      TECHFEST OFFICIAL DELEGATE PASS
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[10px] border border-cyan-500/40">
                    PASS VERIFIED
                  </span>
                </div>

                {/* Main Pass Data */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="block text-[10px] text-slate-400">DELEGATE NAME</span>
                    <span className="text-white font-bold text-sm truncate block">
                      {generatedTicket.fullName}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[10px] text-slate-400">ACCESS CODE</span>
                    <span className="text-cyan-400 font-bold text-sm">
                      {generatedTicket.ticketId}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[10px] text-slate-400">INSTITUTION</span>
                    <span className="text-slate-200 truncate block">
                      {generatedTicket.institution}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[10px] text-slate-400">PRIMARY TRACK</span>
                    <span className="text-slate-200 truncate block">
                      {generatedTicket.domain}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[10px] text-slate-400">DATE ACCESS</span>
                    <span className="text-slate-200 block">{FESTIVAL_METADATA.dates}</span>
                  </div>

                  <div>
                    <span className="block text-[10px] text-slate-400">CAMPUS VENUE</span>
                    <span className="text-slate-200 block">Powai, Mumbai (19.1334° N)</span>
                  </div>
                </div>

                {/* Barcode Strip */}
                <div className="mt-6 pt-4 border-t border-cyan-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-1 h-8 opacity-80">
                    {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 4, 2, 1, 2, 3, 1, 4, 1, 3, 2, 4, 1].map(
                      (width, i) => (
                        <div
                          key={i}
                          className="bg-cyan-400 h-full"
                          style={{ width: `${width * 2}px` }}
                        />
                      )
                    )}
                  </div>
                  <div className="p-2 rounded bg-black border border-cyan-500/40 text-cyan-400">
                    <QrCode size={30} />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleDownloadTicket}
                  className="flex-1 py-3 chamfer-button bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                >
                  <Download size={14} />
                  <span>DOWNLOAD CYBER-PASS (.TXT)</span>
                </button>

                <button
                  onClick={onClose}
                  className="py-3 px-6 rounded border border-white/10 hover:border-white/30 text-slate-300 font-mono text-xs transition-colors cursor-pointer"
                >
                  DONE
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
