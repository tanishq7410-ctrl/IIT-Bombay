import React, { useState, useEffect } from 'react';
import { TechfestLogo } from './TechfestLogo';
import { FESTIVAL_METADATA } from '../data/techfestData';
import { Menu, X, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audio';

interface NavbarProps {
  onOpenRegister: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister, activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAudio = () => {
    const newState = audioEngine.toggleSound();
    setSoundActive(newState);
  };

  const navItems = [
    { label: 'EVENTS', href: '#events', id: 'events' },
    { label: 'COMPETITIONS', href: '#competitions', id: 'competitions' },
    { label: 'WORKSHOPS', href: '#workshops', id: 'workshops' },
    { label: 'SPEAKERS', href: '#speakers', id: 'speakers' },
    { label: 'EXHIBITIONS', href: '#exhibitions', id: 'exhibitions' },
    { label: 'ABOUT', href: '#about', id: 'about' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    audioEngine.playBlip(920, 0.03);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#07090E]/90 backdrop-blur-md border-b border-cyan-500/20 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
            : 'bg-transparent border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              audioEngine.playBlip(780, 0.04);
            }}
            className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-cyan-400 rounded-sm"
          >
            <TechfestLogo size={38} />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-lg tracking-wider text-white group-hover:text-cyan-400 transition-colors">
                  TECHFEST
                </span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 tracking-tight">
                  29TH ED.
                </span>
              </div>
              <span className="font-mono text-[11px] tracking-widest text-slate-400 group-hover:text-slate-300 transition-colors">
                IIT BOMBAY
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 font-mono text-xs tracking-wider">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.label}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.href)}
                  onMouseEnter={() => audioEngine.playBlip(600, 0.02)}
                  className={`relative px-3.5 py-1.5 rounded-sm transition-all cursor-pointer ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-950/40 border border-cyan-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {item.label}
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    )}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Locus Coordinates Status Badge */}
            <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded bg-black/40 border border-white/10 font-mono text-[11px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{FESTIVAL_METADATA.coordinates}</span>
            </div>

            {/* Audio Toggle */}
            <button
              id="audio-toggle-btn"
              onClick={toggleAudio}
              title={soundActive ? 'Mute interface telemetry sound' : 'Enable interface telemetry sound'}
              className={`p-2 rounded border transition-all cursor-pointer ${
                soundActive
                  ? 'border-cyan-500/50 bg-cyan-950/30 text-cyan-300'
                  : 'border-white/10 text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              {soundActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {/* Register CTA Button */}
            <button
              id="nav-register-btn"
              onClick={() => {
                audioEngine.playAccessChime();
                onOpenRegister();
              }}
              onMouseEnter={() => audioEngine.playBlip(750, 0.02)}
              className="relative group overflow-hidden px-4 py-2 chamfer-button bg-gradient-to-r from-cyan-500 to-blue-600 text-[#06080D] font-mono text-xs font-bold tracking-wider hover:from-cyan-400 hover:to-blue-500 transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Sparkles size={14} className="animate-spin text-black" style={{ animationDuration: '6s' }} />
                REGISTER NOW
              </span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              id="mobile-audio-toggle"
              onClick={toggleAudio}
              className={`p-2 rounded border transition-colors ${
                soundActive ? 'border-cyan-500/50 text-cyan-300' : 'border-white/10 text-slate-400'
              }`}
            >
              {soundActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            <button
              id="mobile-menu-trigger"
              onClick={() => {
                audioEngine.playBlip(700, 0.03);
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Toggle navigation menu"
              className="p-2 text-slate-300 hover:text-white border border-white/10 rounded focus:outline-none focus:border-cyan-400"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="fixed inset-0 z-40 bg-[#06080D]/95 backdrop-blur-2xl pt-20 px-6 pb-8 flex flex-col justify-between border-b border-cyan-500/30 sm:hidden animate-in fade-in duration-200"
        >
          <div className="flex flex-col gap-3">
            <div className="font-mono text-[11px] text-cyan-400 tracking-widest uppercase mb-1 border-b border-cyan-500/20 pb-2 flex justify-between items-center">
              <span>NAVIGATION MATRIX</span>
              <span>29TH EDITION</span>
            </div>
            {navItems.map((item, idx) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="flex items-center justify-between py-3 border-b border-white/5 font-mono text-sm tracking-wider text-slate-200 hover:text-cyan-400 text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-cyan-500">0{idx + 1} //</span>
                  <span>{item.label}</span>
                </div>
                <span className="text-cyan-500/40 text-xs">→</span>
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-cyan-500/20 space-y-4">
            <div className="flex items-center justify-between font-mono text-[11px] text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                POWAI CAMPUS
              </span>
              <span>{FESTIVAL_METADATA.coordinates}</span>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="w-full py-3 chamfer-button bg-cyan-400 text-black font-mono font-bold text-xs tracking-wider text-center shadow-[0_0_20px_rgba(0,240,255,0.4)]"
            >
              REGISTER FOR TECHFEST 2026
            </button>
          </div>
        </div>
      )}
    </>
  );
};
