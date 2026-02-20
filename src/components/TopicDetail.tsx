'use client';

import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Brain, AlertCircle, Lock, ArrowUp, Zap, GitCompare } from 'lucide-react';
import { topicContent } from '@/data/topicContent';
import { cn } from '@/lib/utils';

function ScrollToTop({ containerRef }: { readonly containerRef: React.RefObject<HTMLDivElement> }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    
    const toggleVisibility = () => {
      if (el.scrollTop > 400) setIsVisible(true);
      else setIsVisible(false);
    };
    el.addEventListener('scroll', toggleVisibility);
    return () => el.removeEventListener('scroll', toggleVisibility);
  }, [containerRef]);

  const scrollToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 p-5 rounded-full bg-gradient-to-br from-primary to-indigo-600 text-white shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:scale-110 active:scale-95 transition-all z-[100] backdrop-blur-md"
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function ScrollIndicator({ containerRef }: { readonly containerRef: React.RefObject<HTMLDivElement> }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleScroll = () => {
      if (el.scrollTop > 50) setIsVisible(false);
      else setIsVisible(true);
    };
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [containerRef]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center gap-1"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Scroll</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowUp className="w-4 h-4 text-slate-500 rotate-180" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function RichText({ content }: { readonly content: string }) {
  // Split the content by multiline code blocks
  const blocks = content.split(/(```[\s\S]*?```)/g);

  const renderLine = (text: string) => {
    // Split by backticks for inline code
    const parts = text.split(/(`[^`]+`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="bg-slate-900/60 text-indigo-300 px-1.5 py-0.5 rounded-md font-mono text-[13px] border border-white/10 shadow-sm">
            {part.slice(1, -1)}
          </code>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="space-y-4 text-slate-300 text-[15px] leading-relaxed relative z-10 w-full">
      {blocks.map((block, blockIdx) => {
        if (block.startsWith('```') && block.endsWith('```')) {
          // It's a code block, strip formatting and language tag
          const codeContent = block.slice(3, -3).replace(/^[a-z]*\n/, '');
          return (
            <pre key={blockIdx} className="bg-[#0f111a] border border-white/10 p-5 rounded-xl overflow-x-auto text-[13px] font-mono text-emerald-300 my-4 shadow-inner">
              <code>{codeContent}</code>
            </pre>
          );
        }

        // It's regular markdown text
        return (
          <div key={blockIdx} className="space-y-4">
            {block.split('\n\n').filter(b => b.trim() !== '').map((paragraphBlock, idx) => {
              const lines = paragraphBlock.split('\n');
              return (
                <div key={idx} className="space-y-2">
                  {lines.map((line, lineIdx) => {
                    const listMatch = line.match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
                    if (listMatch) {
                      const indent = Math.max(0, listMatch[1].length);
                      const marker = listMatch[2];
                      const text = listMatch[3];
                      return (
                        <div key={lineIdx} className="flex items-start gap-3" style={{ marginLeft: `${indent * 8}px` }}>
                          <span className="text-slate-500 font-mono select-none w-5 shrink-0 text-right mt-[2px]">{marker}</span>
                          <div className="flex-1">{renderLine(text)}</div>
                        </div>
                      );
                    }
                    return <div key={lineIdx} className="flex-1">{renderLine(line)}</div>;
                  })}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

interface TopicDetailProps {
  readonly topicId: string | null;
  readonly onClose: () => void;
}

export function TopicDetail({ topicId, onClose }: TopicDetailProps) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const content = topicId ? topicContent[topicId] : null;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when panel is open
  useEffect(() => {
    if (topicId) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = 'var(--removed-body-scroll-bar-size, 0px)';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [topicId]);

  if (!mounted) return null;

  const panel = (
    <AnimatePresence mode="wait">
      {topicId && (
        <div className="fixed inset-0 z-[1000] pointer-events-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
          />

          {/* Panel */}
          <motion.div
            ref={containerRef}
            initial={{ x: '100dvw' }}
            animate={{ x: 0 }}
            exit={{ x: '100dvw' }}
            transition={{ type: 'spring', damping: 35, stiffness: 300 }}
            className={cn(
              "absolute top-0 right-0 h-[100dvh] w-full sm:w-[85vw] lg:w-[80vw] xl:w-[80vw] min-w-[320px]",
              "bg-slate-900/98 backdrop-blur-3xl border-l border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-y-auto pointer-events-auto selection:bg-indigo-500/30",
              "scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent hover:scrollbar-thumb-white/10",
              "after:content-[''] after:absolute after:top-0 after:left-0 after:w-[1px] after:h-full after:bg-gradient-to-b after:from-transparent after:via-indigo-500/20 after:to-transparent"
            )}
          >
            {/* Header / Top Bar */}
            <div className="sticky top-0 z-[80] bg-slate-900/90 backdrop-blur-md px-6 py-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-mono uppercase tracking-tighter">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Learning Mode
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors group"
                aria-label="Close panel"
              >
                <X className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:rotate-90 transition-all duration-300" />
              </button>
            </div>

            <ScrollIndicator containerRef={containerRef} />

            <div className="px-6 sm:px-12 py-8 relative">
              {content ? (
                <div className="space-y-12 pb-24">
                  <div className="space-y-4">
                    <h2 className="text-4xl font-extrabold bg-gradient-to-r from-white via-indigo-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
                      {content.title}
                    </h2>
                    <p className="text-slate-300 leading-relaxed text-lg font-medium opacity-90">
                      {content.description}
                    </p>
                  </div>

                  {/* Example */}
                  {content.example && (
                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 shadow-inner">
                      <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-3">Example</span>
                      <p className="text-slate-200 text-lg leading-relaxed italic border-l-2 border-indigo-500/50 pl-4 py-1">{content.example}</p>
                    </div>
                  )}

                  {/* Complexity Badges (General Pattern) */}
                  {content.complexity && (
                    <div className="flex flex-wrap gap-4">
                      <div className="flex-1 p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] block mb-2 opacity-60">Time Complexity</span>
                        <code className="text-xl font-mono text-white glow-indigo">{content.complexity.time}</code>
                      </div>
                      <div className="flex-1 p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em] block mb-2 opacity-60">Space Complexity</span>
                        <code className="text-xl font-mono text-white glow-emerald">{content.complexity.space}</code>
                      </div>
                    </div>
                  )}

                  {/* Approaches (DSA) */}
                  {content.approaches && content.approaches.length > 0 && (
                    <div className="space-y-8">
                      <div className="flex items-center gap-3 text-white font-bold text-xl">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20 shadow-inner">
                          <Brain className="w-5 h-5" />
                        </div>
                        <h3>Approaches</h3>
                      </div>
                      <div className="space-y-6">
                        {content.approaches.map((approach, idx) => (
                          <div key={approach.title} className="p-6 rounded-2xl bg-slate-800/20 border border-white/5 hover:border-indigo-500/20 hover:bg-slate-800/40 transition-all group/approach relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500/50 to-transparent opacity-0 group-hover/approach:opacity-100 transition-opacity" />
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                              <h4 className="text-white font-bold text-lg flex items-center gap-3">
                                <span className="bg-white/10 text-slate-300 px-2.5 py-1 rounded-md text-sm font-mono">{idx + 1}</span>
                                {approach.title}
                              </h4>
                              {/* Approach Complexity */}
                              <div className="flex items-center gap-3 flex-wrap">
                                <span className="px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-mono font-bold tracking-wider uppercase">⏱️ TC: <span className="text-white ml-1 text-sm">{approach.complexity.time}</span></span>
                                <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] font-mono font-bold tracking-wider uppercase">💾 SC: <span className="text-white ml-1 text-sm">{approach.complexity.space}</span></span>
                              </div>
                            </div>
                            <RichText content={approach.content} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tutorial Steps (System Design or General) */}
                  {content.tutorialSteps && content.tutorialSteps.length > 0 && (
                  <div className="space-y-8">
                    <div className="flex items-center gap-3 text-white font-bold text-xl">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-inner">
                        <span className="text-sm font-mono">01</span>
                      </div>
                      <h3>Step-by-Step Tutorial</h3>
                    </div>
                    <div className="relative space-y-2">
                       <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary/50 via-slate-800 to-transparent" />
                      {content.tutorialSteps.map((step, idx) => (
                        <div key={step.title} className="relative pl-12 group/step py-4 hover:bg-white/[0.02] rounded-2xl transition-colors">
                          <div className="absolute left-[14px] top-[26px] w-3 h-3 rounded-full bg-slate-900 border-2 border-primary/50 group-hover/step:scale-125 transition-transform shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                          <h4 className="text-white font-bold mb-2 text-lg">{step.title}</h4>
                          <RichText content={step.content} />
                        </div>
                      ))}
                    </div>
                  </div>
                  )}

                  {/* Diagram (System Design) */}
                  {content.diagram && (
                    <div className="my-8 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0a0a0f] p-6 sm:p-10 flex justify-center items-center">
                      <div dangerouslySetInnerHTML={{ __html: content.diagram }} className="w-full max-w-4xl svg-container flex justify-center text-white" />
                    </div>
                  )}

                  {/* Key Points (System Design) */}
                  {content.keyPoints && content.keyPoints.length > 0 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 text-white font-bold text-xl">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20 shadow-inner">
                          <Zap className="w-5 h-5" />
                        </div>
                        <h3>Core Concepts</h3>
                      </div>
                      <div className="grid gap-4">
                        {content.keyPoints.map((point) => (
                          <div key={point.title} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-4 items-start">
                            <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0 shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                            <div className="flex-1">
                               <h4 className="text-white font-bold mb-2 text-lg">{point.title}</h4>
                               <RichText content={point.description} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Comparison Table (System Design) */}
                  {content.comparisonTable && (
                    <div className="space-y-6 overflow-hidden">
                      <div className="flex items-center gap-3 text-white font-bold text-xl">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 shadow-inner">
                          <GitCompare className="w-5 h-5" />
                        </div>
                        <h3>Comparative Analysis</h3>
                      </div>
                      <div className="overflow-x-auto rounded-xl border border-white/10 shadow-lg scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        <table className="w-full text-left border-collapse min-w-[600px] text-sm md:text-[15px]">
                          <thead>
                            <tr className="bg-slate-800/50">
                              {content.comparisonTable.headers.map((header, i) => (
                                <th key={i} className="p-5 font-bold text-slate-200 border-b border-white/10">{header}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="bg-slate-900/30 divide-y divide-white/5">
                            {content.comparisonTable.rows.map((row, i) => (
                              <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                                {row.map((cell, j) => (
                                  <td key={j} className={cn("p-5 text-slate-300 leading-relaxed", j === 0 ? "font-semibold text-white/90 bg-white/[0.01]" : "")}>{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Key Concepts */}
                  {content.concepts && content.concepts.length > 0 && (
                    <div className="space-y-8">
                      <div className="flex items-center gap-3 text-white font-bold text-xl">
                        <Brain className="w-6 h-6 text-amber-400" />
                        <h3>Architecture Insights</h3>
                      </div>
                      <div className="grid gap-6">
                        {content.concepts?.map((concept) => (
                          <div key={concept.name} className="p-6 rounded-2xl bg-slate-800/20 border border-white/5 hover:border-slate-700/50 hover:bg-slate-800/30 transition-all group/card">
                            <h4 className="text-amber-400 font-bold mb-3 group-hover/card:text-amber-300 flex items-center gap-2">
                               <div className="w-1 h-4 bg-amber-500/50 rounded-full" />
                               {concept.name}
                            </h4>
                            <p className="text-slate-400 text-sm leading-relaxed">{concept.details}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pitfalls */}
                  {content.pitfalls && content.pitfalls.length > 0 && (
                    <div className="p-8 rounded-3xl bg-rose-500/[0.03] border border-rose-500/10 shadow-lg relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-[0.05] pointer-events-none">
                         <AlertCircle className="w-32 h-32 text-rose-500" />
                      </div>
                      <div className="flex items-center gap-3 text-rose-400 font-black uppercase tracking-widest text-xs mb-6">
                        <AlertCircle className="w-4 h-4" />
                        <span>Critical Pitfalls</span>
                      </div>
                      <ul className="grid gap-4">
                        {content.pitfalls.map((pitfall) => (
                          <li key={pitfall} className="text-slate-300 text-sm flex items-start gap-3 bg-white/[0.02] p-4 rounded-xl">
                            <span className="text-rose-500/50 font-mono">0x</span>
                            {pitfall}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-8">
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="w-32 h-32 rounded-3xl bg-indigo-500/5 flex items-center justify-center border border-indigo-500/10 relative"
                  >
                    <Lock className="w-12 h-12 text-indigo-400/50" />
                    <div className="absolute inset-0 bg-indigo-500/10 blur-2xl rounded-full" />
                  </motion.div>
                  <div className="space-y-2">
                    <h2 className="text-4xl font-black text-white tracking-tight">Expansion in Progress</h2>
                    <p className="text-slate-400 max-w-sm mx-auto leading-relaxed">
                      Our architects are crafting a premium deep-dive for this module. Notifications active.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <ScrollToTop containerRef={containerRef} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return mounted ? createPortal(panel, document.body) : null;
}
