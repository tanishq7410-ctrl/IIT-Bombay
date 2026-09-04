import React, { useState, useEffect, useRef } from 'react';
import { TELEMETRY_STATS } from '../data/techfestData';
import { Activity, Radio, Cpu, Award } from 'lucide-react';

export const TelemetryStats: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<number[]>(TELEMETRY_STATS.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1600; // ms
    const frameRate = 30;
    const totalFrames = Math.round(duration / (1000 / frameRate));
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = Math.min(frame / totalFrames, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);

      setCounts(
        TELEMETRY_STATS.map((item) => Math.floor(item.value * ease))
      );

      if (frame >= totalFrames) {
        clearInterval(timer);
        setCounts(TELEMETRY_STATS.map((item) => item.value));
      }
    }, 1000 / frameRate);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section
      ref={containerRef}
      id="telemetry-stats"
      aria-label="Festival Statistics and Metrics"
      className="relative py-16 bg-[#080B12] border-y border-cyan-500/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 mb-1.5">
              <Activity size={14} className="animate-pulse" />
              <span>TELEMETRY_STREAM // SYSTEM_SCALE</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
              SCALE & GLOBAL ENGAGEMENT
            </h2>
          </div>
          <div className="font-mono text-xs text-slate-400 flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" />
              SAMPLING RATE: 100 Hz
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="text-cyan-300">BENCHMARK: 29TH CYCLE</span>
          </div>
        </div>

        {/* 4-Column Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TELEMETRY_STATS.map((stat, idx) => (
            <div
              key={stat.id}
              className="relative p-6 rounded-lg bg-[#0D121D] border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 group hover:shadow-[0_0_25px_rgba(0,240,255,0.15)] flex flex-col justify-between"
            >
              {/* Corner tick marks */}
              <div className="absolute top-2 right-2 font-mono text-[9px] text-slate-400 group-hover:text-cyan-400 transition-colors">
                {stat.metricCode}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  {idx === 0 && <Cpu size={16} className="text-cyan-400" />}
                  {idx === 1 && <Radio size={16} className="text-cyan-400" />}
                  {idx === 2 && <Activity size={16} className="text-cyan-400" />}
                  {idx === 3 && <Award size={16} className="text-cyan-400" />}
                  <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>

                <div className="flex items-baseline gap-1 font-display font-black text-4xl sm:text-5xl text-white group-hover:text-cyan-300 transition-colors">
                  <span>{counts[idx]}</span>
                  <span className="text-cyan-400 text-3xl">{stat.suffix}</span>
                </div>

                <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                  {stat.description}
                </p>
              </div>

              {/* Progress bar gauge */}
              <div className="mt-6 pt-4 border-t border-white/5">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mb-1.5">
                  <span>CAPACITY INDEX</span>
                  <span className="text-cyan-400">{stat.percentage}%</span>
                </div>
                <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-1000 ease-out"
                    style={{ width: isVisible ? `${stat.percentage}%` : '0%' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Live Audio/Signal Oscilloscope Bar below stats */}
        <div className="mt-8 p-3 rounded bg-black/40 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-cyan-400 uppercase font-semibold">SIGNAL HARMONICS:</span>
            <div className="flex items-center gap-1 h-4">
              {[12, 18, 8, 22, 14, 28, 10, 24, 16, 30, 20, 15, 25, 9, 19, 13, 27].map((height, i) => (
                <span
                  key={i}
                  className="w-1 bg-cyan-400/70 rounded-full animate-pulse"
                  style={{
                    height: `${height}px`,
                    animationDelay: `${i * 90}ms`,
                    animationDuration: '1.4s',
                  }}
                />
              ))}
            </div>
          </div>
          <div className="text-[11px] text-slate-400">
            SYS_HEALTH: <span className="text-emerald-400 font-semibold">100% NOMINAL</span> • BANDWIDTH: 10 Gbps FIBER
          </div>
        </div>
      </div>
    </section>
  );
};
