import type { TopicContent } from '../topicContent';

export const matrixManipulation: TopicContent = {
  title: 'Matrix Manipulation',
  description:
    'Matrix problems are 2D array problems with coordinate transforms. The core skill is mapping a cell `(row, col)` to where it should move after an operation like transpose, rotate, or spiral traversal.',
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
        'The direct method is to allocate a second matrix and write each old position into its new rotated position.\n\nStep-by-step mechanics:\n1. Create `result` with `n` rows and `n` columns.\n2. For each source cell `(r, c)`, compute destination `(c, n - 1 - r)`.\n3. Set `result[c][n - 1 - r] = matrix[r][c]`.\n4. Return `result`.\n\n```python\nfunction rotateWithExtraSpace(matrix):\n    n = len(matrix)\n    result = [[0] * n for _ in range(n)]\n\n    for r in range(0, n):\n        for c in range(0, n):\n            result[c][n - 1 - r] = matrix[r][c]\n\n    return result\n```\n\nThis is easy to reason about, but the extra matrix costs `O(N^2)` memory.',
      complexity: {
        time: 'O(N^2)',
        space: 'O(N^2)'
      }
    },
    {
      title: 'Optimal Approach (Transpose + Reverse)',
      content:
        'For clockwise rotation, you can do two in-place transforms.\n\nStep-by-step mechanics:\n1. Transpose the matrix (`matrix[r][c]` swaps with `matrix[c][r]`).\n2. Reverse each row.\n3. The combination equals a 90 degree clockwise rotation.\n\n```python\nfunction rotateInPlace(matrix):\n    n = len(matrix)\n\n    # transpose\n    for r in range(0, n):\n        for c in range(r + 1, n):\n            matrix[r][c], matrix[c][r] = matrix[c][r], matrix[r][c]\n\n    # reverse every row\n    for r in range(0, n):\n        left = 0\n        right = n - 1\n        while left < right:\n            matrix[r][left], matrix[r][right] = matrix[r][right], matrix[r][left]\n            left += 1\n            right -= 1\n\n    return matrix\n```\n\nWhy this works:\n- Transpose reflects around the main diagonal.\n- Row reverse then moves columns into rotated positions.\n- Every cell moves exactly once per phase, so total work stays `O(N^2)` with no extra matrix.',
      complexity: {
        time: 'O(N^2)',
        space: 'O(1)'
      }
    }
  ],
  pitfalls: [
    'Confusing `row` and `col` when applying coordinate formulas.',
    'Transposing with both loops from `0..n-1` causes swaps to be undone. Start inner loop at `r + 1`.',
    'Applying this in-place trick to non-square matrices does not work directly.'
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
    }
  ]
};
