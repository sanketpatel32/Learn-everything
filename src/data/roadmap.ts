export type RoadmapItem = {
  id: string;
  label: string;
  description?: string;
  isComingSoon?: boolean;
  children?: RoadmapItem[];
};

export const dsaRoadmap: RoadmapItem = {
  id: 'dsa_root',
  label: 'FAANG DSA Roadmap',
  description: 'Path to mastering Data Structures and Algorithms',
  children: [
    {
      id: 'dsa_core',
      label: '1. Core Data Structures',
      children: [
        {
          id: 'dsa_arrays',
          label: 'Arrays & Strings',
          children: [
            { id: 'dsa_slidewin', label: 'Sliding Window' },
            { id: 'dsa_twoptr', label: 'Two Pointers' },
            { id: 'dsa_prefix', label: 'Prefix Sum' },
            { id: 'dsa_matrix', label: 'Matrix Manipulation' },
            { id: 'dsa_kadane', label: "Kadane's Algorithm" },
          ],
        },
        {
          id: 'dsa_linked',
          label: 'Linked Lists',
          children: [
            { id: 'dsa_ll_rev', label: 'Reversal Patterns' },
            { id: 'dsa_ll_cycle', label: 'Cycle Detection (Floyd)' },
            { id: 'dsa_ll_merge', label: 'In-place Merge' },
            { id: 'dsa_ll_rand', label: 'Copy List with Random Pointer' },
          ],
        },
        {
          id: 'dsa_stacks',
          label: 'Stacks & Queues',
          children: [
            { id: 'dsa_mono', label: 'Monotonic Stack / Queue' },
            { id: 'dsa_lru', label: 'LRU & LFU Cache Design' },
            { id: 'dsa_circular', label: 'Circular Queue Implementation' },
          ],
        },
        {
          id: 'dsa_bit',
          label: 'Bit Manipulation',
          children: [
            { id: 'dsa_bit_mask', label: 'Bitmasking Basics' },
            { id: 'dsa_bit_tricks', label: 'Power of Two / Single Number' },
            { id: 'dsa_bit_subset', label: 'Generating Subsets' },
          ],
        },
      ],
    },
    {
      id: 'dsa_advanced',
      label: '2. Advanced Data Structures',
      children: [
        {
          id: 'dsa_trees',
          label: 'Trees & BST',
          children: [
            { id: 'dsa_trees_trav', label: 'Recursive & Iterative Traversals' },
            { id: 'dsa_trees_lca', label: 'Lowest Common Ancestor' },
            { id: 'dsa_trees_serialize', label: 'Serialization / Deserialization' },
            { id: 'dsa_trees_view', label: 'Side Views (Left/Right/Top)' },
          ],
        },
        {
          id: 'dsa_adv_trees',
          label: 'Advanced Tree Structures',
          children: [
            { id: 'dsa_tries', label: 'Tries (Prefix Tree)' },
            { id: 'dsa_segtrees', label: 'Segment Trees' },
            { id: 'dsa_fenwick', label: 'Fenwick Tree (BIT)' },
            { id: 'dsa_dsu', label: 'Disjoint Set Union (DSU)' },
          ],
        },
        {
          id: 'dsa_heaps',
          label: 'Heaps & Priority Queues',
          children: [
            { id: 'dsa_heap_k', label: 'Top K Elements' },
            { id: 'dsa_heap_median', label: 'Median in a Stream' },
          ],
        },
      ],
    },
    {
      id: 'dsa_algo',
      label: '3. Algorithms & Paradigms',
      children: [
        {
          id: 'dsa_search',
          label: 'Searching & Sorting',
          children: [
            { id: 'dsa_binsearch_ans', label: 'Binary Search on Answer' },
            { id: 'dsa_sorting_custom', label: 'Custom Comparators' },
            { id: 'dsa_quickselect', label: 'QuickSelect Algorithm' },
          ],
        },
        {
          id: 'dsa_dp',
          label: 'Dynamic Programming',
          children: [
            { id: 'dsa_dp_knap', label: 'Knapsack Variants' },
            { id: 'dsa_dp_lcs', label: 'LCS / LIS Patterns' },
            { id: 'dsa_dp_bitmask', label: 'Bitmask DP' },
            { id: 'dsa_dp_tree', label: 'DP on Trees' },
            { id: 'dsa_dp_digit', label: 'Digit DP', isComingSoon: true },
          ],
        },
        {
          id: 'dsa_graphs',
          label: 'Graphs',
          children: [
            { id: 'dsa_graph_trav', label: 'BFS & DFS Patterns' },
            { id: 'dsa_topo', label: 'Topological Sort / Kahn\'s' },
            { id: 'dsa_graph_short', label: 'Shortest Paths (Dijkstra, Bellman-Ford)' },
            { id: 'dsa_graph_scc', label: 'Strongly Connected (Tarjan/Kosaraju)' },
            { id: 'dsa_graph_flow', label: 'Network Flow (Ford-Fulkerson)', isComingSoon: true },
          ],
        },
      ],
    },
  ],
};

