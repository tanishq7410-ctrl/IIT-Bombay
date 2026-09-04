import React from 'react';
import { FESTIVAL_METADATA, IIT_BOMBAY_STATS } from '../data/techfestData';
import { Compass, Navigation, Award, Lightbulb, TrendingUp, ShieldCheck } from 'lucide-react';

export const IITBombaySection: React.FC = () => {
  return (
    <section id="about" className="relative py-24 bg-[#06080D] border-t border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-cyan-500/30 bg-cyan-950/30 text-cyan-300 font-mono text-xs mb-4">
            <Compass size={13} className="text-cyan-400" />
            <span>INDIAN INSTITUTE OF TECHNOLOGY BOMBAY // ESTD 1958</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            BUILT AT IIT BOMBAY.
          </h2>

          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            Where some of India's brightest minds come together to question, engineer and build what comes next. Nestled between Powai Lake and Sanjay Gandhi National Park, the IIT Bombay campus serves as the epicentre of research, innovation, and technological mastery.
          </p>
        </div>

        {/* 2-Column Campus Map HUD & Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Interactive Aerial Map with HUD Overlay */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-lg overflow-hidden border border-cyan-500/30 bg-[#0C101A] shadow-[0_0_40px_rgba(0,240,255,0.15)] group">
              {/* Map Image */}
              <img
                src={FESTIVAL_METADATA.campusMapImage}
                alt="IIT Bombay Powai Campus Map Telemetry"
                className="w-full h-80 sm:h-96 object-cover object-center filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-700"
              />

              {/* Scanline & Dark Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#06080D] via-transparent to-black/40" />

              {/* Holographic Tactical Reticle centered over campus */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-24 h-24 rounded-full border border-dashed border-cyan-400 animate-spin" style={{ animationDuration: '20s' }} />
                <div className="absolute inset-2 rounded-full border border-cyan-300/40 animate-ping" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#00F0FF]" />
              </div>

              {/* Top Campus Coordinates Badge */}
              <div className="absolute top-4 left-4 flex flex-col gap-1 font-mono text-[10px] bg-black/80 backdrop-blur-md px-3 py-2 rounded border border-cyan-500/30 text-cyan-300">
                <span className="font-bold flex items-center gap-1.5">
                  <Navigation size={12} className="text-cyan-400" />
                  LOCUS: POWAI CAMPUS
                </span>
                <span className="text-slate-400">{FESTIVAL_METADATA.coordinates}</span>
              </div>

              <div className="absolute top-4 right-4 font-mono text-[10px] bg-black/80 backdrop-blur-md px-2.5 py-1.5 rounded border border-white/10 text-slate-300">
                <span>ELEVATION: </span>
                <span className="text-cyan-400 font-bold">{FESTIVAL_METADATA.elevation}</span>
              </div>

              {/* Bottom Telemetry Strip */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded bg-black/85 backdrop-blur-md border border-cyan-500/30 font-mono text-xs flex flex-wrap items-center justify-between gap-2 text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  <span>GATE PROTOCOL: ANAND VIHAR MAIN ENTRANCE</span>
                </div>
                <div className="text-cyan-400 font-bold">
                  CAMPUS: 550 ACRES
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Institutional Facts & Legacy Stats */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4 font-mono text-xs text-slate-400">
              <div className="p-4 rounded-lg bg-[#0C101A] border border-cyan-500/20">
                <div className="text-cyan-400 font-semibold uppercase tracking-wider mb-1 flex items-center gap-2">
                  <Lightbulb size={15} />
                  CENTERS OF SCIENTIFIC EXCELLENCE
                </div>
                <p className="text-slate-300 leading-relaxed font-sans text-xs sm:text-sm">
                  Home to the Centre for Machine Intelligence and Data Science (C-MInDS), National Centre for Aerospace Innovation (NCAIR), and the Wadhwani Research Centre for Bioengineering.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#0C101A] border border-cyan-500/20">
                <div className="text-cyan-400 font-semibold uppercase tracking-wider mb-1 flex items-center gap-2">
                  <TrendingUp size={15} />
                  DEEP-TECH INCUBATION ECOSYSTEM
                </div>
                <p className="text-slate-300 leading-relaxed font-sans text-xs sm:text-sm">
                  Powered by SINE (Society for Innovation and Entrepreneurship), nurturing breakthrough startups across aerospace, robotics, quantum sensing, and semiconductor fabrication.
                </p>
              </div>
            </div>

            {/* 3 Metrics Cards */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {IIT_BOMBAY_STATS.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-3 sm:p-4 rounded-lg bg-[#0C101A] border border-cyan-500/20 text-center"
                >
                  <div className="font-display font-black text-xl sm:text-2xl text-cyan-300">
                    {stat.number}
                  </div>
                  <div className="font-mono text-[10px] text-slate-300 font-semibold mt-1">
                    {stat.label}
                  </div>
                  <div className="text-[9px] text-slate-400 mt-1 hidden sm:block">
                    {stat.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
