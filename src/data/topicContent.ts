import { slidingWindow } from './topics/sliding-window';
import { capTheorem } from './topics/cap-theorem';
import { twoPointers } from './topics/two-pointers';
import { prefixSum } from './topics/prefix-sum';
import { messagingQueues } from './topics/messaging-queues';
import { arraysStrings } from './topics/arrays-strings';
import { scalingTypes } from './topics/scaling-types';

export type TopicContent = {
  title: string;
  description: string;
  example?: string;
  complexity?: {
    time: string;
    space: string;
  };
  tutorialSteps?: {
    title: string;
    content: string;
  }[];
  approaches?: {
    title: string;
    content: string;
    complexity: {
      time: string;
      space: string;
    };
  }[];
  pitfalls?: string[];
  concepts?: {
    name: string;
    details: string;
  }[];
  
  // System Design Specific Content
  diagram?: string; // Raw SVG string
  keyPoints?: {
    title: string;
    description: string;
  }[];
  comparisonTable?: {
    headers: string[]; // e.g. ['Feature', 'Vertical Scaling', 'Horizontal Scaling']
    rows: string[][]; // e.g. [['Cost', 'Hardware gets expensive', 'Cheap commodity hardware']]
  };
};

export const topicContent: Record<string, TopicContent> = {
  'dsa_slidewin': slidingWindow,
  'sd_consistency_models': capTheorem,
  'dsa_twoptr': twoPointers,
  'dsa_prefix': prefixSum,
  'sd_queues': messagingQueues,
  'dsa_arrays': arraysStrings,
  'sd_scale_vert': scalingTypes
};
