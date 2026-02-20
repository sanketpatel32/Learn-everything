import { TopicContent } from '../topicContent';

export const slidingWindow: TopicContent = {
  title: 'Sliding Window Pattern',
  description: 'An advanced algorithmic technique used to find optimal subarrays or substrings. It fundamentally converts nested loops (O(N²)) into a single linear pass (O(N)) by maintaining a moving "window" of elements over the data.',
  diagram: `
<svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="windowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.05" />
    </linearGradient>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#60a5fa" />
    </marker>
  </defs>

  <rect x="0" y="0" width="800" height="300" fill="#0f172a" rx="16" stroke="#1e293b"/>

  <!-- Array Elements -->
  <g transform="translate(100, 100)">
    ${[2, 3, 1, 2, 4, 3].map((val, i) => `
      <rect x="${i * 60}" y="0" width="50" height="50" fill="#1e293b" rx="8" stroke="#334155" stroke-width="2"/>
      <text x="${i * 60 + 25}" y="30" fill="#f8fafc" font-size="18" font-weight="bold" text-anchor="middle">${val}</text>
      <text x="${i * 60 + 25}" y="70" fill="#64748b" font-size="10" text-anchor="middle">idx ${i}</text>
    `).join('')}
  </g>

  <!-- Sliding Window Highlight -->
  <rect x="275" y="90" width="115" height="70" fill="url(#windowGrad)" rx="12" stroke="#3b82f6" stroke-width="3" stroke-dasharray="8 4"/>
  <text x="332" y="80" fill="#60a5fa" font-size="12" font-weight="bold" text-anchor="middle">Current Window [1, 2]</text>

  <!-- Pointers -->
  <path d="M 220 180 L 220 155" stroke="#ef4444" stroke-width="3" fill="none" marker-end="url(#arrow)"/>
  <text x="220" y="200" fill="#ef4444" font-size="12" font-weight="bold" text-anchor="middle">Left (Shrink)</text>

  <path d="M 390 180 L 390 155" stroke="#10b981" stroke-width="3" fill="none" marker-end="url(#arrow)"/>
  <text x="390" y="200" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Right (Expand)</text>

  <!-- State Tracking -->
  <rect x="550" y="220" width="180" height="60" fill="#1e293b" rx="8" stroke="#334155"/>
  <text x="640" y="240" fill="#94a3b8" font-size="12" text-anchor="middle">Window State</text>
  <text x="640" y="265" fill="#f8fafc" font-size="16" font-weight="bold" text-anchor="middle">Sum: 3 (1+2)</text>
</svg>
  `,
  keyPoints: [
    {
      title: 'Monotonicity Requirement',
      description: 'The pattern relies on the property that expanding the window moves the result in one direction (e.g., increasing sum) and shrinking moves it in the other. This is why it often fails on arrays with negative numbers for sum-related problems.'
    },
    {
      title: 'State Tracking Strategy',
      description: 'The efficiency comes from updating the state (sum, freq map, min/max) incrementally in $O(1)$ during each slide, rather than re-scanning the entire window.'
    },
    {
      title: 'Standard Template (Variable Window)',
      description: 'The "While-Loop" template: Expand `right` until valid, then shrink `left` while maintaining validity to find the optimal size.'
    }
  ],
  comparisonTable: {
    headers: ['Window Type', 'Use Case', 'Implementation Strategy'],
    rows: [
      ['Fixed Window', 'Subarrays of size K', 'Slide a fixed-size frame; update state as elements enter/exit.'],
      ['Variable (Dynamic)', 'Smallest/Largest Subarray', 'Expand `right` until valid; shrink `left` as much as possible.'],
      ['Global/Dynamic', 'Non-overlapping segments', 'Multiple windows managed by complex state conditions.'],
    ]
  },
  videoUrl: 'https://www.youtube.com/watch?v=MK-NZ4hN7LU',
  approaches: [
    {
      title: 'Fixed Size Window Template',
      content: 'Used when the problem asks for something about **every subarray of size K**. \n\n```python\ndef fixedWindow(arr, k):\n    window_state = initial_state()\n    # 1. Build initial window of size K\n    for i in range(k):\n        update_state(window_state, arr[i])\n    \n    # 2. Slide the window\n    for i in range(k, len(arr)):\n        remove_from_state(window_state, arr[i - k])\n        add_to_state(window_state, arr[i])\n        process_result(window_state)\n```',
      complexity: { time: 'O(N)', space: 'O(K) or O(1)' }
    },
    {
      title: 'Variable Size Window Template (Smallest)',
      content: 'Used to find the **shortest** subarray satisfying a condition (e.g., sum $\\geq$ S). \n\n```python\ndef variableWindow(arr, condition):\n    left = 0\n    state = initial_state()\n    for right in range(len(arr)):\n        add_to_state(state, arr[right])\n        while condition_met(state):\n            update_best_result(right - left + 1)\n            remove_from_state(state, arr[left])\n            left += 1\n```',
      complexity: { time: 'O(N)', space: 'O(K) or O(1)' }
    }
  ],
  pitfalls: [
    'Off-by-one errors: Forgetting that a window size is `right - left + 1`.',
    'Invalid State: Failing to precisely mirror the "add" logic in the "remove" logic (e.g., updating a hash map incorrectly).',
    'Non-monotonic data: Trying to use this on arrays with negative numbers for sum problems. Use Prefix Sum + Hash Map instead.'
  ],
  concepts: [
    {
      name: 'Auxiliary State Tracking',
      details: 'Using a Hash Map (for frequencies), Monotonic Queue (for min/max), or Counter (for distinct elements) to keep track of window properties.'
    }
  ]
};
