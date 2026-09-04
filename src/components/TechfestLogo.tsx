import React from 'react';

interface TechfestLogoProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export const TechfestLogo: React.FC<TechfestLogoProps> = ({
  className = '',
  size = 36,
  glow = true,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${glow ? 'drop-shadow-[0_0_8px_rgba(0,240,255,0.7)]' : ''} ${className}`}
      aria-label="Techfest IIT Bombay Emblem"
    >
      {/* Outer Hexagon */}
      <polygon
        points="50,4 92,27 92,73 50,96 8,73 8,27"
        stroke="#00F0FF"
        strokeWidth="3.5"
        strokeLinejoin="round"
        fill="rgba(0, 240, 255, 0.04)"
      />
      {/* Vertex Nodes */}
      <circle cx="50" cy="4" r="3.2" fill="#00F0FF" />
      <circle cx="92" cy="27" r="3.2" fill="#00F0FF" />
      <circle cx="92" cy="73" r="3.2" fill="#00F0FF" />
      <circle cx="50" cy="96" r="3.2" fill="#00F0FF" />
      <circle cx="8" cy="73" r="3.2" fill="#00F0FF" />
      <circle cx="8" cy="27" r="3.2" fill="#00F0FF" />

      {/* Inner Dashed Hexagon */}
      <polygon
        points="50,18 80,34 80,66 50,82 20,66 20,34"
        stroke="#3B82F6"
        strokeWidth="2"
        strokeDasharray="4 3"
        fill="none"
      />

      {/* Radial Coordinate Lines */}
      <line x1="50" y1="18" x2="50" y2="35" stroke="#7DF4FF" strokeWidth="1.2" strokeOpacity="0.8" />
      <line x1="50" y1="82" x2="50" y2="65" stroke="#7DF4FF" strokeWidth="1.2" strokeOpacity="0.8" />
      <line x1="20" y1="34" x2="35" y2="43" stroke="#7DF4FF" strokeWidth="1.2" strokeOpacity="0.8" />
      <line x1="80" y1="34" x2="65" y2="43" stroke="#7DF4FF" strokeWidth="1.2" strokeOpacity="0.8" />
      <line x1="20" y1="66" x2="35" y2="57" stroke="#7DF4FF" strokeWidth="1.2" strokeOpacity="0.8" />
      <line x1="80" y1="66" x2="65" y2="57" stroke="#7DF4FF" strokeWidth="1.2" strokeOpacity="0.8" />

      {/* Central Black Core with Cyan Crosshair */}
      <circle cx="50" cy="50" r="15" fill="#06080D" stroke="#00F0FF" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="7" fill="rgba(0, 240, 255, 0.25)" />
      
      {/* Reticle Target Cross */}
      <line x1="50" y1="38" x2="50" y2="62" stroke="#00F0FF" strokeWidth="2" />
      <line x1="38" y1="50" x2="62" y2="50" stroke="#00F0FF" strokeWidth="2" />
    </svg>
  );
};
