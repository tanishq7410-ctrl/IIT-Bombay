import React, { useState, useEffect, useRef } from 'react';
import { FESTIVAL_METADATA } from '../data/techfestData';
import { ArrowRight, Compass, ShieldCheck, Radio, Terminal, Cpu } from 'lucide-react';
import { audioEngine } from '../utils/audio';

interface HeroProps {
  onOpenRegister: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegister, onExploreClick }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const [uptimeSeconds, setUptimeSeconds] = useState(14820);

  // Parallax subtle tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };

    const interval = setInterval(() => {
      setUptimeSeconds((prev) => prev + 1);
    }, 1000);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero-section"
      className="relative min-h-screen pt-24 pb-16 flex flex-col justify-between overflow-hidden bg-tech-grid"
    >
      {/* Ambient background glow layers */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-violet-600/10 rounded-full blur-[160px] pointer-events-none" />
      
      {/* Top HUD Telemetry Bar */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <div className="flex flex-wrap items-center justify-between gap-3 py-2 px-3 sm:px-4 rounded border border-cyan-500/20 bg-[#090D14]/70 backdrop-blur-md font-mono text-[10px] sm:text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              {FESTIVAL_METADATA.coreOnlineStatus}
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-400">POWAI NODE #01</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-6 text-slate-400">
            <span className="flex items-center gap-1">
              <Radio size={12} className="text-cyan-400" />
              <span>RF: 1420.405 MHz</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-300">
              T-UPTIME: {Math.floor(uptimeSeconds / 3600)}h {Math.floor((uptimeSeconds % 3600) / 60)}m {uptimeSeconds % 60}s
            </span>
          </div>
        </div>
      </div>

      {/* Main Cinematic Grid */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-auto py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Column: Festival Identity, Headlines & CTAs */}
        <div className="lg:col-span-7 flex flex-col z-10">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-cyan-500/30 bg-cyan-950/30 text-cyan-300 font-mono text-xs w-fit mb-6 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            <Terminal size={13} className="text-cyan-400" />
            <span>IIT BOMBAY // TECHNOLOGY FESTIVAL // 29TH EDITION</span>
          </div>

          {/* Headline */}
          <div className="space-y-3">
            <h1 className="font-display font-black tracking-tight text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.02]">
              TECHFEST
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                2026
              </span>
            </h1>

            <p className="font-mono text-sm sm:text-base md:text-lg text-cyan-300/90 tracking-wide font-medium">
              {FESTIVAL_METADATA.subheading}
            </p>
          </div>

          {/* Editorial Quote */}
          <div className="mt-6 pl-4 border-l-2 border-cyan-500/50 max-w-xl">
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed italic">
              "{FESTIVAL_METADATA.description}"
            </p>
            <p className="font-mono text-xs text-slate-400 mt-2">
              — Asia's Premier Science & Technology Gateway at Indian Institute of Technology Bombay
            </p>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            <button
              id="hero-register-cta"
              onClick={() => {
                audioEngine.playAccessChime();
                onOpenRegister();
              }}
              onMouseEnter={() => audioEngine.playBlip(800, 0.03)}
              className="px-7 py-3.5 chamfer-button bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500 text-black font-mono font-bold text-xs sm:text-sm tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(0,240,255,0.5)] cursor-pointer flex items-center gap-2 group"
            >
              <span>REGISTER NOW</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-explore-cta"
              onClick={() => {
                audioEngine.playBlip(650, 0.02);
                onExploreClick();
              }}
              className="px-6 py-3.5 chamfer-button border border-cyan-500/40 bg-[#0C111C]/80 hover:bg-cyan-950/40 hover:border-cyan-400 text-slate-200 hover:text-white font-mono text-xs sm:text-sm tracking-wider transition-all cursor-pointer flex items-center gap-2"
            >
              <Compass size={16} className="text-cyan-400" />
              <span>EXPLORE TECHFEST</span>
            </button>
          </div>

          {/* Quick Badges */}
          <div className="mt-10 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs text-slate-400">
            <div>
              <span className="block text-slate-400 text-[10px] tracking-wider uppercase">DATES</span>
              <span className="text-white font-semibold text-xs sm:text-sm">{FESTIVAL_METADATA.dates}</span>
            </div>
            <div>
              <span className="block text-slate-400 text-[10px] tracking-wider uppercase">TERRESTRIAL LOCUS</span>
              <span className="text-white font-semibold text-xs sm:text-sm">{FESTIVAL_METADATA.location}</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="block text-slate-400 text-[10px] tracking-wider uppercase">ADMISSION PASS</span>
              <span className="text-cyan-400 font-semibold text-xs sm:text-sm">OPEN TO ALL</span>
            </div>
          </div>
        </div>

        {/* Right Column: Futuristic Cyborg Centerpiece with Holographic Rings */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div
            className="relative w-full max-w-[440px] aspect-[4/5] flex items-center justify-center transition-transform duration-300 ease-out"
            style={{
              transform: `perspective(1000px) rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg)`,
            }}
          >
            {/* Holographic Outer Rotating Reticle */}
            <div className="absolute inset-0 rounded-full border border-dashed border-cyan-500/30 animate-holo pointer-events-none scale-105" />
            <div className="absolute inset-4 rounded-full border border-cyan-400/20 animate-holo-reverse pointer-events-none scale-95" />
            
            {/* Center Circular Glow */}
            <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 blur-2xl pointer-events-none" />

            {/* Tactical Mechanical Corner Brackets */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
            <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
            <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

            {/* Centerpiece Image Container */}
            <div className="relative w-full h-full rounded-lg overflow-hidden border border-cyan-500/30 bg-[#090D15] shadow-[0_0_40px_rgba(0,240,255,0.2)]">
              <img
                src={FESTIVAL_METADATA.centerpieceImage}
                alt="Techfest 2026 Futuristic Cybernetic Core"
                className="w-full h-full object-cover object-center filter contrast-110 brightness-105"
                loading="eager"
              />

              {/* Scanline Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#06080D] via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_51%)] bg-[length:100%_4px] pointer-events-none" />

              {/* Live HUD Overlays on top of the Robot image */}
              <div className="absolute top-4 left-4 flex flex-col gap-1 font-mono text-[10px] bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded border border-cyan-500/30 text-cyan-300">
                <span className="flex items-center gap-1.5 font-bold">
                  <Cpu size={12} className="text-cyan-400" />
                  CYBERNETIC UNIT 29
                </span>
                <span className="text-slate-400 text-[9px]">ID: TF26-TITAN-X</span>
              </div>

              <div className="absolute top-4 right-4 flex items-center gap-1.5 font-mono text-[10px] bg-emerald-950/60 backdrop-blur-md px-2 py-1 rounded border border-emerald-500/40 text-emerald-300">
                <ShieldCheck size={12} />
                <span>ACTIVE</span>
              </div>

              {/* Bottom Telemetry Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded bg-black/80 backdrop-blur-md border border-cyan-500/30 font-mono text-xs">
                <div className="flex justify-between items-center text-slate-300 text-[10px] mb-1">
                  <span>NEURAL INTEGRATION</span>
                  <span className="text-cyan-400 font-bold">99.8%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full w-[99.8%]" />
                </div>
                <div className="flex justify-between items-center mt-2 text-[9px] text-slate-400">
                  <span>FREQ: 1420.4 MHz</span>
                  <span>SYNC: REAL-TIME</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flight Telemetry HUD Bar (bottom of hero) */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3 sm:p-4 rounded border border-cyan-500/20 bg-[#090D15]/80 backdrop-blur-md font-mono text-xs">
          <div className="border-r border-white/10 pr-2">
            <span className="block text-slate-400 text-[10px]">MISSION MATRIX</span>
            <span className="text-cyan-300 font-bold text-xs sm:text-sm">SCI × TECH × INNOVATION</span>
          </div>
          <div className="md:border-r border-white/10 px-0 sm:px-2">
            <span className="block text-slate-400 text-[10px]">TARGET TIMELINE</span>
            <span className="text-white font-bold text-xs sm:text-sm">{FESTIVAL_METADATA.dates}</span>
          </div>
          <div className="border-r border-white/10 pr-2 mt-2 md:mt-0">
            <span className="block text-slate-400 text-[10px]">COORDINATE LOCUS</span>
            <span className="text-white font-bold text-xs sm:text-sm">{FESTIVAL_METADATA.coordinates}</span>
          </div>
          <div className="px-0 sm:px-2 mt-2 md:mt-0">
            <span className="block text-slate-400 text-[10px]">FLIGHT GATE STATUS</span>
            <span className="text-emerald-400 font-bold text-xs sm:text-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping" />
              SYS // ACTIVE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
