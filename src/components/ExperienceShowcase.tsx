import React, { useState } from 'react';
import { EXPERIENCE_ITEMS } from '../data/techfestData';
import { Compass, Sparkles, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';
import { audioEngine } from '../utils/audio';

interface ExperienceShowcaseProps {
  onRegisterWorkshop: (workshopName: string) => void;
}

export const ExperienceShowcase: React.FC<ExperienceShowcaseProps> = ({ onRegisterWorkshop }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'exhibitions' | 'workshops' | 'shows'>('all');

  return (
    <section id="exhibitions" className="relative py-24 bg-[#080B12] border-t border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 mb-2">
              <Sparkles size={14} />
              <span>LIVE IMMERSION MATRIX // MULTI-SENSORY</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              BEYOND EXHIBITION. TOTAL IMMERSION.
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl">
              Witness synchronized autonomous aerial ballets over Powai Lake, high-voltage resonant lightning arcs, and certified masterclasses in quantum compilation and robotics.
            </p>
          </div>

          <div className="font-mono text-xs text-slate-400 bg-[#0E131E] px-4 py-2 rounded border border-cyan-500/20 w-fit">
            <span>SHOW STATUS: </span>
            <span className="text-emerald-400 font-bold">ALL SESSIONS CONFIRMED</span>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {EXPERIENCE_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`${item.colSpan || 'md:col-span-6'} relative p-6 sm:p-8 rounded-lg bg-[#0C101A] border border-cyan-500/20 hover:border-cyan-400/80 transition-all duration-300 group flex flex-col justify-between hover:shadow-[0_0_35px_rgba(0,240,255,0.15)]`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-xs text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-500/30">
                    {item.code}
                  </span>
                  <span className="font-mono text-[11px] text-cyan-300 px-2.5 py-1 rounded bg-cyan-950/40 border border-cyan-500/30">
                    {item.badge}
                  </span>
                </div>

                <div className="font-mono text-[10px] text-slate-400 tracking-wider uppercase mb-1">
                  {item.category}
                </div>

                <h3 className="font-display font-black text-xl sm:text-2xl text-white group-hover:text-cyan-300 transition-colors mb-3">
                  {item.title}
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
                <div className="flex items-center gap-2 text-slate-400">
                  <MapPin size={14} className="text-cyan-400" />
                  <span>{item.scheduleOrLocation}</span>
                </div>

                <button
                  onClick={() => {
                    audioEngine.playAccessChime();
                    onRegisterWorkshop(item.title);
                  }}
                  className="px-4 py-1.5 rounded bg-[#131926] hover:bg-cyan-400 hover:text-black text-cyan-300 border border-cyan-500/30 transition-all font-mono text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>RESERVE PASS</span>
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
