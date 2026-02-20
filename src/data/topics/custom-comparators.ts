import type { TopicContent } from '../topicContent';

export const customComparators: TopicContent = {
  title: 'Custom Comparators',
  description:
    'Custom comparators encode domain-specific ordering rules that default numeric or lexicographic sorting cannot express. They are critical for interval ordering, multi-key ranking, scheduling priorities, and objective-driven ordering tasks like "form the largest number."',
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
        'For ordering problems with a global objective, brute force evaluates every permutation and selects the best one.\n\nStep-by-step mechanics:\n1. Generate all `N!` permutations.\n2. Compute objective score for each ordering.\n3. Keep best-scoring sequence.\n\n```python\nfunction bestOrderBrute(items):\n    best = None\n    bestScore = -INF\n\n    for perm in permutations(items):\n        score = evaluate(perm)\n        if score > bestScore:\n            bestScore = score\n            best = perm\n\n    return best\n```\n\nThis is practical only for very small `N`, but very useful for building test oracles to validate comparator-based solutions.',
      complexity: {
        time: 'O(N! * N)',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (Comparator-driven Sort)',
      content:
        'Express the desired ordering through pairwise comparison rules and let `O(N log N)` sorting build the global order.\n\nComparator contract:\n- return negative if `a` should appear before `b`\n- return positive if `b` should appear before `a`\n- return `0` if equivalent for ordering\n\nStep-by-step mechanics:\n1. Translate objective into pairwise rule.\n2. Add deterministic tie-breakers when needed.\n3. Ensure transitivity to avoid undefined sort behavior.\n4. Sort via language comparator hooks.\n5. Build final answer from sorted sequence.\n\nLargest-number example:\n```python\nfrom functools import cmp_to_key\n\nfunction largestNumber(nums):\n    arr = [str(x) for x in nums]\n\n    def cmp(a, b):\n        if a + b > b + a:\n            return -1\n        if a + b < b + a:\n            return 1\n        return 0\n\n    arr.sort(key=cmp_to_key(cmp))\n    result = \"\".join(arr)\n    return \"0\" if result[0] == \"0\" else result\n```\n\nMulti-key interval comparator:\n```python\nfunction cmpInterval(a, b):\n    if a.start != b.start:\n        return -1 if a.start < b.start else 1\n\n    if a.end != b.end:\n        return -1 if a.end < b.end else 1\n\n    return 0\n```\n\nWhy this works:\nA valid comparator defines a strict weak ordering, so sorting can consistently transform local precedence decisions into a correct global arrangement.',
      complexity: {
        time: 'O(N log N * C)',
        space: 'O(N)'
      }
    }
  ],
  pitfalls: [
    'Non-transitive rules (`a < b`, `b < c`, but `c < a`) can make sort results unstable or undefined.',
    'Using subtraction like `return a - b` can overflow for large integer ranges.',
    'Comparator return conventions differ across languages and are easy to invert accidentally.',
    'Missing tie-breakers can produce nondeterministic order among equivalent items.',
    'Mutating compared objects during sorting can violate comparator assumptions and break correctness.'
  ],
  concepts: [
    {
      name: 'Ordering as Modeling',
      details:
        'Many optimization tasks become straightforward once converted into the right ordering definition.'
    },
    {
      name: 'Strict Weak Ordering',
      details:
        'Comparator consistency (antisymmetry, transitivity, equivalence behavior) is required for predictable sorting.'
    },
    {
      name: 'Pairwise to Global Composition',
      details:
        'Sorting composes pairwise precedence decisions into a global sequence when comparator contracts hold.'
    },
    {
      name: 'Comparator Cost',
      details:
        'Total runtime is sort complexity multiplied by comparator cost, so expensive comparisons should be optimized.'
    }
  ]
};
