'use client';

import React, { useMemo } from 'react';
import { dsaRoadmap, systemDesignRoadmap } from '@/data/roadmap';
import { SimpleRoadmap } from './SimpleRoadmap';

interface RoadmapGraphProps {
  readonly type: 'dsa' | 'system-design';
}

export default function RoadmapGraph({ type }: RoadmapGraphProps) {
  const rootData = useMemo(() => (type === 'dsa' ? dsaRoadmap : systemDesignRoadmap), [type]);

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 md:px-6 py-8 overflow-hidden">
      <div className="flex flex-col gap-6 w-full">
        <SimpleRoadmap data={rootData} />
      </div>
    </div>
  );
}
