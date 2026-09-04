import React, { useState } from 'react';
import { TECH_DOMAINS } from '../data/techfestData';
import { TechDomain } from '../types';
import { 
  Cpu, Bot, Plane, Rocket, Atom, Activity, Settings, Zap, 
  ArrowUpRight, X, Sparkles, CheckCircle2 
} from 'lucide-react';
import { audioEngine } from '../utils/audio';

interface TechExplorerProps {
  onSelectDomainForRegister: (domainTitle: string) => void;
}

export const TechExplorer: React.FC<TechExplorerProps> = ({ onSelectDomainForRegister }) => {
  const [selectedDomain, setSelectedDomain] = useState<TechDomain | null>(null);

  const getIcon = (iconName: string) => {
    const props = { size: 22, className: 'text-cyan-400 group-hover:scale-110 transition-transform duration-300' };
    switch (iconName) {
      case 'Cpu': return <Cpu {...props} />;
      case 'Bot': return <Bot {...props} />;
      case 'Plane': return <Plane {...props} />;
      case 'Rocket': return <Rocket {...props} />;
      case 'Atom': return <Atom {...props} />;
      case 'Activity': return <Activity {...props} />;
      case 'Settings': return <Settings {...props} />;
      case 'Zap': return <Zap {...props} />;
      default: return <Cpu {...props} />;
    }
  };

  return (
    <section id="events" className="relative py-24 bg-[#06080D] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-violet-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>EXPLORATION PROTOCOL // 08 DOMAINS</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              TECHNOLOGY EXPLORER
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl">
              Immerse in the frontiers of contemporary engineering. Select any domain below to review research benchmarks, key exhibits, and on-site lab demonstrations.
            </p>
          </div>

          <div className="font-mono text-xs text-slate-400 bg-[#0E131E] px-4 py-2 rounded border border-cyan-500/20 w-fit">
            <span>ACTIVE GRID: </span>
            <span className="text-cyan-400 font-bold">8 / 8 DISCOVERY ZONES</span>
          </div>
        </div>

        {/* 8-Card Interactive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {TECH_DOMAINS.map((domain) => (
            <div
              key={domain.id}
              onClick={() => {
                audioEngine.playAccessChime();
                setSelectedDomain(domain);
              }}
              onMouseEnter={() => audioEngine.playBlip(720, 0.02)}
              className="relative p-6 rounded-lg bg-[#0C101A] border border-cyan-500/20 hover:border-cyan-400/80 transition-all duration-300 group cursor-pointer hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Top Row: Domain Code & Arrow Trigger */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-500/30">
                    {domain.code}
                  </span>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-cyan-400 group-hover:text-black text-slate-400 transition-colors">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                {/* Icon & Title */}
                <div className="mb-3">
                  <div className="w-12 h-12 rounded bg-[#131926] border border-cyan-500/20 flex items-center justify-center mb-3 group-hover:border-cyan-400/50 transition-colors">
                    {getIcon(domain.iconName)}
                  </div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-cyan-300 transition-colors">
                    {domain.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {domain.description}
                </p>
              </div>

              {/* Bottom Telemetry Protocol */}
              <div className="mt-6 pt-4 border-t border-white/5 font-mono text-[10px] text-slate-400 flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">{domain.protocol}</span>
                </div>
                <div className="flex justify-between items-center text-cyan-400/80">
                  <span>{domain.statusMetric}</span>
                  <span className="group-hover:translate-x-0.5 transition-transform text-cyan-300">EXPLORE →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Domain Dossier Modal */}
      {selectedDomain && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedDomain(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#0C101A] border border-cyan-500/40 rounded-lg p-6 sm:p-8 shadow-[0_0_50px_rgba(0,240,255,0.25)] text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-cyan-500/20 mb-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded border border-cyan-500/30">
                  {selectedDomain.code} // DOSSIER
                </span>
                <span className="font-mono text-xs text-slate-400">{selectedDomain.protocol}</span>
              </div>
              <button
                onClick={() => setSelectedDomain(null)}
                aria-label="Close dossier modal"
                className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Title & Core Description */}
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-2">
              {selectedDomain.title}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {selectedDomain.description}
            </p>

            {/* Key Technologies & Focus Areas */}
            <div className="mb-6">
              <h4 className="font-mono text-xs text-cyan-400 tracking-wider uppercase mb-3 flex items-center gap-2">
                <Sparkles size={14} />
                KEY PILLARS & RESEARCH MODULES
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {selectedDomain.keyTechnologies.map((tech, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-2.5 rounded bg-[#131926] border border-white/5 font-mono text-xs text-slate-300"
                  >
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Exhibits on Campus */}
            <div className="mb-8">
              <h4 className="font-mono text-xs text-cyan-400 tracking-wider uppercase mb-3">
                ON-CAMPUS LAB EXHIBITIONS // TECHFEST 2026
              </h4>
              <div className="space-y-2">
                {selectedDomain.featuredExhibits.map((exhibit, i) => (
                  <div
                    key={i}
                    className="p-3 rounded bg-black/40 border border-cyan-500/20 font-mono text-xs text-slate-300 flex justify-between items-center"
                  >
                    <span>{exhibit}</span>
                    <span className="text-[10px] text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded">
                      ZONE {i + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setSelectedDomain(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded border border-white/10 text-slate-400 hover:text-white font-mono text-xs transition-colors"
              >
                CLOSE DOSSIER
              </button>
              <button
                onClick={() => {
                  const domainTitle = selectedDomain.title;
                  setSelectedDomain(null);
                  onSelectDomainForRegister(domainTitle);
                }}
                className="w-full sm:w-auto px-6 py-2.5 chamfer-button bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-bold text-xs tracking-wider transition-colors shadow-[0_0_20px_rgba(0,240,255,0.4)]"
              >
                REGISTER FOR THIS TRACK
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
