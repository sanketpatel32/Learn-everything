import { TopicContent } from '../topicContent';

export const arraysStrings: TopicContent = {
  title: 'Arrays & Strings',
  description:
    'Arrays and strings are contiguous sequences, so performance comes from precise index arithmetic, cache-friendly traversal, and careful in-place transformation. Most interview patterns are built from these fundamentals.',
  diagram: `
<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="prefixGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#10b981" stop-opacity="0.05" />
    </linearGradient>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
    </marker>
  </defs>

  <rect x="0" y="0" width="800" height="350" fill="#0f172a" rx="16" stroke="#1e293b"/>

  <!-- Original Array -->
  <text x="50" y="40" fill="#64748b" font-size="12" font-weight="bold">Original Array</text>
  <g transform="translate(50, 60)">
    ${[3, 1, 4, 1, 5].map((val, i) => `
      <rect x="${i * 60}" y="0" width="50" height="50" fill="#1e293b" rx="8" stroke="#334155" stroke-width="2"/>
      <text x="${i * 60 + 25}" y="30" fill="#f8fafc" font-size="18" font-weight="bold" text-anchor="middle">${val}</text>
    `).join('')}
  </g>

  <!-- Prefix Sum Logic -->
  <path d="M 75 110 L 75 150" stroke="#10b981" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <path d="M 135 110 L 135 150" stroke="#10b981" stroke-width="2" fill="none" marker-end="url(#arrow)"/>

  <!-- Prefix Array -->
  <text x="50" y="190" fill="#64748b" font-size="12" font-weight="bold">Prefix Sum Array (P[i] = P[i-1] + A[i])</text>
  <g transform="translate(50, 210)">
    ${[3, 4, 8, 9, 14].map((val, i) => `
      <rect x="${i * 60}" y="0" width="50" height="50" fill="url(#prefixGrad)" rx="8" stroke="#10b981" stroke-width="2"/>
      <text x="${i * 60 + 25}" y="30" fill="#f8fafc" font-size="18" font-weight="bold" text-anchor="middle">${val}</text>
    `).join('')}
  </g>

  <!-- Application -->
  <rect x="420" y="210" width="330" height="50" fill="#1e293b" rx="8" stroke="#334155"/>
  <text x="435" y="240" fill="#94a3b8" font-size="14">Range Sum [1, 3] = P[3] - P[0] = 9 - 3 = 6</text>
</svg>
  `,
  keyPoints: [
    {
      title: 'Prefix Sum Pattern',
      description: 'Precomputing a running sum allows $O(1)$ range sum queries. Essential for problems involving subarray sums or equilibrium points.'
    },
    {
      title: 'In-place Space Optimization',
      description: 'For Many array problems (Rotation, Reverse, Move Zeroes), O(1) space is achievable by using index swaps or two-pointer logic instead of allocating new buffers.'
    },
    {
      title: 'String Immutability',
      description: 'Strings in languages like Java/Python are immutable. For heavy manipulation, convert them to arrays or use `StringBuilder` to avoid $O(N^2)$ memory fragmentation.'
    }
  ],
  comparisonTable: {
    headers: ['Pattern', 'Performance', 'Typical Problems'],
    rows: [
      ['Prefix Sum', '$O(N)$ Precompute, $O(1)$ Query', 'Subarray Sum Equals K, Range Sum Queries.'],
      ['Difference Array', '$O(N)$ Apply, $O(N)$ Result', 'Range Updates (Add X to arr[i..j]).'],
      ['In-place Swap', '$O(N)$ Time, $O(1)$ Space', 'Reverse String, Move Zeroes, Rotate Array.'],
      ['Frequency Map', '$O(N)$ Time, $O(K)$ Space', 'First Unique Char, Group Anagrams.'],
    ]
  },
  videoUrl: 'https://www.youtube.com/watch?v=scD316UepaE',
  approaches: [
    {
      title: 'Prefix Sum Template',
      content: '```python\ndef prefixSum(nums):\n    P = [0] * (len(nums) + 1)\n    for i in range(len(nums)):\n        P[i+1] = P[i] + nums[i]\n    # Sum of nums[i..j] is P[j+1] - P[i]\n    return P\n```',
      complexity: { time: 'O(N)', space: 'O(N)' }
    },
    {
      title: 'Difference Array Template',
      content: 'Used for multiple range updates $[L, R]$ with value $V$. \n\n```python\ndef rangeUpdate(diff, L, R, V):\n    diff[L] += V\n    if R + 1 < len(diff):\n        diff[R + 1] -= V\n# Final array: cumulative sum of diff\n```',
      complexity: { time: 'O(1) per update', space: 'O(N)' }
    }
  ],
  concepts: [
    {
      name: 'Sentinel Values (Dummy Nodes)',
      details: 'Adding a 0 at index 0 in Prefix Sums or a dummy node in Linked Lists often removes painful edge-case checks for index 0.'
    }
  ],
  pitfalls: [
    'Integer Overflow: Prefix sums can exceed $2^{31}-1$ even if the original numbers don\'t.',
    'String Concatenation: Repeatedly doing `s += char` is $O(N^2)$ in most languages. Use Join or List append instead.',
    'Negative Numbers: Standard Prefix Sum works, but Sliding Window often fails on negative numbers for sum targets.'
  ]
};
