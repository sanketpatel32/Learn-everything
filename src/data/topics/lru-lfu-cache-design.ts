import type { TopicContent } from '../topicContent';

export const lruLfuCacheDesign: TopicContent = {
  title: 'LRU & LFU Cache Design',
  description:
    'Cache design problems test constant-time `get/put` under strict eviction policies. LRU optimizes recency, LFU optimizes frequency (usually with recency tie-break).',
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
        'Keep entries in list/array and linearly scan for every operation.\n\nStep-by-step mechanics:\n1. `get(key)` scans full list for key.\n2. If found, update metadata (`lastUsed`, `freq`).\n3. `put(key,val)` scans for existing key; otherwise append entry.\n4. If over capacity, scan again to choose eviction target.\n\n```python\nfunction getBrute(cacheList, key):\n    for entry in cacheList:\n        if entry.key == key:\n            entry.lastUsed = now()\n            entry.freq += 1\n            return entry.value\n    return -1\n```\n\nCorrect but asymptotically poor because both lookup and eviction selection are linear.',
      complexity: {
        time: 'O(N) per op',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (Hash Map + Doubly Linked Lists)',
      content:
        'LRU and LFU both rely on structure composition.\n\nLRU mechanics:\n1. Hash map `key -> node` for constant lookup.\n2. Doubly linked list ordered by recency.\n3. `get` moves node to head (most recent).\n4. `put` inserts/updates at head.\n5. On overflow, evict tail (least recent).\n\n```python\nfunction get(key):\n    if key not in map:\n        return -1\n\n    node = map[key]\n    remove(node)\n    addToHead(node)\n    return node.value\n\nfunction put(key, value):\n    if key in map:\n        node = map[key]\n        node.value = value\n        remove(node)\n        addToHead(node)\n        return\n\n    node = Node(key, value)\n    map[key] = node\n    addToHead(node)\n\n    if size > capacity:\n        evicted = removeTail()\n        del map[evicted.key]\n```\n\nLFU mechanics:\n1. `key -> node` map for direct access.\n2. `freq -> doubly linked list` map to keep recency inside same frequency bucket.\n3. Node on access:\n   - remove from old frequency list\n   - increment frequency\n   - add to new frequency list head\n4. Maintain `minFreq` for O(1) eviction target selection.\n\nWhy this works:\nHash maps remove key-search cost; doubly linked lists remove move/delete cost, together enabling near-constant operations.',
      complexity: {
        time: 'O(1) amortized',
        space: 'O(Capacity)'
      }
    }
  ],
  pitfalls: [
    'Using singly linked list makes middle-node deletion `O(N)` and breaks performance target.',
    'For LFU, forgetting to update `minFreq` after moving nodes across frequency lists.',
    'Eviction logic must run only after inserting/updating, with strict capacity checks.',
    'Capacity zero edge case must be handled explicitly (`put` should no-op).'
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
    },
    {
      name: 'Policy-specific Metadata',
      details:
        'Cache eviction is a data-structure problem driven by maintaining policy metadata (`time`, `freq`, or both) efficiently.'
    }
  ]
};
