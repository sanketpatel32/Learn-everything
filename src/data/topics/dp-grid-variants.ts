import { TopicContent } from '../topicContent';

export const dpGridVariants: TopicContent = {
  title: 'Grid DP Variants',
  description: 'Explores unique paths, minimum path sum, and varying obstacles across a matrix using Dynamic Programming.',
  complexity: {
    time: 'O(M * N)',
    space: 'O(M * N) or O(N)'
  },
  concepts: [
    {
      name: 'Recursion with Memoization',
      details: 'Solve the problem top-down from (0,0) to (M-1,N-1) by caching results for overlapping subproblems.'
    },
    {
      name: 'Tabulation (Bottom-Up)',
      details: 'Build the solution iteratively in a 2D table dp[M][N] starting from the base conditions.'
    },
    {
      name: 'Space Optimization',
      details: 'Instead of storing the entire M x N grid, keep only the prevRow and currRow arrays of size N.'
    }
  ],
  approaches: [
    {
      title: 'Unique Paths (Combinatorics / DP)',
      content: 'dp[i][j] = dp[i-1][j] + dp[i][j-1]. Can also be solved using math (M+N-2)C(M-1).',
      complexity: {
        time: 'O(M * N)',
        space: 'O(N)'
      }
    },
    {
      title: 'Minimum Path Sum',
      content: 'dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]). Initialize the first row and column explicitly.',
      complexity: {
        time: 'O(M * N)',
        space: 'O(N)'
      }
    },
    {
      title: 'Grid with Obstacles',
      content: 'If grid[i][j] is an obstacle (e.g. 1), set dp[i][j] = 0. Otherwise apply typical transitions.',
      complexity: {
        time: 'O(M * N)',
        space: 'O(N)'
      }
    }
  ],
  pitfalls: [
    'Falling out of matrix bounds when checking dp[i-1][j] unconditionally.',
    'Initializing the DP table with incorrect default values (e.g. 0 instead of Infinity for min path sum).',
    'Not correctly determining the base cases for the 0th row and 0th column.'
  ]
};
