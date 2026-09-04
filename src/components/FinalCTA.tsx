import React, { useState } from 'react';
import { FESTIVAL_METADATA } from '../data/techfestData';
import { ArrowRight, Sparkles, Download, ShieldCheck, QrCode } from 'lucide-react';
import { audioEngine } from '../utils/audio';

interface FinalCTAProps {
  onOpenRegisterWithEmail: (email: string) => void;
  onExploreEvents: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenRegisterWithEmail, onExploreEvents }) => {
  const [quickEmail, setQuickEmail] = useState('');
  const [downloading, setDownloading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickEmail.trim()) return;
    audioEngine.playAccessChime();
    onOpenRegisterWithEmail(quickEmail);
  };

  const handleDownloadSchedule = () => {
    audioEngine.playBlip(750, 0.03);
    setDownloading(true);

    setTimeout(() => {
      // Generate a mock telemetry transmission download blob
      const content = `TECHFEST 2026 // IIT BOMBAY
29th Edition Official Schedule Matrix
Dates: 22 - 24 December 2026
Location: IIT Bombay, Powai, Mumbai (19.1334 N, 72.9133 E)

DAY 01 (22 DEC):
09:00 - Opening Keynote Ceremony (Convocation Hall)
10:30 - International Robowars Round 1 (Gymkhana Arena)
12:00 - Global Tech Exhibition Pavilion Opens
14:00 - Autonomous Drone Grand Prix Qualifiers
18:30 - High-Voltage Tesla Coil Resonant Show (OAT)

DAY 02 (23 DEC):
09:30 - Planetary AI Hackathon Commences (36hr Sprint)
11:00 - Keynote: Elena Rostova (Apex Bionics Zurich)
14:00 - Quantum Coding & Capture The Flag Stage 1
20:30 - 1000-Drone Aerial Constellation Ballet (Powai Lake)

DAY 03 (24 DEC):
10:00 - Robowars Grand Championship Finals
13:30 - Keynote: Prof. K.S. Venkatesh (IIT Bombay)
16:00 - Aerospace Rocketry & Hall Thruster Showcase
18:30 - Grand Valedictory & Awards Ceremony`;

      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'TECHFEST_2026_SCHEDULE_MATRIX.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloading(false);
    }, 800);
  };

  return (
    <section id="cta-section" className="relative py-28 bg-[#06080D] overflow-hidden border-t border-cyan-500/20">
      {/* Futuristic Concentric Radial Core Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[700px] sm:h-[900px] pointer-events-none">
        {/* Core glow */}
        <div className="absolute inset-20 rounded-full bg-cyan-500/10 blur-[130px]" />
        
        {/* Concentric rings */}
        <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-holo" />
        <div className="absolute inset-16 rounded-full border border-dashed border-cyan-400/20 animate-holo-reverse" />
        <div className="absolute inset-32 rounded-full border border-blue-500/20 animate-holo" />
        <div className="absolute inset-48 rounded-full border border-violet-500/20 animate-holo-reverse" />
        <div className="absolute inset-64 rounded-full border border-cyan-400/30" />

        {/* Pulsing Core Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-cyan-500/20 blur-xl animate-pulse" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Sub-label */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 font-mono text-xs mb-6">
          <Sparkles size={13} className="text-cyan-400" />
          <span>INITIALIZE DIGITAL ACCESS PROTOCOL // TECHFEST 2026</span>
        </div>

        {/* Headline */}
        <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
          THE FUTURE IS WAITING.
        </h2>

        {/* Description */}
        <p className="mt-6 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Don't just witness technology. Experience it. Be part of the historic 29th edition of Techfest at the Indian Institute of Technology Bombay.
        </p>

        {/* Fast Register Form */}
        <div className="mt-10 max-w-lg mx-auto">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 p-2 rounded-lg bg-[#0C101A]/90 border border-cyan-500/40 shadow-[0_0_35px_rgba(0,240,255,0.25)] backdrop-blur-md"
          >
            <div className="flex-1 flex items-center px-3 gap-2">
              <span className="text-cyan-400 font-mono text-xs">@</span>
              <input
                type="email"
                required
                value={quickEmail}
                onChange={(e) => setQuickEmail(e.target.value)}
                placeholder="Enter university or work email..."
                className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 chamfer-button bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-bold text-xs tracking-wider transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)] cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>CLAIM PASS</span>
              <ArrowRight size={14} />
            </button>
          </form>

          <div className="mt-3 flex items-center justify-center gap-4 font-mono text-[11px] text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck size={13} />
              Verified Digital Ticket
            </span>
            <span>•</span>
            <span>Free Student Admission</span>
          </div>
        </div>

        {/* Auxiliary Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleDownloadSchedule}
            disabled={downloading}
            className="px-5 py-2.5 rounded border border-white/10 hover:border-cyan-500/40 bg-[#0C101A] text-slate-300 hover:text-white font-mono text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Download size={14} className="text-cyan-400" />
            <span>{downloading ? 'GENERATING PROTOCOL...' : 'DOWNLOAD SCHEDULE MATRIX'}</span>
          </button>

          <button
            onClick={onExploreEvents}
            className="px-5 py-2.5 rounded border border-white/10 hover:border-cyan-500/40 bg-[#0C101A] text-slate-300 hover:text-white font-mono text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <QrCode size={14} className="text-cyan-400" />
            <span>EXPLORE ALL COMPETITIONS</span>
          </button>
        </div>
      </div>
    </section>
  );
};
