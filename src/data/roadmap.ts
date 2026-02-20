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
            { id: 'dsa_slidewin_variants', label: 'Sliding Window Variants' },
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
            { id: 'dsa_ll_twoptr_variants', label: 'Fast & Slow Pointer Variants' },
            { id: 'dsa_ll_rand', label: 'Copy List with Random Pointer' },
          ],
        },
        {
          id: 'dsa_stacks',
          label: 'Stacks & Queues',
          children: [
            { id: 'dsa_mono', label: 'Monotonic Stack / Queue' },
            { id: 'dsa_stacks_variants', label: 'Advanced Stack Patterns' },
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
            { id: 'dsa_tree_path_variants', label: 'Tree Path Patterns' },
            { id: 'dsa_trees_lca', label: 'Lowest Common Ancestor' },
            { id: 'dsa_bst_variants', label: 'BST Property Variants' },
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
            { id: 'dsa_heap_variants', label: 'Two Heaps Pattern' },
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
            { id: 'dsa_bs_variants', label: 'Binary Search Variants' },
            { id: 'dsa_sorting_custom', label: 'Custom Comparators' },
            { id: 'dsa_quickselect', label: 'QuickSelect Algorithm' },
          ],
        },
        {
          id: 'dsa_patterns',
          label: 'Patterns & Paradigms',
          children: [
            { id: 'dsa_binsearch_classic', label: 'Classic Binary Search' },
            { id: 'dsa_intervals', label: 'Intervals (Merge/Insert/Meeting Rooms)' },
            { id: 'dsa_greedy_patterns', label: 'Greedy Proof Patterns' },
            { id: 'dsa_backtracking', label: 'Backtracking Template' },
          ],
        },
        {
          id: 'dsa_dp',
          label: 'Dynamic Programming',
          children: [
            { id: 'dsa_dp_knap', label: 'Knapsack Variants' },
            { id: 'dsa_dp_grid_variants', label: 'Grid DP Variants' },
            { id: 'dsa_dp_string_variants', label: 'String DP Variants' },
            { id: 'dsa_dp_lcs', label: 'LCS / LIS Patterns' },
            { id: 'dsa_dp_bitmask', label: 'Bitmask DP' },
            { id: 'dsa_dp_tree', label: 'DP on Trees' },
            { id: 'dsa_dp_digit', label: 'Digit DP' },
          ],
        },
        {
          id: 'dsa_graphs',
          label: 'Graphs',
          children: [
            { id: 'dsa_graph_trav', label: 'BFS & DFS Patterns' },
            { id: 'dsa_graph_cycle_variants', label: 'Graph Cycle Detection Variants' },
            { id: 'dsa_topo', label: 'Topological Sort / Kahn\'s' },
            { id: 'dsa_graph_short', label: 'Shortest Paths (Dijkstra, Bellman-Ford)' },
            { id: 'dsa_graph_scc', label: 'Strongly Connected (Tarjan/Kosaraju)' },
            { id: 'dsa_graph_flow', label: 'Network Flow (Ford-Fulkerson)' },
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
            { id: 'sd_consensus', label: 'Distributed Consensus (Paxos/Raft)' },
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
            { id: 'sd_geo_spatial', label: 'Geospatial Indexing (Quadtrees)' },
            { id: 'sd_replication', label: 'Replication (Leader-Follower, Multi-leader)' },
            { id: 'sd_consistent_hashing', label: 'Consistent Hashing & Data Distribution' },
            { id: 'sd_distributed_locks', label: 'Distributed Locks (ZooKeeper/Redis)' },
            { id: 'sd_vector_db', label: 'Vector Databases & RAG Architecture' },
            { id: 'sd_blob_storage', label: 'Object Storage (S3/Blob)' },
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
            { id: 'sd_api_design', label: 'API Paradigms (REST/GraphQL/gRPC)' },
            { id: 'sd_cloud_arch', label: 'Compute Models (Serverless/Containers)' },
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

export const examplesRoadmap: RoadmapItem = {
  id: 'ex_root',
  label: 'Real-World Architectures',
  description: 'Deconstructing the system design of top tech companies',
  children: [
    {
      id: 'ex_social',
      label: '1. Social & Communication',
      children: [
        {
          id: 'ex_chat',
          label: 'Messaging Systems',
          children: [
            { id: 'ex_whatsapp', label: 'Design WhatsApp (Chat System)' },
            { id: 'ex_discord', label: 'Design Discord (Group Chat / Presence)' },
            { id: 'ex_google_docs', label: 'Design Google Docs (Collab. Editing)' },
          ],
        },
        {
          id: 'ex_feeds',
          label: 'Social Media Feeds',
          children: [
            { id: 'ex_twitter', label: 'Design Twitter (News Feed & Timeline)' },
            { id: 'ex_instagram', label: 'Design Instagram (Photo Sharing)' },
          ],
        },
      ],
    },
    {
      id: 'ex_streaming',
      label: '2. Media & Streaming',
      children: [
        {
          id: 'ex_video',
          label: 'Video Processing',
          children: [
            { id: 'ex_netflix', label: 'Design Netflix (Video Streaming)' },
            { id: 'ex_youtube', label: 'Design YouTube (Video Storage & CDN)' },
          ],
        },
      ],
    },
    {
      id: 'ex_ecommerce',
      label: '3. E-Commerce & Marketplaces',
      children: [
        {
          id: 'ex_marketplace',
          label: 'Marketplace Platforms',
          children: [
            { id: 'ex_amazon', label: 'Design Amazon (E-commerce Checkout/Cart)' },
            { id: 'ex_uber', label: 'Design Uber (Ride Dispatch & Tracking)' },
            { id: 'ex_flash_sale', label: 'Design a Flash Sale System' },
          ],
        },
        {
          id: 'ex_bookings',
          label: 'Booking Systems',
          children: [
            { id: 'ex_ticketmaster', label: 'Design Ticketmaster (High Concurrency Booking)' },
            { id: 'ex_airbnb', label: 'Design Airbnb (Inventory & Search)' },
          ],
        },
      ],
    },
    {
      id: 'ex_utilities',
      label: '4. Infrastructure & Utilities',
      children: [
        {
          id: 'ex_infra',
          label: 'Scale & Routing',
          children: [
            { id: 'ex_tinyurl', label: 'Design TinyURL (URL Shortener)' },
            { id: 'ex_pastebin', label: 'Design Pastebin' },
            { id: 'ex_rate_limiter', label: 'Design a Distributed Rate Limiter' },
            { id: 'ex_web_crawler', label: 'Design a Distributed Web Crawler' },
            { id: 'ex_leaderboard', label: 'Design a Real-time Leaderboard' },
          ],
        },
        {
          id: 'ex_dataintensive',
          label: 'Data Intensive',
          children: [
            { id: 'ex_google_drive', label: 'Design Google Drive (File Storage)' },
            { id: 'ex_typeahead', label: 'Design Search Typeahead' },
            { id: 'ex_location_based', label: 'Design Yelp / Proximity Service' },
          ],
        },
      ],
    },
  ],
};

