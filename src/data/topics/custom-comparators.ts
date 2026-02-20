import type { TopicContent } from '../topicContent';

export const customComparators: TopicContent = {
  title: 'Custom Comparators',
  description:
    'Custom comparators define domain-specific ordering beyond numeric ascending sort, such as interval sort, string concatenation order, and multi-key ranking.',
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
        'For order-sensitive objectives, brute force tries every arrangement and picks best.\n\nStep-by-step mechanics:\n1. Generate all permutations.\n2. Evaluate objective on each order.\n3. Keep best order.\n\n```python\nfunction bestOrderBrute(nums):\n    best = None\n    for perm in permutations(nums):\n        candidate = score(perm)\n        if best is None or candidate > best:\n            best = candidate\n    return best\n```\n\nThis is only feasible for very small `N` because permutations are factorial.',
      complexity: {
        time: 'O(N! * N)',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (Comparator-driven Sort)',
      content:
        'Encode the objective as pairwise ordering rule and hand it to sorting algorithm.\n\nStep-by-step mechanics:\n1. Define comparator `cmp(a, b)` returning order preference.\n2. Ensure comparator is consistent (transitive).\n3. Sort list using comparator.\n4. Build final answer from sorted sequence.\n\n```python\nfrom functools import cmp_to_key\n\nfunction largestNumber(nums):\n    arr = [str(x) for x in nums]\n\n    def cmp(a, b):\n        if a + b > b + a:\n            return -1\n        if a + b < b + a:\n            return 1\n        return 0\n\n    arr.sort(key=cmp_to_key(cmp))\n    result = \"\".join(arr)\n    return \"0\" if result[0] == \"0\" else result\n```\n\nWhy this works:\nComparator defines local pair priority that globally optimizes objective when the relation is consistent.',
      complexity: {
        time: 'O(N log N * C)',
        space: 'O(N)'
      }
    }
  ],
  pitfalls: [
    'Non-transitive comparator rules can cause undefined sort behavior.',
    'Comparator return semantics differ across languages and can invert ordering accidentally.',
    'Ignoring tie cases can produce unstable or incorrect final outputs.'
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
    }
  ]
};
