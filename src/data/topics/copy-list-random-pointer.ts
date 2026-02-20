import type { TopicContent } from '../topicContent';

export const copyListWithRandomPointer: TopicContent = {
  title: 'Copy List with Random Pointer',
  description:
    'This is linked-list cloning with an extra arbitrary `random` edge per node. Correctness means preserving full pointer topology (`next` and `random`), not only values.',
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
        'Create explicit original-to-clone mapping in first pass, then wire pointers in second pass.\n\nStep-by-step mechanics:\n1. Pass 1: clone nodes only and store `map[orig] = clone`.\n2. Pass 2: set `next` and `random` via map lookups.\n3. Return clone mapped from original head.\n\n```python\nfunction copyRandomListWithMap(head):\n    if head is null:\n        return null\n\n    nodeMap = dict()\n    curr = head\n\n    while curr is not null:\n        nodeMap[curr] = Node(curr.val)\n        curr = curr.next\n\n    curr = head\n    while curr is not null:\n        clone = nodeMap[curr]\n        clone.next = nodeMap.get(curr.next)\n        clone.random = nodeMap.get(curr.random)\n        curr = curr.next\n\n    return nodeMap[head]\n```\n\nWhy this works:\nAny original pointer target can be translated to clone target in `O(1)` via map.',
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (Interweaving Nodes)',
      content:
        'Interleave clone nodes with originals so adjacency acts as an implicit map.\n\nStep-by-step mechanics:\n1. Interweave clones after each original node.\n2. Assign clone random pointers using `orig.random.next`.\n3. Split interwoven list into original and clone lists.\n\n```python\nfunction copyRandomListInPlace(head):\n    if head is null:\n        return null\n\n    curr = head\n    while curr is not null:\n        clone = Node(curr.val)\n        clone.next = curr.next\n        curr.next = clone\n        curr = clone.next\n\n    curr = head\n    while curr is not null:\n        clone = curr.next\n        if curr.random is not null:\n            clone.random = curr.random.next\n        curr = clone.next\n\n    curr = head\n    cloneHead = head.next\n    while curr is not null:\n        clone = curr.next\n        curr.next = clone.next\n        if clone.next is not null:\n            clone.next = clone.next.next\n        curr = curr.next\n\n    return cloneHead\n```\n\nInvariant:\nAfter interweaving, each original node is immediately followed by its clone, enabling `O(1)` random-edge translation.\n\nWhy this works:\nStructure itself becomes mapping, removing need for external hash storage.',
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      }
    },
    {
      title: 'Alternative Approach (DFS Graph Clone with Memo)',
      content:
        'Model the list as a directed graph where each node has up to two outgoing edges (`next`, `random`) and clone with memoized DFS.\n\nStep-by-step mechanics:\n1. If node is null, return null.\n2. If node already cloned, return memoized clone.\n3. Create clone and store in memo.\n4. Recursively clone `next` and `random` neighbors.\n\n```python\nfunction clone(node, memo):\n    if node is null:\n        return null\n\n    if node in memo:\n        return memo[node]\n\n    copy = Node(node.val)\n    memo[node] = copy\n\n    copy.next = clone(node.next, memo)\n    copy.random = clone(node.random, memo)\n    return copy\n\nfunction copyRandomListDFS(head):\n    return clone(head, dict())\n```\n\nWhy this matters:\nIt highlights graph-cloning equivalence and can be adapted to arbitrary object graph copy tasks.',
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      }
    }
  ],
  pitfalls: [
    'Assigning random pointers before interleaving is complete leads to null errors.',
    'During split phase, improper pointer restoration can corrupt original list.',
    'Random pointers must reference cloned nodes, never original nodes.',
    'If phase order is changed, random mapping logic (`curr.random.next`) becomes invalid.',
    'Using node values as map keys fails when duplicate values exist; mapping must use node identity.'
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
    },
    {
      name: 'Identity Mapping',
      details:
        'Cloning pointer structures requires mapping by object identity, not by value.'
    }
  ]
};
