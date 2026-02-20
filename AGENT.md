# Roadmap App - AI Agent Guidelines

Welcome, Agent. This document outlines the explicit instructions, stylistic choices, and architectural conventions for adding or modifying content within the Roadmap App.

**⚠️ CRITICAL INFO:** This codebase contains two highly distinct roadmaps: **Data Structures & Algorithms (DSA)** and **System Design (SD)**.
While they share the same `TopicContent` schema underlyingly, they use completely different sub-fields and formatting. You must identify which roadmap you are writing for and use the correct rules below.

You must strictly adhere to these rules when interacting with this codebase.

## 1. Topic File Structure

Every topic must have its own dedicated TypeScript file within `src/data/topics/[topic-name].ts`.

Do **not** add giant blobs of content directly into `src/data/topicContent.ts`. Instead:

1. Create the new file in `src/data/topics/`.
2. Export a strongly typed `TopicContent` object.
3. Import and link it inside `src/data/topicContent.ts`.

## 2. The `TopicContent` Schema

Whenever you generate a new DSA topic, ensure you use the following schema. Never invent new object keys.

```typescript
export type TopicContent = {
  title: string;
  description: string;
  example?: string;
  
  // ---> DSA Specific Content <---
  complexity?: {
    time: string;
    space: string;
  };
  approaches?: {
    title: string;
    content: string; // Uses RichText markdown parsing
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

  // ---> System Design Specific Content <---
  diagram?: string; // Raw SVG string. Keep styles native/tailwind.
  keyPoints?: {
    title: string;
    description: string; // Uses RichText parsing
  }[];
  comparisonTable?: {
    headers: string[]; // e.g. ['Dimension', 'Option A', 'Option B']
    rows: string[][]; // e.g. [['Cost', 'High', 'Low']]
  };
};
```

## 3. Formatting Rules for `approaches` (CRITICAL)

The UI utilizes a custom `RichText` component that parses markdown-like syntax for the `content` string inside `approaches`. **You must write approach content using these rules:**

1.  **Paragraphs:** Separate paragraphs with double newlines (`\n\n`).
2.  **Inline Code:** Use single backticks for variables, array names, or indices (e.g., `index 0`, `left = 1`).
3.  **Pseudocode Blocks:** Ensure algorithmic logic is displayed as a pseudocode block using triple backticks. **DO NOT** use paragraph "dry runs". Provide clean, pythonic pseudocode.
    - _Example:_
      ````text
      \n\n```python\nfunction twoSum(arr, target):\n    left = 0\n    right = arr.length - 1\n    return false\n```\n\n
      ````
4.  **Bullet Points / Lists:** Use standard markdown list syntax. Start the line with `- ` or `1. `
5.  **Tone & Detail:**
    - Treat every topic as an advanced "Cheat Sheet".
    - Be highly detailed. Do not skip over _why_ an approach works.
    - Explain the step-by-step mechanics clearly before providing the pseudocode block.
    - Clearly distinguish the Brute Force approach from the Optimal Approach.

## 4. Example Topic Payload

Here is the gold-standard reference for writing an approach inside a DSA topic:

````typescript
import { TopicContent } from "../topicContent";

