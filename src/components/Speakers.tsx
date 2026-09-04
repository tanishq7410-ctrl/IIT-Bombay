import React, { useState } from 'react';
import { SPEAKERS } from '../data/techfestData';
import { Speaker } from '../types';
import { Mic, Radio, Calendar, MapPin, X, BookOpen, ExternalLink } from 'lucide-react';
import { audioEngine } from '../utils/audio';

export const Speakers: React.FC = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  return (
    <section id="speakers" className="relative py-24 bg-[#06080D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 mb-2">
              <Mic size={14} />
              <span>KEYNOTE TRANSMISSIONS // GLOBAL VOICES</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              VOICES RESHAPING REALITY.
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl">
              Listen to the minds engineering interplanetary propulsion, neural bionics, and silicon cognition. Live keynote dialogues at Techfest 2026.
            </p>
          </div>

          <div className="font-mono text-xs text-slate-400 bg-[#0E131E] px-4 py-2 rounded border border-cyan-500/20 w-fit">
            <span>KEYNOTE SERIES: </span>
            <span className="text-cyan-400 font-bold">ALL ACCESS INCLUDED</span>
          </div>
        </div>

        {/* 3-Column Editorial Speaker Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SPEAKERS.map((speaker) => (
            <div
              key={speaker.id}
              onClick={() => {
                audioEngine.playAccessChime();
                setSelectedSpeaker(speaker);
              }}
              onMouseEnter={() => audioEngine.playBlip(680, 0.02)}
              className="relative rounded-lg overflow-hidden bg-[#0C101A] border border-cyan-500/20 hover:border-cyan-400 transition-all duration-300 group cursor-pointer hover:shadow-[0_0_35px_rgba(0,240,255,0.2)] flex flex-col justify-between"
            >
              {/* Speaker Photo Container with HUD styling */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#07090F]">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover object-center filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />

                {/* Cyber Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C101A] via-transparent to-transparent opacity-90" />

                {/* RF Frequency Telemetry Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-cyan-500/30 font-mono text-[10px] text-cyan-300 flex items-center gap-1.5">
                  <Radio size={11} className="text-cyan-400" />
                  <span>RF: {speaker.frequency}</span>
                </div>

                {/* Venue Badge */}
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 font-mono text-[10px] text-slate-300 flex items-center gap-1.5">
                  <MapPin size={11} className="text-cyan-400" />
                  <span>{speaker.venue}</span>
                </div>
              </div>

              {/* Speaker Content Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="font-mono text-[11px] text-cyan-400 tracking-wider font-semibold mb-1">
                    {speaker.organization}
                  </div>

                  <h3 className="font-display font-black text-xl text-white group-hover:text-cyan-300 transition-colors mb-1">
                    {speaker.name}
                  </h3>

                  <div className="text-xs text-slate-400 font-medium mb-4">
                    {speaker.title}
                  </div>

                  <p className="text-xs text-slate-300 italic border-l-2 border-cyan-500/40 pl-3 leading-relaxed mb-4">
                    "{speaker.topic}"
                  </p>
                </div>

                {/* Footer Time & Trigger */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-cyan-400" />
                    <span>{speaker.date} • {speaker.time}</span>
                  </div>

                  <span className="text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform">
                    DOSSIER →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Speaker Dossier Modal */}
      {selectedSpeaker && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedSpeaker(null)}
        >
          <div
            className="relative w-full max-w-xl bg-[#0C101A] border border-cyan-500/40 rounded-lg p-6 sm:p-8 shadow-[0_0_50px_rgba(0,240,255,0.3)] text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between pb-4 border-b border-cyan-500/20 mb-6">
              <div>
                <span className="font-mono text-xs text-cyan-400 tracking-wider">
                  SPEAKER TRANSMISSION DOSSIER
                </span>
                <h3 className="font-display font-black text-2xl text-white mt-1">
                  {selectedSpeaker.name}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {selectedSpeaker.title} • {selectedSpeaker.organization}
                </p>
              </div>
              <button
                onClick={() => setSelectedSpeaker(null)}
                aria-label="Close speaker dossier"
                className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="p-3 rounded bg-cyan-950/30 border border-cyan-500/20 font-mono text-cyan-200">
                <span className="text-[10px] text-cyan-400 uppercase block mb-1">KEYNOTE ABSTRACT:</span>
                "{selectedSpeaker.topic}"
              </div>

              <div>
                <h4 className="font-mono text-xs text-white uppercase tracking-wider mb-1">BIOGRAPHY:</h4>
                <p className="leading-relaxed text-slate-300">{selectedSpeaker.bio}</p>
              </div>

              {selectedSpeaker.papersPublished && (
                <div>
                  <h4 className="font-mono text-xs text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <BookOpen size={14} className="text-cyan-400" />
                    ACADEMIC & RESEARCH IMPACT:
                  </h4>
                  <p className="text-slate-400 font-mono text-xs">{selectedSpeaker.papersPublished}</p>
                </div>
              )}

              <div className="p-3 rounded bg-[#111724] border border-white/10 font-mono text-xs grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 block">TRANSMISSION TIME:</span>
                  <span className="text-white">{selectedSpeaker.date} // {selectedSpeaker.time}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">KEYNOTE VENUE:</span>
                  <span className="text-cyan-400">{selectedSpeaker.venue}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedSpeaker(null)}
                className="px-6 py-2 chamfer-button bg-cyan-400 text-black font-mono font-bold text-xs tracking-wider"
              >
                CLOSE DOSSIER
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
