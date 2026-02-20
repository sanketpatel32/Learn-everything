import type { TopicContent } from '../topicContent';

export const treeSerialization: TopicContent = {
  title: 'Serialization / Deserialization',
  description:
    'Serialization converts a tree into a deterministic string or token stream that can be stored or transmitted. Deserialization must reconstruct the identical shape and values, not just a value multiset.',
  example:
    'A level-order serialization might encode tree `1 / \\ 2 3` as `1,2,3,#,#,#,#` where `#` represents null.',
  complexity: {
    time: 'O(N)',
    space: 'O(N)'
  },
  approaches: [
    {
      title: 'Brute Force (DFS with Null Markers)',
      content:
        'A robust baseline is pre-order DFS with explicit null markers.\n\nFormat contract:\n1. Every real node emits one value token.\n2. Every missing child emits one `#` token.\n3. Token order is strictly pre-order (`node -> left -> right`).\n\nStep-by-step mechanics:\n1. Serialize recursively using the contract above.\n2. During deserialization, keep a pointer `idx` into token array.\n3. If token is `#`, return null and advance `idx`.\n4. Otherwise create node, recursively build left then right.\n\n```python\nfunction serialize(node, out):\n    if node is null:\n        out.append(\"#\")\n        return\n\n    out.append(str(node.val))\n    serialize(node.left, out)\n    serialize(node.right, out)\n\nfunction deserialize(tokens):\n    idx = 0\n\n    def build():\n        nonlocal idx\n        val = tokens[idx]\n        idx += 1\n\n        if val == \"#\":\n            return null\n\n        node = TreeNode(int(val))\n        node.left = build()\n        node.right = build()\n        return node\n\n    return build()\n```\n\nWhy this works:\nIncluding null markers makes the encoding unambiguous; recursive decode consumes tokens in exactly the same structural order they were produced.',
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (BFS Queue Encoding)',
      content:
        'Level-order (BFS) encoding is iterative and practical for production systems where recursion depth may be risky.\n\nStep-by-step mechanics:\n1. Serialize by queueing nodes breadth-first.\n2. Emit `#` tokens for nulls so child positions are preserved.\n3. Deserialize with queue: read root first, then attach left/right children pairwise from token stream.\n\n```python\nfunction serializeBFS(root):\n    if root is null:\n        return \"#\"\n\n    queue = [root]\n    out = []\n\n    while queue:\n        node = queue.pop(0)\n        if node is null:\n            out.append(\"#\")\n            continue\n\n        out.append(str(node.val))\n        queue.append(node.left)\n        queue.append(node.right)\n\n    return \",\".join(out)\n\nfunction deserializeBFS(data):\n    tokens = data.split(\",\")\n    if tokens[0] == \"#\":\n        return null\n\n    root = TreeNode(int(tokens[0]))\n    queue = [root]\n    i = 1\n\n    while queue and i < len(tokens):\n        node = queue.pop(0)\n\n        if tokens[i] != \"#\":\n            node.left = TreeNode(int(tokens[i]))\n            queue.append(node.left)\n        i += 1\n\n        if i < len(tokens) and tokens[i] != \"#\":\n            node.right = TreeNode(int(tokens[i]))\n            queue.append(node.right)\n        i += 1\n\n    return root\n```\n\nWhy this works:\nThe queue guarantees children are attached in the same order parents were emitted, so structural positions are reconstructed deterministically.',
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      }
    }
  ],
  pitfalls: [
    'Skipping null markers loses structure for asymmetric trees.',
    'Using `pop(0)` on arrays in tight loops can degrade runtime due to shifts.',
    'Using ambiguous delimiters breaks parsing for multi-digit or negative values.',
    'Recursive deserialization must consume tokens in exactly the same traversal order used for serialization.'
  ],
  concepts: [
    {
      name: 'Shape + Value Preservation',
      details:
        'A valid encoding must capture both node values and null positions, not just traversal values.'
    },
    {
      name: 'Round-trip Integrity',
      details:
        'Deserializing serialized data must produce a tree that serializes back to the same representation.'
    }
  ]
};
