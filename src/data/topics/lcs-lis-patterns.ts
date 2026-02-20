import type { TopicContent } from '../topicContent';

export const lcsLisPatterns: TopicContent = {
  title: 'LCS / LIS Patterns',
  description:
    'LCS and LIS are canonical sequence DP patterns. LCS aligns two sequences with match/skip decisions; LIS finds longest increasing subsequence within one sequence.',
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
        'LCS brute force recursively explores all match/skip branches.\n\nStep-by-step mechanics:\n1. If either index reaches end, return `0`.\n2. If chars match, return `1 + solve(i+1, j+1)`.\n3. Else return max of skipping one char from either string.\n\n```python\nfunction lcsBrute(s1, s2, i, j):\n    if i == len(s1) or j == len(s2):\n        return 0\n\n    if s1[i] == s2[j]:\n        return 1 + lcsBrute(s1, s2, i + 1, j + 1)\n\n    return max(\n        lcsBrute(s1, s2, i + 1, j),\n        lcsBrute(s1, s2, i, j + 1)\n    )\n```\n\nOverlapping subproblems make this too slow for practical sizes.',
      complexity: {
        time: 'O(2^(N+M))',
        space: 'O(N+M)'
      }
    },
    {
      title: 'Optimal Approach (DP Table / Patience Sorting for LIS)',
      content:
        'For LCS, use 2D DP table. For LIS length, use tails array with binary search.\n\nStep-by-step mechanics for LCS:\n1. `dp[i][j]` = LCS length for prefixes `s1[:i]` and `s2[:j]`.\n2. If chars match: `dp[i][j] = 1 + dp[i-1][j-1]`.\n3. Else: `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`.\n\nStep-by-step mechanics for LIS (length only):\n1. Maintain `tails` where `tails[k]` is minimum possible tail for increasing subsequence length `k+1`.\n2. For each number, binary-search replacement position in `tails`.\n\n```python\nfunction lisLength(nums):\n    tails = []\n\n    for x in nums:\n        i = lower_bound(tails, x)\n        if i == len(tails):\n            tails.append(x)\n        else:\n            tails[i] = x\n\n    return len(tails)\n```\n\nWhy this works:\nDP captures exhaustive substructure for LCS; `tails` compression preserves enough state to derive LIS length in `O(N log N)`.',
      complexity: {
        time: 'O(N*M) LCS, O(N log N) LIS',
        space: 'O(N*M) LCS, O(N) LIS'
      }
    }
  ],
  pitfalls: [
    'Confusing subsequence with substring changes transitions entirely.',
    'LIS `tails` array does not store the actual LIS sequence unless extra parent tracking is added.',
    'Incorrect DP indexing between 0-based strings and 1-based DP dimensions is common.'
  ],
  concepts: [
    {
      name: 'Sequence Alignment DP',
      details:
        'LCS is a blueprint for two-sequence dynamic programming problems.'
    },
    {
      name: 'State Compression',
      details:
        'LIS length can be solved without full `O(N^2)` DP by keeping compressed order statistics.'
    }
  ]
};
