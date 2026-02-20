import type { TopicContent } from '../topicContent';

export const matrixManipulation: TopicContent = {
  title: 'Matrix Manipulation',
  description:
    'Matrix manipulation is 2D index transformation. Most problems become manageable when you reason with coordinate mapping rules, boundary layers, and in-place swap safety.',
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
        'The most direct method uses a second matrix and explicit coordinate transformation.\n\nStep-by-step mechanics:\n1. Allocate `result[n][n]`.\n2. For each source coordinate `(r, c)`, compute destination `(c, n - 1 - r)` for clockwise rotation.\n3. Write into destination.\n4. Return new matrix.\n\n```python\nfunction rotateWithExtraSpace(matrix):\n    n = len(matrix)\n    result = [[0] * n for _ in range(n)]\n\n    for r in range(0, n):\n        for c in range(0, n):\n            nr = c\n            nc = n - 1 - r\n            result[nr][nc] = matrix[r][c]\n\n    return result\n```\n\nWhy interviewers accept this:\n- Very low bug risk.\n- Coordinates are explicit and easy to verify with pen-and-paper.\n\nTradeoff:\nConsumes `O(N^2)` extra space, which fails strict in-place constraints.',
      complexity: {
        time: 'O(N^2)',
        space: 'O(N^2)'
      }
    },
    {
      title: 'Optimal Approach (Transpose + Reverse)',
      content:
        'For in-place clockwise rotation, use two reversible operations: transpose and row-reverse.\n\nStep-by-step mechanics:\n1. Transpose matrix around main diagonal:\n   - swap `(r, c)` with `(c, r)` for `c > r`.\n2. Reverse each row in-place.\n3. Final matrix is 90-degree clockwise rotation.\n\n```python\nfunction rotateInPlace(matrix):\n    n = len(matrix)\n\n    # phase 1: transpose\n    for r in range(0, n):\n        for c in range(r + 1, n):\n            matrix[r][c], matrix[c][r] = matrix[c][r], matrix[r][c]\n\n    # phase 2: reverse rows\n    for r in range(0, n):\n        left = 0\n        right = n - 1\n        while left < right:\n            matrix[r][left], matrix[r][right] = matrix[r][right], matrix[r][left]\n            left += 1\n            right -= 1\n\n    return matrix\n```\n\nAlternative viewpoint (layer/cycle rotation):\n- Rotate each ring by 4-way swaps.\n- Useful when operation is not cleanly decomposable into transpose/reverse.\n\nWhy this works:\n- Transpose converts rows into columns.\n- Row reversal fixes directional order for clockwise orientation.\n- Both phases are in-place and together touch each cell constant times.',
      complexity: {
        time: 'O(N^2)',
        space: 'O(1)'
      }
    }
  ],
  pitfalls: [
    'Confusing `row` and `col` when applying coordinate formulas.',
    'Transposing with both loops from `0..n-1` causes swaps to be undone. Start inner loop at `r + 1`.',
    'Applying this in-place trick to non-square matrices does not work directly.',
    'For anti-clockwise rotation, operation order changes (transpose + column-reverse or row-reverse + transpose).'
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
    }
  ]
};
