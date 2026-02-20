import type { TopicContent } from '../topicContent';

export const copyListWithRandomPointer: TopicContent = {
  title: 'Copy List with Random Pointer',
  description:
    'This problem extends linked list cloning by adding arbitrary `random` edges. You must preserve both `next` and `random` topology in the copied list.',
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
        'Use a map from original node to cloned node, then wire pointers in a second pass.\n\nStep-by-step mechanics:\n1. First pass: create clone node for every original node and store `map[orig] = clone`.\n2. Second pass: assign `clone.next = map[orig.next]` and `clone.random = map[orig.random]`.\n3. Return `map[head]`.\n\n```python\nfunction copyRandomListWithMap(head):\n    if head is null:\n        return null\n\n    nodeMap = dict()\n    curr = head\n\n    while curr is not null:\n        nodeMap[curr] = Node(curr.val)\n        curr = curr.next\n\n    curr = head\n    while curr is not null:\n        clone = nodeMap[curr]\n        clone.next = nodeMap.get(curr.next)\n        clone.random = nodeMap.get(curr.random)\n        curr = curr.next\n\n    return nodeMap[head]\n```\n\nThis is clean and interview-friendly, but uses extra memory for mapping.',
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (Interweaving Nodes)',
      content:
        'Interleave cloned nodes inside original list, set random pointers via local jumps, then split lists.\n\nStep-by-step mechanics:\n1. For each original node `X`, insert `X\'` right after it.\n2. Set random for clone: if `X.random` exists, then `X\'.random = X.random.next`.\n3. Detach interleaved list into original and clone chains.\n\n```python\nfunction copyRandomListInPlace(head):\n    if head is null:\n        return null\n\n    curr = head\n    while curr is not null:\n        clone = Node(curr.val)\n        clone.next = curr.next\n        curr.next = clone\n        curr = clone.next\n\n    curr = head\n    while curr is not null:\n        clone = curr.next\n        if curr.random is not null:\n            clone.random = curr.random.next\n        curr = clone.next\n\n    curr = head\n    cloneHead = head.next\n    while curr is not null:\n        clone = curr.next\n        curr.next = clone.next\n        if clone.next is not null:\n            clone.next = clone.next.next\n        curr = curr.next\n\n    return cloneHead\n```\n\nWhy this works:\nEach clone is adjacent to its original, so original-to-clone lookup becomes constant-time pointer arithmetic, eliminating hash map memory.',
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      }
    }
  ],
  pitfalls: [
    'Assigning random pointers before interleaving is complete leads to null errors.',
    'During split phase, improper pointer restoration can corrupt original list.',
    'Random pointers must reference cloned nodes, never original nodes.'
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
    }
  ]
};