export const slidingWindow: TopicContent = {
  title: "Sliding Window Pattern",
  description:
    'An advanced algorithmic technique used to find optimal subarrays or substrings. It fundamentally converts nested loops (O(N²)) into a single linear pass (O(N)) by maintaining a moving "window" of elements over the data.',
  example:
    "Given an array of positive integers [2,3,1,2,4,3] and a target sum 7, find the minimal length of a contiguous subarray whose sum is >= target. The answer is 2 (subarray [4,3]).",
  approaches: [
    {
      title: "Brute Force (Nested Loops)",
      content:
        "The brute force approach literally tests every single possible subarray to see if it meets our criteria (e.g., sum >= 7).\n\nStep-by-step mechanics:\n1. The outer loop selects the starting element (index `left` from `0` to `n-1`).\n2. The inner loop selects the ending element (index `right` from `left` to `n-1`).\n3. For each pair of `left` and `right`, we calculate the sum of the elements in between.\n\n```python\nfunction bruteForce(arr, targetSum):\n    minLen = INT_MAX\n    for left from 0 to arr.length - 1:\n        sum = 0\n        for right from left to arr.length - 1:\n            sum += arr[right]\n            if sum >= targetSum:\n                minLen = min(minLen, right - left + 1)\n                break // We found shortest starting at 'left'\n    return minLen\n```\n\nWhy is this bad?\nNotice that if we test `[2, 3, 1, 2]`, we passed over the subset `[3, 1]`. When we move our starting index to 1, we compute the sum for `[3, 1]` all over again. This redundant mathematical recalculation is what forces this algorithm into O(N²) time complexity. In an array of size 100,000, that is 10 billion operations, completely crashing the system.",
      complexity: {
        time: "O(N²)",
        space: "O(1)",
      },
    },
    {
      title: "Optimal Approach (Sliding Window)",
      content:
        'The core philosophy of Sliding Window is preserving work. Instead of recalculating overlaps, we maintain a running state (like a running sum) in a "window" of space, expanding and contracting its borders (the pointers).\n\nStep-by-step mechanics:\n1. Establish two pointers, `left` and `right`, both starting at index 0. Initialize `windowSum = 0`.\n2. Expand the window to the right by moving the `right` pointer one step at a time, eagerly adding the new element `arr[right]` to `windowSum`.\n3. Wait until the window becomes "valid" (e.g., `windowSum >= 7`).\n4. Once valid, record the current window dimension (e.g., `right - left + 1`).\n5. Now, instead of resetting, attempt to SHRINK the window from the left to see if we can maintain validity in a smaller footprint. Subtract `arr[left]` from `windowSum` and slide the `left` pointer forward.\n6. Repeat step 5 until the window is invalid again (`windowSum < 7`), then resume step 2.\n\n```python\nfunction optimalSlidingWindow(arr, targetSum):\n    minLen = INT_MAX\n    sum = 0, left = 0\n    \n    for right from 0 to arr.length - 1:\n        sum += arr[right]\n        \n        while sum >= targetSum:\n            minLen = min(minLen, right - left + 1)\n            sum -= arr[left]\n            left += 1\n            \n    return minLen\n```\n\nWhy does this work so gracefully?\nBecause both the `left` and `right` pointers strictly move FORWARD from index 0 to n. They never go backwards. Even though there is a while-loop inside the for-loop, each index is added to the sum exactly ONE time, and subtracted from the sum exactly ONE time. `2N` operations resolves to O(N) time complexity.',
      complexity: {
        time: "O(N)",
        space: "O(1)",
      },
    },
  ],
  pitfalls: [
    "Off-by-one errors when initializing or moving the left/right pointers.",
    'Forgetting to remove or decrement the "old" value from your state (sum, hashmap) when the left pointer moves forward.',
    "Using Sliding Window on arrays containing negative numbers when looking for a target sum (the window logic breaks because expanding the window might decrease the sum, destroying the monotonicity requirement).",
  ],
  concepts: [
    {
      name: "Monotonicity Requirement",
      details:
        "For dynamic sliding window to work, adding elements must strictly move the condition in one direction, and removing elements must strictly move it in the reverse direction. (e.g., adding positive numbers always increases the sum).",
    },
    {
      name: "State Tracking",
      details:
        "The hardest part of sliding window is identifying what state to track inside the window. It could be a running sum, a count of distinct characters, a hash map of frequencies, or even a monotonic queue.",
    },
  ],
};
````

## 5. UI Components

Do not modify the `TopicDetail.tsx` parsing logic unless instructed. The `TopicDetail` component already elegantly handles matching the `TopicContent` schema, injecting badges for Time Complexity (TC), Space Complexity (SC), SVGs, and Tables. Your job is simply to provide high-quality data according to the schema.

---

# SYSTEM DESIGN (SD) SPECIFIC RULES

System Design topics focus heavily on visual architecture, foundational theory, and trade-offs. 

## 6. Formatting Rules for System Design

1. **`diagram` (SVG):** System Design heavily relies on diagrams. You MUST provide a raw SVG string. 
    - Keep SVGs aesthetic, using dark theme colors mapping to Tailwind (e.g. text `#f8fafc`, backgrounds `#0f172a`, borders `#1e293b`). 
    - Do not use fixed widths that break responsive design, use `viewBox`.
2. **`keyPoints` (Core Concepts):** Replace algorithm "approaches" with architectural insights. Use paragraphs and inline code formats safely.
3. **`comparisonTable`:** Always provide side-by-side matrices (Trade-offs) for major SD decisions.

## 7. Example SD Topic Payload

Here is the gold-standard reference for writing a System Design topic:

````typescript
import { TopicContent } from '../topicContent';

export const scalingTypes: TopicContent = {
  title: 'Vertical vs Horizontal Scaling',
  description: 'When a system hits its limits and performance degrades, you must scale. You have two primary options...',
  diagram: `
<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <!-- Provide beautiful, hand-written SVGs representing the architecture -->
  <rect x="20" y="20" width="360" height="360" fill="#0f172a" rx="16" stroke="#1e293b"/>
  <!-- ... etc ... -->
</svg>
  `,
  keyPoints: [
    {
      title: 'Vertical Scaling (Scale Up)',
      description: 'Involves upgrading the specifications of an existing machine...'
    },
    {
      title: 'Horizontal Scaling (Scale Out)',
      description: 'Involves adding entirely new machines to your resource pool...'
    }
  ],
  comparisonTable: {
    headers: ['Dimension', 'Vertical Scaling (Up)', 'Horizontal Scaling (Out)'],
    rows: [
      ['Ceiling (Limit)', 'Strict hard limit imposed by hardware', 'Practically infinite limits'],
      ['Cost', 'Exponentially expensive for enterprise-grade hardware', 'Linear/Cheap commodity hardware'],
      ['Availability', 'Single Point of Failure (SPOF)', 'High Availability (Fault tolerant)']
    ]
  },
  pitfalls: [
    'Prematurely scaling out adds immense engineering overhead.',
    'Forgetting that Horizontal Scaling breaks in-memory application state caching.'
  ]
};
````
