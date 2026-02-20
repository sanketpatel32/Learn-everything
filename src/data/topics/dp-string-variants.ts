import { TopicContent } from '../topicContent';

export const dpStringVariants: TopicContent = {
  title: 'String DP Variants',
  description: 'Explores dynamic programming applied to strings, including Edit Distance, regex matching, and palindromic subsequences.',
  complexity: {
    time: 'O(M * N) or O(N^2)',
    space: 'O(M * N)'
  },
  concepts: [
    {
      name: 'Edit Distance (Levenshtein)',
      details: 'Calculating the minimum number of insertions, deletions, and substitutions required to transform strictly string A into string B.'
    },
    {
      name: 'Longest Palindromic Subsequence',
      details: 'Instead of finding matching subproblems of two strings, DP computes matches of a string against its own reverse.'
    },
    {
      name: 'Regex Matching (Wildcards)',
      details: 'Evaluating matches dynamically taking * (zero or more) and ? / . (single match) into consideration across two string states.'
    }
  ],
  approaches: [
    {
      title: '2D DP Grid for Inter-string Matching',
      content: 'Define dp[i][j] as the score matching string A up to `i` and string B up to `j`. Base cases revolve around empty strings.',
      complexity: {
        time: 'O(M * N)',
        space: 'O(M * N)'
      }
    },
    {
      title: 'Palindromic Subsequence/Substring (Bottom-up 1D/2D)',
      content: 'For a string length N, iterate sub-length from 1 to N. Check boundary characters, and build larger palindromes using precalculated sub-lengths (dp[i+1][j-1]).',
      complexity: {
        time: 'O(N^2)',
        space: 'O(N^2)'
      }
    }
  ],
  pitfalls: [
    'Off-by-one errors mapping DP array dimensions (size N+1) against string indices (size N).',
    'Failing to initialize empty string states correctly for Edit/Regex DP grids.',
    'Confusing Longest Palindromic SUBSTRING (must be continuous) vs SUBSEQUENCE (can be separated).'
  ]
};
