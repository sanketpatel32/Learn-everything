import type { TopicContent } from '../topicContent';

export const copyListWithRandomPointer: TopicContent = {
  title: 'Copy List with Random Pointer',
  description:
    'This problem is linked-list cloning with extra arbitrary `random` edges. Correctness requires preserving graph topology, not just node values.',
  example:
    'Given nodes `A -> B -> C` where `A.random = C`, `B.random = A`, clone the structure so cloned random pointers target cloned nodes, not original nodes.',
  complexity: {
    time: 'O(N)',
    space: 'O(1) to O(N)'
  },
  approaches: [
    {
      title: 'Brute Force (Hash Map Node Mapping)',
      content:
        'Build explicit original-to-clone mapping, then wire edges in second pass.\n\nStep-by-step mechanics:\n1. First pass creates clone nodes only and stores `map[orig] = clone`.\n2. Second pass sets clone pointers via map lookups:\n   - `clone.next = map.get(orig.next)`\n   - `clone.random = map.get(orig.random)`\n3. Return mapped clone of original head.\n\n```python\nfunction copyRandomListWithMap(head):\n    if head is null:\n        return null\n\n    nodeMap = dict()\n    curr = head\n\n    while curr is not null:\n        nodeMap[curr] = Node(curr.val)\n        curr = curr.next\n\n    curr = head\n    while curr is not null:\n        clone = nodeMap[curr]\n        clone.next = nodeMap.get(curr.next)\n        clone.random = nodeMap.get(curr.random)\n        curr = curr.next\n\n    return nodeMap[head]\n```\n\nWhy this is reliable:\nMap gives constant-time translation from any original pointer target to corresponding clone pointer target.',
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (Interweaving Nodes)',
      content:
        'Interleave clones with originals to create implicit mapping without hash table.\n\nStep-by-step mechanics:\n1. Interweave phase:\n   - for each original node `X`, insert clone `X_clone` right after it.\n2. Random-link phase:\n   - if `X.random` exists, set `X_clone.random = X.random.next`.\n3. Split phase:\n   - restore original list links.\n   - extract clone list links.\n\n```python\nfunction copyRandomListInPlace(head):\n    if head is null:\n        return null\n\n    # phase 1: interweave\n    curr = head\n    while curr is not null:\n        clone = Node(curr.val)\n        clone.next = curr.next\n        curr.next = clone\n        curr = clone.next\n\n    # phase 2: assign random pointers\n    curr = head\n    while curr is not null:\n        clone = curr.next\n        if curr.random is not null:\n            clone.random = curr.random.next\n        curr = clone.next\n\n    # phase 3: split lists\n    curr = head\n    cloneHead = head.next\n    while curr is not null:\n        clone = curr.next\n        curr.next = clone.next\n        if clone.next is not null:\n            clone.next = clone.next.next\n        curr = curr.next\n\n    return cloneHead\n```\n\nInvariant:\nAfter phase 1, every original node is followed by its clone. This adjacency is the implicit map that powers phase 2 constant-time random mapping.\n\nWhy this works:\nThe algorithm simulates a map using structure layout itself, reducing extra memory from `O(N)` to `O(1)`.',
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      }
    }
  ],
  pitfalls: [
    'Assigning random pointers before interleaving is complete leads to null errors.',
    'During split phase, improper pointer restoration can corrupt original list.',
    'Random pointers must reference cloned nodes, never original nodes.',
    'If phase order is changed, random mapping logic (`curr.random.next`) becomes invalid.'
  ],
  concepts: [
    {
      name: 'Graph Copy in Disguise',
      details:
        'A random-pointer list is a directed graph with constrained degree, so cloning follows graph-copy principles.'
    },
    {
      name: 'Adjacency Trick',
      details:
        'Placing clone next to original gives implicit mapping without hash storage.'
    },
    {
      name: 'Two-edge Graph Preservation',
      details:
        'Both `next` and `random` edges must be reconstructed consistently to preserve original connectivity semantics.'
    }
  ]
};
