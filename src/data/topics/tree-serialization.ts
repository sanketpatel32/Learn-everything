import type { TopicContent } from '../topicContent';

export const treeSerialization: TopicContent = {
  title: 'Serialization / Deserialization',
  description:
    'Serialization encodes a tree into deterministic tokens for storage or transport. Deserialization must reconstruct identical structure and values, not just traversal order or value multiset.',
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
        'A robust baseline uses pre-order DFS with explicit null markers.\n\nFormat contract:\n1. Real node emits one value token.\n2. Missing child emits `#` token.\n3. Order is strictly `node -> left -> right`.\n\nStep-by-step mechanics:\n1. Serialize recursively with the above contract.\n2. Deserialize using moving index over token list.\n3. `#` means return null.\n4. Non-`#` means create node, then build left and right children.\n\n```python\nfunction serialize(node, out):\n    if node is null:\n        out.append(\"#\")\n        return\n\n    out.append(str(node.val))\n    serialize(node.left, out)\n    serialize(node.right, out)\n\nfunction deserialize(tokens):\n    idx = 0\n\n    def build():\n        nonlocal idx\n        val = tokens[idx]\n        idx += 1\n\n        if val == \"#\":\n            return null\n\n        node = TreeNode(int(val))\n        node.left = build()\n        node.right = build()\n        return node\n\n    return build()\n```\n\nWhy this works:\nNull markers remove ambiguity, so token stream uniquely determines tree shape and values.',
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (BFS Queue Encoding)',
      content:
        'Level-order (BFS) codec is iterative and avoids deep recursion risks.\n\nStep-by-step mechanics:\n1. Serialize by BFS queue.\n2. Emit `#` for null children to preserve positions.\n3. Deserialize by consuming token pairs as left and right children of dequeued parent.\n\n```python\nfrom collections import deque\n\nfunction serializeBFS(root):\n    if root is null:\n        return \"#\"\n\n    q = deque([root])\n    out = []\n\n    while q:\n        node = q.popleft()\n\n        if node is null:\n            out.append(\"#\")\n            continue\n\n        out.append(str(node.val))\n        q.append(node.left)\n        q.append(node.right)\n\n    return \",\".join(out)\n\nfunction deserializeBFS(data):\n    tokens = data.split(\",\")\n    if tokens[0] == \"#\":\n        return null\n\n    root = TreeNode(int(tokens[0]))\n    q = deque([root])\n    i = 1\n\n    while q and i < len(tokens):\n        node = q.popleft()\n\n        if tokens[i] != \"#\":\n            node.left = TreeNode(int(tokens[i]))\n            q.append(node.left)\n        i += 1\n\n        if i < len(tokens) and tokens[i] != \"#\":\n            node.right = TreeNode(int(tokens[i]))\n            q.append(node.right)\n        i += 1\n\n    return root\n```\n\nWhy this works:\nBFS consumption order and child-token order match exactly, so node attachment is deterministic.',
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      }
    },
    {
      title: 'Advanced Variant (Codec Hardening and Format Stability)',
      content:
        'Real-world codecs require stable format contracts, versioning, and robust parsing.\n\nStep-by-step hardening checklist:\n1. Define explicit token grammar (`value`, `null marker`, delimiter escaping rules).\n2. Add version prefix in payload (for backward compatibility).\n3. Validate token count and bounds during decode.\n4. Reject malformed or truncated streams early.\n5. Add deterministic round-trip tests: `deserialize(serialize(tree))` equality.\n\n```python\nfunction encodeWithVersion(root):\n    payload = serializeBFS(root)\n    return \"v1|\" + payload\n\nfunction decodeWithVersion(data):\n    parts = data.split(\"|\", 1)\n    if len(parts) != 2:\n        raise Error(\"invalid format\")\n\n    version = parts[0]\n    payload = parts[1]\n\n    if version != \"v1\":\n        raise Error(\"unsupported version\")\n\n    return deserializeBFS(payload)\n```\n\nWhy this matters:\nWithout stable format and validation, serialized trees become brittle across services, versions, and languages.',
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
    'Recursive deserialization must consume tokens in exactly the same traversal order used for serialization.',
    'Mixing codec formats (DFS payload decoded by BFS parser) silently corrupts reconstructed trees.'
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
    },
    {
      name: 'Format Contract',
      details:
        'Serialization is an API contract; explicit grammar and versioning prevent compatibility failures.'
    }
  ]
};
