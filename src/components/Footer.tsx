import React from 'react';
import { TechfestLogo } from './TechfestLogo';
import { FESTIVAL_METADATA } from '../data/techfestData';
import { ArrowUp, Radio, MapPin, Mail, Globe, Shield } from 'lucide-react';
import { audioEngine } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    audioEngine.playBlip(900, 0.03);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-[#05070A] border-t border-cyan-500/20 pt-16 pb-12 font-mono text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Brand & Institutional Statement */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <TechfestLogo size={36} />
              <div>
                <h3 className="font-display font-black text-xl text-white tracking-wider">
                  TECHFEST 2026
                </h3>
                <p className="text-[11px] text-cyan-400 font-semibold tracking-widest">
                  IIT BOMBAY // 29TH EDITION
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed font-sans max-w-sm">
              Asia's largest science and technology festival. Organized entirely by the students of Indian Institute of Technology Bombay to pioneer the frontiers of human engineering and scientific enquiry.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <Radio size={13} className="text-cyan-400" />
              <span>TRANSMISSION FREQUENCY: 1420.4 MHz (HYDROGEN LINE)</span>
            </div>
          </div>

          {/* Col 3: Discovery Navigation */}
          <div>
            <h4 className="text-white font-bold tracking-wider uppercase mb-4 text-xs">
              PORTALS
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#events" className="hover:text-cyan-400 transition-colors">
                  01 // TECH EXPLORER
                </a>
              </li>
              <li>
                <a href="#competitions" className="hover:text-cyan-400 transition-colors">
                  02 // COMPETITIONS & ARENAS
                </a>
              </li>
              <li>
                <a href="#workshops" className="hover:text-cyan-400 transition-colors">
                  03 // MASTERCLASSES
                </a>
              </li>
              <li>
                <a href="#speakers" className="hover:text-cyan-400 transition-colors">
                  04 // KEYNOTE SPEAKERS
                </a>
              </li>
              <li>
                <a href="#exhibitions" className="hover:text-cyan-400 transition-colors">
                  05 // DRONE & SCIENCE SHOWS
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Institutional Coordinates */}
          <div>
            <h4 className="text-white font-bold tracking-wider uppercase mb-4 text-xs">
              LOCUS & VENUE
            </h4>
            <div className="space-y-2 text-xs leading-relaxed font-sans text-slate-400">
              <p className="font-mono text-white text-xs">
                Indian Institute of Technology Bombay
              </p>
              <p>Powai, Mumbai, Maharashtra 400076, India</p>
              <div className="pt-2 font-mono text-[11px] text-cyan-300">
                <span>GPS: </span>
                <span>{FESTIVAL_METADATA.coordinates}</span>
              </div>
              <div className="font-mono text-[11px] text-slate-400">
                GATE: {FESTIVAL_METADATA.mainGate}
              </div>
            </div>
          </div>

          {/* Col 5: Telemetry Node Status */}
          <div>
            <h4 className="text-white font-bold tracking-wider uppercase mb-4 text-xs">
              TELEMETRY LOG
            </h4>
            <div className="p-3 rounded bg-[#090C14] border border-cyan-500/20 space-y-2 text-[10px]">
              <div className="flex justify-between items-center text-slate-300">
                <span>CORE ENGINE:</span>
                <span className="text-emerald-400 font-bold">ONLINE</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>NODE LATENCY:</span>
                <span className="text-cyan-400">&lt; 1.2 ms</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>SECURITY:</span>
                <span className="text-cyan-400">TLS 1.3 / SHA-256</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>GATEWAYS:</span>
                <span className="text-slate-300">ANAND VIHAR ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {FESTIVAL_METADATA.year} TECHFEST, IIT BOMBAY. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6">
            <span>SCIENCE • TECHNOLOGY • INNOVATION</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded bg-[#0C101A] border border-white/10 hover:border-cyan-400 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              title="Return to orbital top"
            >
              <ArrowUp size={13} className="text-cyan-400" />
              <span>ORBIT TOP</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