export const systemDesignRoadmap: RoadmapItem = {
  id: 'sd_root',
  label: 'FAANG System Design Roadmap',
  description: 'Path to mastering large scale systems',
  children: [
    {
      id: 'sd_fund',
      label: '1. Fundamentals & Scaling',
      children: [
        {
          id: 'sd_scaling',
          label: 'Scalability Patterns',
          children: [
            { id: 'sd_scale_vert', label: 'Vertical vs Horizontal scaling' },
            { id: 'sd_lb_strat', label: 'Load Balancing (L4 vs L7)' },
            { id: 'sd_shard', label: 'Database Sharding & Partitioning' },
            { id: 'sd_consistency_models', label: 'Strong vs Eventual Consistency' },
          ],
        },
        {
          id: 'sd_resilience',
          label: 'Resilience & Reliability',
          children: [
            { id: 'sd_redundancy', label: 'Redundancy (Active-Passive vs Active-Active)' },
            { id: 'sd_circuit', label: 'Circuit Breakers & Retries' },
            { id: 'sd_throttling', label: 'Rate Limiting & Throttling' },
            { id: 'sd_bulkhead', label: 'Bulkhead Pattern' },
          ],
        },
      ],
    },
    {
      id: 'sd_components',
      label: '2. Infrastructure & Components',
      children: [
        {
          id: 'sd_db_deep',
          label: 'Storage & Databases',
          children: [
            { id: 'sd_sql_nosql', label: 'SQL, NoSQL, & NewSQL' },
            { id: 'sd_index_types', label: 'BTrees, LSM Trees, & Hashing' },
            { id: 'sd_replication', label: 'Replication (Leader-Follower, Multi-leader)' },
          ],
        },
        {
          id: 'sd_cache_mesh',
          label: 'Caching & Content Delivery',
          children: [
            { id: 'sd_cache_strat', label: 'Write-through, Write-back, Cache-aside' },
            { id: 'sd_cdn', label: 'CDN & Edge Computing' },
          ],
        },
        {
          id: 'sd_messaging',
          label: 'Messaging & Streaming',
          children: [
            { id: 'sd_queues', label: 'Pub/Sub vs Message Queues' },
            { id: 'sd_kafka', label: 'Kafka & Event Streaming' },
            { id: 'sd_protocols', label: 'Protocols: gRPC, WebSockets, MQTT' },
          ],
        },
      ],
    },
    {
      id: 'sd_adv_patterns',
      label: '3. Advanced Architecture',
      children: [
        {
          id: 'sd_micro_patterns',
          label: 'Microservices Patterns',
          children: [
            { id: 'sd_apigw_patterns', label: 'API Gateway & BFF' },
            { id: 'sd_service_mesh', label: 'Service Mesh (Istio/Linkerd)' },
            { id: 'sd_outbox', label: 'Transactional Outbox Pattern' },
          ],
        },
        {
          id: 'sd_event_arch',
          label: 'Event-Driven Systems',
          children: [
            { id: 'sd_cqrs', label: 'CQRS & Event Sourcing' },
            { id: 'sd_sagas', label: 'Saga Pattern (Choreography/Orchestration)' },
          ],
        },
        {
          id: 'sd_observability',
          label: 'Observability & Security',
          children: [
            { id: 'sd_telemetry', label: 'Metrics, Logs, & Tracing' },
            { id: 'sd_auth_security', label: 'OAuth2, OIDC, & JWT' },
            { id: 'sd_zero_trust', label: 'Zero Trust Security Architecture' },
          ],
        },
      ],
    },
  ],
};
