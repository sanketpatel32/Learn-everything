import { TopicContent } from '../topicContent';

export const arraysStrings: TopicContent = {
  title: 'Arrays & Strings',
  description:
    'Arrays and strings are contiguous sequences, so performance comes from precise index arithmetic, cache-friendly traversal, and careful in-place transformation. Most interview patterns are built from these fundamentals.',
  example: 'Rotate an array to the right by `k` steps. Example: `[1,2,3,4,5,6,7]`, `k = 3` becomes `[5,6,7,1,2,3,4]`.',
  complexity: {
    time: 'O(N)',
    space: 'O(1) optimal'
  },
  approaches: [
    {
      title: 'Brute Force (Shift One Step, k Times)',
      content:
        'Repeat a single right shift operation exactly `k` times.\n\nStep-by-step mechanics:\n1. Normalize rotation count with `k % n`.\n2. For each round:\n   - store last element in `temp`\n   - shift all elements right by one position\n   - place `temp` at index `0`\n\n```python\nfunction rotateBruteForce(nums, k):\n    n = len(nums)\n    k = k % n\n\n    for _ in range(0, k):\n        temp = nums[n - 1]\n        for i in range(n - 1, 0, -1):\n            nums[i] = nums[i - 1]\n        nums[0] = temp\n\n    return nums\n```\n\nWhy it is expensive:\nEach shift costs `O(N)`, so total cost becomes `O(N * k)`.',
      complexity: {
        time: 'O(N * K)',
        space: 'O(1)'
      }
    },
    {
      title: 'Better Approach (Auxiliary Array Remapping)',
      content:
        'Use direct index mapping into a temporary array.\n\nStep-by-step mechanics:\n1. Normalize `k = k % n`.\n2. Create `temp` of size `n`.\n3. Move each element `nums[i]` to `temp[(i + k) % n]`.\n4. Copy `temp` back into `nums`.\n\n```python\nfunction rotateWithExtraArray(nums, k):\n    n = len(nums)\n    k = k % n\n    temp = [0] * n\n\n    for i in range(0, n):\n        newIndex = (i + k) % n\n        temp[newIndex] = nums[i]\n\n    for i in range(0, n):\n        nums[i] = temp[i]\n\n    return nums\n```\n\nWhy this is useful:\nIt is often the easiest linear-time implementation and helps verify in-place variants during debugging.',
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (Three Reversals In-place)',
      content:
        'Decompose right rotation into reversible segments without extra memory.\n\nStep-by-step mechanics:\n1. Normalize `k = k % n`.\n2. Reverse whole array.\n3. Reverse first `k` elements.\n4. Reverse remaining `n - k` elements.\n\n```python\nfunction reverse(nums, left, right):\n    while left < right:\n        nums[left], nums[right] = nums[right], nums[left]\n        left += 1\n        right -= 1\n\nfunction rotateOptimal(nums, k):\n    n = len(nums)\n    k = k % n\n\n    reverse(nums, 0, n - 1)\n    reverse(nums, 0, k - 1)\n    reverse(nums, k, n - 1)\n\n    return nums\n```\n\nWhy this works:\nAfter reversing all elements, original suffix and prefix swap sides but each side is reversed. Segment reversals repair local order, producing exact rotation.',
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      }
    }
  ],
  concepts: [
    {
      name: 'Index Mapping',
      details:
        'Transformations are often easiest when expressed as old-index to new-index formulas, usually with modulo arithmetic.'
    },
    {
      name: 'In-place vs Out-of-place Trade-off',
      details:
        'Extra memory often simplifies logic, while in-place solutions reduce space but demand tighter boundary control.'
    },
    {
      name: 'Contiguous Memory Behavior',
      details:
        'Arrays provide constant-time random access and good cache locality, which is why linear scans are so efficient.'
    }
  ],
  pitfalls: [
    'Not handling `n == 0` before computing `k % n` causes division-by-zero errors.',
    'Forgetting `k = k % n` causes unnecessary work and edge-case failures.',
    'Off-by-one boundaries in reversal ranges are a common source of bugs.',
    'For strings in immutable languages, in-place style operations require conversion to char arrays first.'
  ]
};
