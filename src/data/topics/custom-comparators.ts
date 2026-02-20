import type { TopicContent } from '../topicContent';

export const customComparators: TopicContent = {
  title: 'Custom Comparators',
  description:
    'Custom comparators define domain-specific ordering beyond default numeric/lexicographic sort. They are essential for interval ordering, multi-key ranking, and objective-driven ordering problems.',
  example:
    'Arrange numbers to form the largest number: `[3,30,34,5,9]` becomes `"9534330"` using comparator on concatenated strings.',
  complexity: {
    time: 'O(N log N * C)',
    space: 'O(N) depending on language sort'
  },
  approaches: [
    {
      title: 'Brute Force (Generate All Permutations)',
      content:
        'For order-sensitive objective functions, brute force tries every possible ordering and picks best.\n\nStep-by-step mechanics:\n1. Generate all permutations.\n2. Evaluate objective score for each arrangement.\n3. Keep best-scoring arrangement.\n\n```python\nfunction bestOrderBrute(nums):\n    bestOrder = None\n    bestScore = -INF\n\n    for perm in permutations(nums):\n        s = score(perm)\n        if s > bestScore:\n            bestScore = s\n            bestOrder = perm\n\n    return bestOrder\n```\n\nThis is useful as a correctness oracle for tiny tests, but factorial growth makes it unusable for normal constraints.',
      complexity: {
        time: 'O(N! * N)',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (Comparator-driven Sort)',
      content:
        'Encode desired global ordering as a pairwise comparator and delegate ordering to sorting algorithm.\n\nStep-by-step mechanics:\n1. Define `cmp(a, b)`:\n   - negative if `a` should come before `b`\n   - positive if `b` should come before `a`\n   - zero if equivalent in order\n2. Ensure comparator is consistent (especially transitive behavior).\n3. Sort using language-specific comparator hooks.\n4. Post-process sorted list into final output.\n\nLargest-number example:\n```python\nfrom functools import cmp_to_key\n\nfunction largestNumber(nums):\n    arr = [str(x) for x in nums]\n\n    def cmp(a, b):\n        if a + b > b + a:\n            return -1\n        if a + b < b + a:\n            return 1\n        return 0\n\n    arr.sort(key=cmp_to_key(cmp))\n    result = \"\".join(arr)\n    return \"0\" if result[0] == \"0\" else result\n```\n\nMulti-key comparator example (intervals):\n```python\nfunction cmpInterval(a, b):\n    # primary key: start ascending\n    if a.start != b.start:\n        return a.start - b.start\n\n    # secondary key: end ascending\n    return a.end - b.end\n```\n\nWhy this works:\nIf comparator defines a valid total/strict weak ordering, sorting composes local pair decisions into correct global order.',
      complexity: {
        time: 'O(N log N * C)',
        space: 'O(N)'
      }
    }
  ],
  pitfalls: [
    'Non-transitive comparator rules can cause undefined sort behavior.',
    'Comparator return semantics differ across languages and can invert ordering accidentally.',
    'Ignoring tie cases can produce unstable or incorrect final outputs.',
    'Mutating compared objects during sort can produce nondeterministic output.'
  ],
  concepts: [
    {
      name: 'Ordering as a Problem Model',
      details:
        'Many optimization tasks can be reframed as finding the right sort order.'
    },
    {
      name: 'Comparator Correctness',
      details:
        'A comparator should be antisymmetric and transitive to guarantee predictable sorting.'
    },
    {
      name: 'Pairwise-to-global Ordering',
      details:
        'Sorting converts pairwise precedence logic into a globally consistent sequence when comparator contracts hold.'
    }
  ]
};
