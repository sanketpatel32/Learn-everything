import type { TopicContent } from '../topicContent';

export const matrixManipulation: TopicContent = {
  title: 'Matrix Manipulation',
  description:
    'Matrix manipulation is 2D index transformation plus boundary control. Most matrix tasks become tractable by expressing coordinate mapping rules and preserving in-place swap safety.',
  example:
    'Rotate an `n x n` matrix 90 degrees clockwise in-place. Example: `[[1,2,3],[4,5,6],[7,8,9]]` becomes `[[7,4,1],[8,5,2],[9,6,3]]`.',
  complexity: {
    time: 'O(N^2)',
    space: 'O(1) to O(N^2) depending on approach'
  },
  approaches: [
    {
      title: 'Brute Force (Build a New Matrix)',
      content:
        'Use an auxiliary matrix and explicit coordinate remapping.\n\nStep-by-step mechanics:\n1. Allocate `result[n][n]`.\n2. For each source `(r, c)`, compute destination `(c, n - 1 - r)`.\n3. Assign source value to destination.\n4. Return `result`.\n\n```python\nfunction rotateWithExtraSpace(matrix):\n    n = len(matrix)\n    result = [[0] * n for _ in range(n)]\n\n    for r in range(0, n):\n        for c in range(0, n):\n            nr = c\n            nc = n - 1 - r\n            result[nr][nc] = matrix[r][c]\n\n    return result\n```\n\nThis is low-risk and easy to verify, but uses `O(N^2)` extra space.',
      complexity: {
        time: 'O(N^2)',
        space: 'O(N^2)'
      }
    },
    {
      title: 'Optimal Approach (Transpose + Reverse)',
      content:
        'For clockwise rotation in-place, decompose into transpose then row reversal.\n\nStep-by-step mechanics:\n1. Transpose along main diagonal by swapping `(r, c)` with `(c, r)` for `c > r`.\n2. Reverse each row in-place.\n3. Matrix becomes 90-degree clockwise rotated.\n\n```python\nfunction rotateInPlace(matrix):\n    n = len(matrix)\n\n    for r in range(0, n):\n        for c in range(r + 1, n):\n            matrix[r][c], matrix[c][r] = matrix[c][r], matrix[r][c]\n\n    for r in range(0, n):\n        left = 0\n        right = n - 1\n        while left < right:\n            matrix[r][left], matrix[r][right] = matrix[r][right], matrix[r][left]\n            left += 1\n            right -= 1\n\n    return matrix\n```\n\nLayer-cycle alternative:\n- Rotate each ring by 4-way swaps when transforms are not decomposable.\n\nWhy this works:\nTranspose swaps axis orientation; row reversal restores clockwise ordering.',
      complexity: {
        time: 'O(N^2)',
        space: 'O(1)'
      }
    },
    {
      title: 'Advanced Pattern (Set Matrix Zeroes In-place)',
      content:
        'Another classic matrix manipulation task is zero-propagation: if a cell is zero, zero its entire row and column. The optimal method uses first row and first column as marker storage.\n\nStep-by-step mechanics:\n1. Track whether first row or first column initially contains zero.\n2. For interior cells `(r, c)`, if zero then mark row and column heads:\n   - `matrix[r][0] = 0`\n   - `matrix[0][c] = 0`\n3. Zero interior cells based on markers.\n4. Zero first row and first column using stored flags.\n\n```python\nfunction setZeroes(matrix):\n    rows = len(matrix)\n    cols = len(matrix[0])\n\n    firstRowZero = any(matrix[0][c] == 0 for c in range(0, cols))\n    firstColZero = any(matrix[r][0] == 0 for r in range(0, rows))\n\n    for r in range(1, rows):\n        for c in range(1, cols):\n            if matrix[r][c] == 0:\n                matrix[r][0] = 0\n                matrix[0][c] = 0\n\n    for r in range(1, rows):\n        for c in range(1, cols):\n            if matrix[r][0] == 0 or matrix[0][c] == 0:\n                matrix[r][c] = 0\n\n    if firstRowZero:\n        for c in range(0, cols):\n            matrix[0][c] = 0\n\n    if firstColZero:\n        for r in range(0, rows):\n            matrix[r][0] = 0\n```\n\nWhy this matters:\nIt demonstrates the key in-place matrix technique of reusing matrix boundaries as metadata storage.',
      complexity: {
        time: 'O(R * C)',
        space: 'O(1)'
      }
    }
  ],
  pitfalls: [
    'Confusing `row` and `col` when applying coordinate formulas.',
    'Transposing with both loops from `0..n-1` causes swaps to be undone. Start inner loop at `r + 1`.',
    'Applying this in-place trick to non-square matrices does not work directly.',
    'For anti-clockwise rotation, operation order changes (transpose + column-reverse or row-reverse + transpose).',
    'In set-zeroes pattern, updating first row or first column too early destroys marker information.'
  ],
  concepts: [
    {
      name: 'Coordinate Transform',
      details:
        'Many matrix tasks reduce to one formula, like `(r, c) -> (c, n - 1 - r)` for clockwise rotation.'
    },
    {
      name: 'In-place 2D Transform',
      details:
        'When a transform can be decomposed into reversible operations (transpose + reverse), you can avoid extra memory.'
    },
    {
      name: 'Layered Boundaries',
      details:
        'Many matrix algorithms operate ring by ring; careful boundary updates prevent duplicate visits and off-by-one errors.'
    },
    {
      name: 'In-place Marker Reuse',
      details:
        'Rows, columns, or boundary cells can temporarily store metadata to avoid extra memory.'
    }
  ]
};
