import { TopicContent } from '../topicContent';

export const twoPointers: TopicContent = {
  title: 'Two Pointers Technique',
  description:
    'Two pointers replace nested scans by maintaining two moving boundaries with deterministic movement rules. The pattern appears in pair-sum, partitioning, palindrome checks, deduplication, and linked-list cycle problems.',
  example: 'Given sorted array `[1,2,4,6,10,12]` and target `16`, return indices of pair that sums to target. Valid answer: values `4` and `12`.',
  complexity: {
    time: 'O(N)',
    space: 'O(1)'
  },
  diagram: `
<svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="pointerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.05" />
    </linearGradient>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#60a5fa" />
    </marker>
  </defs>

  <rect x="0" y="0" width="800" height="300" fill="#0f172a" rx="16" stroke="#1e293b"/>

  <!-- Sorted Array -->
  <g transform="translate(100, 100)">
    ${[1, 2, 4, 6, 10, 12].map((val, i) => `
      <rect x="${i * 60}" y="0" width="50" height="50" fill="#1e293b" rx="8" stroke="#334155" stroke-width="2"/>
      <text x="${i * 60 + 25}" y="30" fill="#f8fafc" font-size="18" font-weight="bold" text-anchor="middle">${val}</text>
    `).join('')}
  </g>

  <!-- Pointers -->
  <path d="M 125 180 L 125 155" stroke="#ef4444" stroke-width="3" fill="none" marker-end="url(#arrow)"/>
  <text x="125" y="200" fill="#ef4444" font-size="12" font-weight="bold" text-anchor="middle">Left (idx 0)</text>

  <path d="M 425 180 L 425 155" stroke="#10b981" stroke-width="3" fill="none" marker-end="url(#arrow)"/>
  <text x="425" y="200" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Right (idx 5)</text>

  <!-- Decision Logic -->
  <rect x="520" y="50" width="220" height="120" fill="#1e293b" rx="8" stroke="#334155"/>
  <text x="630" y="75" fill="#94a3b8" font-size="12" text-anchor="middle">Sum (1 + 12) = 13</text>
  <text x="630" y="105" fill="#f8fafc" font-size="14" font-weight="bold" text-anchor="middle">13 &lt; 16 (Target)</text>
  <text x="630" y="140" fill="#60a5fa" font-size="12" font-weight="bold" text-anchor="middle">ACTION: left += 1</text>
</svg>
  `,
  keyPoints: [
    {
      title: 'Monotonic Elimination',
      description: 'The strategy relies on the input being sorted (or having a predictable property). By moving one pointer, we eliminate an entire set of impossible pairs in $O(1)$ time.'
    },
    {
      title: 'Slow and Fast Pointers',
      description: 'Used for cycle detection in linked lists or finding the middle element. The fast pointer moves at twice the speed of the slow pointer ($O(N)$ time, $O(1)$ space).'
    },
    {
      title: 'Same Direction (Deduplication)',
      description: 'One pointer tracks the "last valid position" while the other scans forward to find unique elements. Essential for in-place array modifications.'
    }
  ],
  comparisonTable: {
    headers: ['Strategy', 'Movement', 'typical Problems'],
    rows: [
      ['Opposite Direction', '`left++, right--`', 'Two Sum (Sorted), Reverse String, Valid Palindrome.'],
      ['Slow & Fast', '`slow++, fast+=2`', 'LinkedList Cycle, Find Middle, Happy Number.'],
      ['Same Direction', '`slow, fast++`', 'Remove Duplicates, Move Zeroes, Partitioning.'],
    ]
  },
  videoUrl: 'https://www.youtube.com/watch?v=On03HWe2t6E',
  approaches: [
    {
      title: 'Opposite Direction Template',
      content: '```python\ndef oppositePointers(arr, target):\n    left, right = 0, len(arr) - 1\n    while left < right:\n        curr = arr[left] + arr[right]\n        if curr == target: return [left, right]\n        if curr < target: left += 1\n        else: right -= 1\n```',
      complexity: { time: 'O(N)', space: 'O(1)' }
    },
    {
      title: 'Fast & Slow Template',
      content: '```python\ndef fastSlow(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow == fast: return True # Cycle detected\n    return False\n```',
      complexity: { time: 'O(N)', space: 'O(1)' }
    }
  ],
  pitfalls: [
    'Applying to unsorted data: Opposite pointers only work on sorted/monotonic inputs.',
    'Infinite Loops: Forgetting to increment/decrement pointers inside the `while` block.',
    'Edge Cases: Empty arrays or arrays with only one element.',
    'Duplicate Handling: Not skipping identical elements when finding all unique pairs.'
  ],
  concepts: [
    {
      name: 'Deterministic Rules',
      details: 'The movement of each pointer must be strictly decided by the comparison of the current state vs target state.'
    }
  ]
};
