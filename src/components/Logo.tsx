import React from 'react';

export const Logo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    
    {/* Abstract Interconnected Nodes / Path */}
    <path
      d="M20 50 L40 30 L60 70 L80 50"
      stroke="url(#logo-grad)"
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
      filter="url(#glow)"
    />
    
    <circle cx="20" cy="50" r="6" fill="#6366f1" />
    <circle cx="40" cy="30" r="6" fill="#6366f1" />
    <circle cx="60" cy="70" r="6" fill="#a855f7" />
    <circle cx="80" cy="50" r="6" fill="#a855f7" />
    
    {/* Dynamic Element (Floating Node) */}
    <circle cx="50" cy="15" r="4" fill="#6366f1">
      <animate
        attributeName="cy"
        values="15;25;15"
        dur="3s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="0.3;1;0.3"
        dur="3s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);
