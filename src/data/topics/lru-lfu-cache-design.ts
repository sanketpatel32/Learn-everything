import type { TopicContent } from '../topicContent';

export const lruLfuCacheDesign: TopicContent = {
  title: 'LRU & LFU Cache Design',
  description:
    'Cache design problems test constant-time operations under eviction constraints. LRU evicts least recently used; LFU evicts least frequently used (often with LRU tie-breaker).',
  example:
    'For LRU capacity `2`: `put(1,1), put(2,2), get(1), put(3,3)` should evict key `2` because key `1` was just used.',
  complexity: {
    time: 'O(1) target for get/put',
    space: 'O(Capacity)'
  },
  approaches: [
    {
      title: 'Brute Force (Array or List Scan)',
      content:
        'Keep entries in a list and linearly search for keys. On every access, update recency/frequency metadata and possibly reorder.\n\nStep-by-step mechanics:\n1. `get(key)` scans list to find entry.\n2. If found, update recency/frequency and return value.\n3. `put(key, val)` scans for existing key; otherwise append.\n4. On overflow, scan again to find eviction candidate.\n\n```python\nfunction getBrute(cacheList, key):\n    for entry in cacheList:\n        if entry.key == key:\n            entry.lastUsed = now()\n            entry.freq += 1\n            return entry.value\n    return -1\n```\n\nThis strategy is simple but too slow because scans are `O(N)` per operation.',
      complexity: {
        time: 'O(N) per op',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (Hash Map + Doubly Linked Lists)',
      content:
        'For LRU, combine direct lookup with constant-time node moves.\n\nStep-by-step mechanics:\n1. Use hash map `key -> node` for `O(1)` lookup.\n2. Store nodes in doubly linked list ordered by recency (head = most recent, tail = least recent).\n3. On `get`, move node to head.\n4. On `put`, update existing or insert at head.\n5. If overflow, remove tail node and delete map key.\n\n```python\nfunction get(key):\n    if key not in map:\n        return -1\n\n    node = map[key]\n    remove(node)\n    addToHead(node)\n    return node.value\n\nfunction put(key, value):\n    if key in map:\n        node = map[key]\n        node.value = value\n        remove(node)\n        addToHead(node)\n        return\n\n    node = Node(key, value)\n    map[key] = node\n    addToHead(node)\n\n    if size > capacity:\n        evicted = removeTail()\n        del map[evicted.key]\n```\n\nFor LFU, use:\n- map `key -> node`\n- map `freq -> doubly linked list`\n- track `minFreq`\nThis still gives near-constant updates with more bookkeeping.',
      complexity: {
        time: 'O(1) amortized',
        space: 'O(Capacity)'
      }
    }
  ],
  pitfalls: [
    'Using singly linked list makes middle-node deletion `O(N)` and breaks performance target.',
    'For LFU, forgetting to update `minFreq` after moving nodes across frequency lists.',
    'Eviction logic must run only after inserting/updating, with strict capacity checks.'
  ],
  concepts: [
    {
      name: 'Data Structure Composition',
      details:
        'No single structure solves this. Fast design comes from combining hash maps with linked lists.'
    },
    {
      name: 'Recency vs Frequency',
      details:
        'LRU optimizes temporal locality, LFU optimizes repeated popularity; each fails in different workload patterns.'
    }
  ]
};
