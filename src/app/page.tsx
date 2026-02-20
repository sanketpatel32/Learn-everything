'use client';

import { useState } from 'react';
import RoadmapGraph from '@/components/RoadmapGraph';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'dsa' | 'system-design' | 'examples'>('dsa');

  return (
    <main className="flex min-h-screen flex-col items-center bg-background text-foreground relative selection:bg-primary/30 w-full overflow-x-hidden">
      
      {/* Background container ensuring it doesn't cause overflow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Dynamic background elements */}
        <div className="absolute top-[-5%] left-[-5%] w-[50%] h-[50%] bg-indigo-500/10 blur-[130px] rounded-full point-events-none mix-blend-plus-lighter" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-violet-500/5 blur-[130px] rounded-full point-events-none mix-blend-plus-lighter" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.03)_0%,transparent_70%)]" />
      </div>

      <header className="w-full max-w-7xl px-4 sm:px-8 py-8 md:py-12 flex flex-col items-center gap-6 sm:gap-8 z-10">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-indigo-500/5 rounded-[2rem] p-1 border border-white/5 backdrop-blur-3xl relative flex items-center justify-center overflow-hidden group shadow-2xl">
            {/* Rotating Aura Background */}
            <div className="absolute inset-x-0 inset-y-0 bg-[conic-gradient(from_0deg,transparent,rgba(99,102,241,0.2),transparent)] animate-[spin_4s_linear_infinite]" />
            <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full opacity-60 animate-pulse" />
            
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full relative z-10 drop-shadow-[0_0_20px_rgba(99,102,241,0.6)]"
            >
              <defs>
                <linearGradient id="core-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
                <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Orbital Paths */}
              <circle cx="50" cy="50" r="30" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="2 4" />
              <circle cx="50" cy="50" r="15" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />

              {/* Central Knowledge Core */}
              <circle cx="50" cy="50" r="8" fill="url(#core-grad)" filter="url(#neon-glow)">
                <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" />
              </circle>

              {/* Orbital Nodes & Neural Paths */}
              <g className="animate-[spin_8s_linear_infinite] origin-center">
                <circle cx="20" cy="50" r="4" fill="#6366f1" filter="url(#neon-glow)" />
                <path d="M50 50 L20 50" stroke="#6366f1" strokeWidth="0.5" opacity="0.3" />
              </g>

              <g className="animate-[spin_12s_linear_infinite_reverse] origin-center">
                <circle cx="80" cy="50" r="3" fill="#a855f7" filter="url(#neon-glow)" />
                <path d="M50 50 L80 50" stroke="#a855f7" strokeWidth="0.5" opacity="0.3" />
              </g>

              <g className="animate-[spin_15s_linear_infinite] origin-center">
                <circle cx="50" cy="20" r="2.5" fill="#f43f5e" filter="url(#neon-glow)" />
                <path d="M50 50 L50 20" stroke="#f43f5e" strokeWidth="0.5" opacity="0.3" />
              </g>

              {/* Floating Dynamic Particles */}
              <circle cx="35" cy="35" r="1" fill="white" opacity="0.5">
                <animate attributeName="opacity" values="0.2;1;0.2" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="65" cy="65" r="1" fill="white" opacity="0.5">
                <animate attributeName="opacity" values="0.2;1;0.2" dur="2.1s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
        </motion.div>

        <div className="text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] sm:text-xs font-semibold tracking-wide uppercase mb-1 sm:mb-2">
            Interview Preparation
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-b from-white via-white to-slate-500 bg-clip-text text-transparent italic leading-[1.1] sm:leading-tight">
            SKILL ROADMAPS
          </h1>
          <p className="text-slate-400 max-w-lg mx-auto text-sm sm:text-base md:text-lg leading-relaxed font-medium px-4">
            Interactive, expert-curated paths to help you master the engineering interview and crack top-tier companies.
          </p>
        </div>

        {/* Premium Tab Switcher - Responsive Handling */}
        <div className="flex w-full sm:w-auto items-center gap-1 p-1 bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-2xl shadow-2xl overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('dsa')}
            className={`relative flex-1 sm:flex-none px-4 sm:px-8 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap min-w-[140px] ${
              activeTab === 'dsa' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {activeTab === 'dsa' && (
              <motion.div
                layoutId="activeTabBadge"
                className="absolute inset-0 bg-primary shadow-[0_0_25px_rgba(99,102,241,0.5)] rounded-xl"
                initial={false}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center gap-2">
              DSA Guide
            </span>
          </button>
          <button
            onClick={() => setActiveTab('system-design')}
            className={`relative flex-1 sm:flex-none px-4 sm:px-8 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap min-w-[140px] ${
              activeTab === 'system-design' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {activeTab === 'system-design' && (
              <motion.div
                layoutId="activeTabBadge"
                className="absolute inset-0 bg-primary shadow-[0_0_25px_rgba(99,102,241,0.5)] rounded-xl"
                initial={false}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center gap-2">
              System Design
            </span>
          </button>
          <button
            onClick={() => setActiveTab('examples')}
            className={`relative flex-1 sm:flex-none px-4 sm:px-8 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap min-w-[140px] ${
              activeTab === 'examples' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {activeTab === 'examples' && (
              <motion.div
                layoutId="activeTabBadge"
                className="absolute inset-0 bg-primary shadow-[0_0_25px_rgba(99,102,241,0.5)] rounded-xl"
                initial={false}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center gap-2">
              Real-World Examples
            </span>
          </button>
        </div>
      </header>

      {/* Graph Area */}
      <div className="w-full max-w-[1440px] flex-1 px-8 pb-12 z-10 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="w-full h-full flex flex-col flex-1"
          >
            <RoadmapGraph type={activeTab} />
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
