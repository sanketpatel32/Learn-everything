'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SimpleRoadmapProps {
  data: any;
  depth?: number;
  onSelect?: (id: string) => void;
}

export function SimpleRoadmap({ data, depth = 0, onSelect }: SimpleRoadmapProps) {
  const [isExpanded, setIsExpanded] = useState(depth < 1); // Expand first level by default
  const hasChildren = data.children && data.children.length > 0;

  const handleNodeClick = (e: React.MouseEvent) => {
    if (data.isComingSoon) return;
    
    // Toggle expansion if it has children
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
    
    // Trigger selection ONLY if it's a leaf node
    if (!hasChildren) {
      onSelect?.(data.id);
    }
  };

  return (
    <div className={cn("flex flex-col min-w-0", depth > 0 && "ml-1.5 sm:ml-4 md:ml-8 border-l border-slate-800/50 pl-2 sm:pl-4 md:pl-8 py-2")}>
      <motion.div
        layout
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className={cn(
          "group relative flex items-start gap-2.5 sm:gap-4 p-2.5 sm:p-4 rounded-xl transition-all-smooth border border-white/5",
          "bg-slate-900/40 backdrop-blur-xl hover:bg-slate-800/60",
          !data.isComingSoon && "cursor-pointer hover:border-primary/30 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]",
          data.isComingSoon && "opacity-50 grayscale"
        )}
        onClick={handleNodeClick}
      >
        <div className="flex-1 space-y-1 overflow-hidden min-w-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <h3 className="font-bold text-white text-sm sm:text-base tracking-tight group-hover:text-primary transition-colors break-words">
              {data.label}
            </h3>
            {data.isComingSoon && (
              <span className="text-[8px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-800/50 px-1.5 sm:px-2 py-0.5 rounded-full border border-white/5 shrink-0">
                Soon
              </span>
            )}
          </div>
          {data.description && (
            <p className="text-[11px] sm:text-sm text-slate-400 leading-relaxed max-w-2xl">
              {data.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {data.isComingSoon ? (
            <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" />
          ) : (
            hasChildren && (
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="p-1 sm:p-1.5 rounded-lg bg-white/5 border border-white/10"
              >
                <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
              </motion.div>
            )
          )}
        </div>
        
        {/* Connection node/line effect */}
        {depth > 0 && (
          <div className="absolute left-[-0.35rem] sm:left-[-1.1rem] md:left-[-2.1rem] top-6 sm:top-7 w-1 sm:w-4 md:w-8 h-[1px] bg-slate-800/50" />
        )}
      </motion.div>

      <AnimatePresence>
        {isExpanded && hasChildren && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden flex flex-col gap-3 sm:gap-4 mt-3 sm:mt-4"
          >
            {data.children?.map((child: any) => (
              <SimpleRoadmap key={child.id} data={child} depth={depth + 1} onSelect={onSelect} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
