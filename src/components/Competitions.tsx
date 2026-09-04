import React, { useState } from 'react';
import { COMPETITIONS } from '../data/techfestData';
import { Competition } from '../types';
import { Trophy, Calendar, Users, MapPin, ChevronRight, X, FileText, CheckCircle2 } from 'lucide-react';
import { audioEngine } from '../utils/audio';

interface CompetitionsProps {
  onRegisterCompetition: (compName: string) => void;
}

export const Competitions: React.FC<CompetitionsProps> = ({ onRegisterCompetition }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'robotics' | 'ai' | 'aerospace' | 'quantum'>('all');
  const [selectedComp, setSelectedComp] = useState<Competition | null>(null);

  const filteredCompetitions = COMPETITIONS.filter((comp) => {
    if (activeFilter === 'all') return true;
    return comp.category === activeFilter;
  });

  return (
    <section id="competitions" className="relative py-24 bg-[#080B12] border-t border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 mb-2">
              <Trophy size={14} />
              <span>ARENA MATRIX // TOTAL PRIZE POOL ₹23,00,000+</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              CHALLENGE THE STATUS QUO.
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl">
              Competitive engineering at international benchmarks. Pit your autonomous titanium combat bots, neural swarm algorithms, and SLAM drones against premier collegiate teams worldwide.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {(['all', 'robotics', 'ai', 'aerospace', 'quantum'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  audioEngine.playBlip(700, 0.02);
                  setActiveFilter(filter);
                }}
                className={`px-3.5 py-1.5 rounded-sm uppercase tracking-wider transition-all cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'bg-[#101522] text-slate-400 border border-white/10 hover:text-white hover:border-cyan-500/30'
                }`}
              >
                {filter === 'ai' ? 'AI & DATA' : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Competitions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCompetitions.map((comp) => (
            <div
              key={comp.id}
              className="relative p-6 sm:p-8 rounded-lg bg-[#0C101A] border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300 group flex flex-col justify-between hover:shadow-[0_0_35px_rgba(0,240,255,0.15)]"
            >
              {/* Header inside Card */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-xs text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-500/30">
                    {comp.serial}
                  </span>
                  <span className="font-mono text-xs text-amber-400 bg-amber-950/40 px-2.5 py-1 rounded border border-amber-500/30 flex items-center gap-1 font-bold">
                    PRIZE: {comp.prizePool}
                  </span>
                </div>

                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-display font-black text-3xl sm:text-4xl text-slate-700 group-hover:text-cyan-500/40 transition-colors">
                    {comp.number}
                  </span>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-cyan-300 transition-colors">
                    {comp.name}
                  </h3>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {comp.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {comp.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#131926] text-slate-300 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Deadline & Action */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar size={14} className="text-cyan-400" />
                  <span>DEADLINE: <strong className="text-white">{comp.deadline}</strong></span>
                </div>

                <button
                  onClick={() => {
                    audioEngine.playAccessChime();
                    setSelectedComp(comp);
                  }}
                  className="px-4 py-2 rounded bg-[#131926] hover:bg-cyan-500 hover:text-black text-cyan-300 border border-cyan-500/30 transition-all font-mono font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>VIEW SPECS</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Competition Modal */}
      {selectedComp && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedComp(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#0C101A] border border-cyan-500/40 rounded-lg p-6 sm:p-8 shadow-[0_0_50px_rgba(0,240,255,0.3)] text-left max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-cyan-500/20 mb-6">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 mb-1">
                  <span>{selectedComp.serial}</span>
                  <span>•</span>
                  <span>{selectedComp.phase}</span>
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                  {selectedComp.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedComp(null)}
                aria-label="Close specifications modal"
                className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded bg-[#111724] border border-white/10 mb-6 font-mono text-xs">
              <div>
                <span className="block text-[10px] text-slate-400">PRIZE POOL</span>
                <span className="text-amber-400 font-bold text-sm">{selectedComp.prizePool}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400">TEAM SIZE</span>
                <span className="text-white font-bold">{selectedComp.teamSize}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400">REG DEADLINE</span>
                <span className="text-cyan-400 font-bold">{selectedComp.deadline}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400">VENUE ARENA</span>
                <span className="text-slate-300 text-[11px] truncate block">{selectedComp.venue}</span>
              </div>
            </div>

            {/* Rulebook Highlights */}
            <div className="mb-6">
              <h4 className="font-mono text-xs text-cyan-400 tracking-wider uppercase mb-3 flex items-center gap-2">
                <FileText size={14} />
                TECHNICAL REGULATIONS & SAFETY MANDATES
              </h4>
              <div className="space-y-2">
                {selectedComp.rulesOverview.map((rule, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-3 rounded bg-black/40 border border-white/5 text-xs text-slate-300 leading-relaxed font-mono"
                  >
                    <CheckCircle2 size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Eligibility */}
            <div className="mb-8 p-4 rounded bg-[#111724] border border-cyan-500/20 font-mono text-xs text-slate-300">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold mb-1">
                <Users size={14} />
                <span>ELIGIBILITY PROTOCOL</span>
              </div>
              <p>{selectedComp.eligibility}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setSelectedComp(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded border border-white/10 text-slate-400 hover:text-white font-mono text-xs transition-colors"
              >
                CLOSE
              </button>
              <button
                onClick={() => {
                  const name = selectedComp.name;
                  setSelectedComp(null);
                  onRegisterCompetition(name);
                }}
                className="w-full sm:w-auto px-6 py-2.5 chamfer-button bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-bold text-xs tracking-wider transition-colors shadow-[0_0_20px_rgba(0,240,255,0.4)]"
              >
                REGISTER TEAM NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
