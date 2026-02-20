import type { TopicContent } from '../topicContent';

export const lcsLisPatterns: TopicContent = {
  title: 'LCS / LIS Patterns',
  description:
    'LCS and LIS are canonical sequence-DP families. LCS is two-sequence alignment with match or skip transitions, while LIS is one-sequence order optimization where compressed state can reduce `O(N^2)` DP to `O(N log N)`.',
  example:
    'For strings `abcde` and `ace`, LCS length is `3`. For array `[10,9,2,5,3,7,101,18]`, LIS length is `4`.',
  complexity: {
    time: 'O(N*M) for LCS, O(N log N) optimal LIS',
    space: 'O(N*M) or optimized variants'
  },
  approaches: [
    {
      title: 'Brute Force (Exponential Recursion)',
      content:
        'Direct recursion for LCS explores all skip or match branches.\n\nStep-by-step mechanics:\n1. State `(i, j)` is LCS of suffixes `s1[i:]` and `s2[j:]`.\n2. If either suffix is empty, result is `0`.\n3. If `s1[i] == s2[j]`, consume both and add `1`.\n4. Otherwise try skipping one side and take maximum.\n\n```python\nfunction lcsBrute(s1, s2, i, j):\n    if i == len(s1) or j == len(s2):\n        return 0\n\n    if s1[i] == s2[j]:\n        return 1 + lcsBrute(s1, s2, i + 1, j + 1)\n\n    return max(\n        lcsBrute(s1, s2, i + 1, j),\n        lcsBrute(s1, s2, i, j + 1)\n    )\n```\n\nCorrect recurrence, but heavy overlap makes it exponential.',
      complexity: {
        time: 'O(2^(N+M))',
        space: 'O(N+M)'
      }
    },
    {
      title: 'Optimal Approach (LCS Table + LIS Tails)',
      content:
        'Use full DP table for LCS and tails-based binary-search optimization for LIS length.\n\nStep-by-step mechanics for LCS:\n1. `dp[i][j]` is LCS length for prefixes `s1[:i]`, `s2[:j]`.\n2. Matching chars extend diagonal.\n3. Non-matching chars choose best of top or left.\n\n```python\nfunction lcsDP(s1, s2):\n    n = len(s1)\n    m = len(s2)\n    dp = [[0] * (m + 1) for _ in range(n + 1)]\n\n    for i in range(1, n + 1):\n        for j in range(1, m + 1):\n            if s1[i - 1] == s2[j - 1]:\n                dp[i][j] = 1 + dp[i - 1][j - 1]\n            else:\n                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])\n\n    return dp[n][m]\n```\n\nStep-by-step mechanics for LIS length:\n1. Maintain `tails`, where `tails[k]` is smallest tail for subsequence length `k + 1`.\n2. For each value `x`, find first index `i` with `tails[i] >= x`.\n3. Replace `tails[i]` with `x` or append if `i` is past end.\n\n```python\nfunction lisLength(nums):\n    tails = []\n\n    for x in nums:\n        i = lower_bound(tails, x)\n        if i == len(tails):\n            tails.append(x)\n        else:\n            tails[i] = x\n\n    return len(tails)\n```\n\nWhy this works:\nLCS DP solves each prefix pair once; LIS tails keeps only best boundary values needed for future extension.',
      complexity: {
        time: 'O(N*M) LCS, O(N log N) LIS',
        space: 'O(N*M) LCS, O(N) LIS'
      }
    },
    {
      title: 'Advanced Variant (Reconstruct Sequence, Not Just Length)',
      content:
        'Many tasks require actual subsequence, not only its length.\n\nStep-by-step mechanics for LCS reconstruction:\n1. Build standard LCS DP table.\n2. Start from `(n, m)` and walk backward:\n   - if chars match, include char and move diagonal\n   - else move toward larger neighbor (`up` or `left`)\n3. Reverse collected characters.\n\n```python\nfunction buildLCS(s1, s2, dp):\n    i = len(s1)\n    j = len(s2)\n    out = []\n\n    while i > 0 and j > 0:\n        if s1[i - 1] == s2[j - 1]:\n            out.append(s1[i - 1])\n            i -= 1\n            j -= 1\n        elif dp[i - 1][j] >= dp[i][j - 1]:\n            i -= 1\n        else:\n            j -= 1\n\n    out.reverse()\n    return \"\".join(out)\n```\n\nStep-by-step mechanics for LIS reconstruction (`O(N log N)` length + parent arrays):\n1. Track `tailIndex[len]` and `parent[i]`.\n2. On placing `nums[i]` at LIS position `pos`, set `parent[i] = tailIndex[pos - 1]`.\n3. Recover sequence by backtracking from index of last LIS element.\n\nWhy this matters:\nLength-only DP is often insufficient in interviews and contests where explicit sequence output is required.',
      complexity: {
        time: 'O(N*M) LCS rebuild, O(N log N) LIS rebuild',
        space: 'O(N*M) for LCS, O(N) for LIS auxiliary arrays'
      }
    }
  ],
  diagram: `
<svg viewBox="0 0 800 420" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="matchGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#10b981" stop-opacity="0.1" />
    </linearGradient>
  </defs>

  <rect x="0" y="0" width="800" height="420" fill="#0f172a" rx="16" stroke="#1e293b"/>

  <!-- DP Table for LCS -->
  <text x="50" y="40" fill="#64748b" font-size="14" font-weight="bold">LCS DP Table (abc vs ace)</text>
  
  <g transform="translate(100, 70)">
    <!-- Header Row -->
    <text x="75" y="30" fill="#94a3b8" font-size="12" text-anchor="middle">""</text>
    <text x="135" y="30" fill="#94a3b8" font-size="12" text-anchor="middle">a</text>
    <text x="195" y="30" fill="#94a3b8" font-size="12" text-anchor="middle">c</text>
    <text x="255" y="30" fill="#94a3b8" font-size="12" text-anchor="middle">e</text>

    <!-- Rows -->
    ${['""', 'a', 'b', 'c'].map((char, i) => `
      <text x="20" y="${90 + i * 60}" fill="#94a3b8" font-size="12" text-anchor="middle">${char}</text>
      ${[0, 1, 2, 3].map((j) => `
        <rect x="${50 + j * 60}" y="${60 + i * 60}" width="50" height="50" fill="#1e293b" rx="4" stroke="#334155"/>
        <text x="${75 + j * 60}" y="${90 + i * 60}" fill="#f8fafc" font-size="14" font-weight="bold" text-anchor="middle">---</text>
      `).join('')}
    `).join('')}

    <!-- Example Cells -->
    <rect x="110" y="120" width="50" height="50" fill="url(#matchGrad)" rx="4" stroke="#10b981" stroke-width="2"/>
    <text x="135" y="150" fill="#10b981" font-size="14" font-weight="bold" text-anchor="middle">1</text>
    <text x="135" y="105" fill="#10b981" font-size="10" text-anchor="middle">MATCH!</text>
  </g>

  <!-- LIS Intuition -->
  <rect x="450" y="70" width="300" height="280" fill="#1e293b" rx="8" stroke="#334155"/>
  <text x="600" y="100" fill="#94a3b8" font-size="14" font-weight="bold" text-anchor="middle">LIS $O(N \log N)$ Intuition</text>
  <text x="470" y="140" fill="#cbd5e1" font-size="12">Maintain a sorted \`tails\` array.</text>
  <text x="470" y="170" fill="#cbd5e1" font-size="12">1. If current item &gt; all tails, extend (Append).</text>
  <text x="470" y="200" fill="#cbd5e1" font-size="12">2. Else, find the smallest tail $\geq$ item and replace.</text>
  <text x="470" y="230" fill="#cbd5e1" font-size="12">Replacement doesn\'t change length but</text>
  <text x="470" y="250" fill="#cbd5e1" font-size="12">increases chance of future extension.</text>
</svg>
  `,
  keyPoints: [
    {
      title: 'State Transition Logic',
      description: 'LCS matches consume diagonal ($i-1, j-1$). Non-matches choose maximum of inherited state from $i-1$ (skip char from $s1$) or $j-1$ (skip char from $s2$).'
    },
    {
      title: 'Optimal LIS Strategy',
      description: 'While $O(N^2)$ DP is intuitive, the $O(N \\log N)$ "Patience Sorting" approach uses binary search to maintain the smallest possible ending element for each subsequence length.'
    },
    {
      title: 'Reconstruction Path',
      description: 'To find the actual sequence, backtrack from $dp[N][M]$ following matches or the direction of maximum inherited value.'
    }
  ],
  comparisonTable: {
    headers: ['Problem', 'State', 'Transition', 'Complexity'],
    rows: [
      ['LCS', '$dp[i][j]$', 'Match: $1+dp[i-1][j-1]$, Else: $max(up, left)$', '$O(N \\times M)$'],
      ['LIS', '$dp[i]$', '$max(dp[j]) + 1$ for all $j < i$ and $arr[j] < arr[i]$', '$O(N^2)$ or $O(N \\log N)$'],
      ['Edit Distance', '$dp[i][j]$', 'Min of Replace/Delete/Insert transitions', '$O(N \\times M)$'],
    ]
  },
  videoUrl: 'https://www.youtube.com/watch?v=ASoaQq66foQ',
  concepts: [
    {
      name: 'Patience Sorting (LIS)',
      details: 'A card game strategy where you minimize the number of piles (tails), which corresponds directly to the LIS length.'
    }
  ]
};
