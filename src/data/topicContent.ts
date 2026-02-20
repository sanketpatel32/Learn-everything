import { slidingWindow } from './topics/sliding-window';
import { capTheorem } from './topics/cap-theorem';
import { twoPointers } from './topics/two-pointers';
import { prefixSum } from './topics/prefix-sum';
import { messagingQueues } from './topics/messaging-queues';
import { arraysStrings } from './topics/arrays-strings';
import { matrixManipulation } from './topics/matrix-manipulation';
import { kadaneAlgorithm } from './topics/kadane-algorithm';
import { linkedListReversalPatterns } from './topics/linked-list-reversal';
import { cycleDetectionFloyd } from './topics/cycle-detection-floyd';
import { inPlaceMerge } from './topics/in-place-merge';
import { copyListWithRandomPointer } from './topics/copy-list-random-pointer';
import { monotonicStackQueue } from './topics/monotonic-stack-queue';
import { lruLfuCacheDesign } from './topics/lru-lfu-cache-design';
import { circularQueueImplementation } from './topics/circular-queue-implementation';
import { bitmaskingBasics } from './topics/bitmasking-basics';
import { bitTricksPowerSingle } from './topics/bit-tricks-power-single';
import { generatingSubsets } from './topics/generating-subsets';
import { recursiveIterativeTraversals } from './topics/tree-traversals';
import { lowestCommonAncestor } from './topics/lowest-common-ancestor';
import { treeSerialization } from './topics/tree-serialization';
import { treeSideViews } from './topics/tree-side-views';
import { triesPrefixTree } from './topics/tries-prefix-tree';
import { segmentTrees } from './topics/segment-trees';
import { fenwickTreeBit } from './topics/fenwick-tree-bit';
import { disjointSetUnion } from './topics/disjoint-set-union';
import { topKElements } from './topics/top-k-elements';
import { medianInStream } from './topics/median-in-stream';
import { classicBinarySearch } from './topics/classic-binary-search';
import { binarySearchOnAnswer } from './topics/binary-search-on-answer';
import { intervalsPatterns } from './topics/intervals-patterns';
import { greedyProofPatterns } from './topics/greedy-patterns';
import { backtrackingTemplate } from './topics/backtracking-template';
import { customComparators } from './topics/custom-comparators';
import { quickselectAlgorithm } from './topics/quickselect-algorithm';
import { knapsackVariants } from './topics/knapsack-variants';
import { lcsLisPatterns } from './topics/lcs-lis-patterns';
import { bitmaskDp } from './topics/bitmask-dp';
import { dpOnTrees } from './topics/dp-on-trees';
import { digitDp } from './topics/digit-dp';
import { graphBfsDfs } from './topics/graph-bfs-dfs';
import { topologicalSortKahn } from './topics/topological-sort-kahn';
import { shortestPaths } from './topics/shortest-paths';
import { stronglyConnectedComponents } from './topics/strongly-connected-components';
import { networkFlowFordFulkerson } from './topics/network-flow-ford-fulkerson';
import { scalingTypes } from './topics/scaling-types';
import { loadBalancing } from './topics/load-balancing';
import { sharding } from './topics/sharding';
import { redundancy } from './topics/redundancy';
import { circuitBreakers } from './topics/circuit-breakers';
import { sqlVsNosql } from './topics/sql-nosql';
import { cacheStrategies } from './topics/cache-strategies';
import { cdnEdge } from './topics/cdn-edge';
import { apiGatewayBff } from './topics/api-gateway';
import { cqrsEventSourcing } from './topics/cqrs';
import { rateLimiting } from './topics/rate-limiting';
import { bulkhead } from './topics/bulkhead';
import { indexTypes } from './topics/index-types';
import { replication } from './topics/replication';
import { kafka } from './topics/kafka';
import { protocols } from './topics/protocols';
import { serviceMesh } from './topics/service-mesh';
import { outboxPattern } from './topics/outbox-pattern';
import { sagas } from './topics/sagas';
import { telemetry } from './topics/telemetry';
import { authSecurity } from './topics/auth-security';
import { zeroTrust } from './topics/zero-trust';
import { whatsapp } from './topics/ex-whatsapp';
import { netflix } from './topics/ex-netflix';
import { uber } from './topics/ex-uber';
import { ticketmaster } from './topics/ex-ticketmaster';
import { tinyurl } from './topics/ex-tinyurl';
import { discord } from './topics/ex-discord';
import { twitter } from './topics/ex-twitter';
import { instagram } from './topics/ex-instagram';
import { youtube } from './topics/ex-youtube';
import { amazon } from './topics/ex-amazon';
import { airbnb } from './topics/ex-airbnb';
import { pastebin } from './topics/ex-pastebin';
import { rateLimiter } from './topics/ex-rate-limiter';
import { googleDrive } from './topics/ex-google-drive';
import { typeahead } from './topics/ex-typeahead';

// ... other imports ...
import { consistentHashing } from './topics/consistent-hashing';
import { distributedLocks } from './topics/distributed-locks';
import { vectorDb } from './topics/vector-db';

import { slidingWindowVariants } from './topics/sliding-window-variants';
import { treePathVariants } from './topics/tree-path-variants';
import { binarySearchVariants } from './topics/binary-search-variants';
import { dpGridVariants } from './topics/dp-grid-variants';
import { graphCycleVariants } from './topics/graph-cycle-variants';

import { llTwoPtrVariants } from './topics/ll-twoptr-variants';
import { advancedStackVariants } from './topics/advanced-stack-variants';
import { bstPropertyVariants } from './topics/bst-property-variants';
import { twoHeapsVariants } from './topics/two-heaps-variants';
import { dpStringVariants } from './topics/dp-string-variants';

import { sdConsensus } from './topics/sd-consensus';
import { sdApiDesign } from './topics/sd-api-design';
import { sdCloudArch } from './topics/sd-cloud-arch';
import { sdBlobStorage } from './topics/sd-blob-storage';
import { sdGeoSpatial } from './topics/sd-geo-spatial';

import { exLocationBased } from './topics/ex-location-based';
import { exWebCrawler } from './topics/ex-web-crawler';
import { exLeaderboard } from './topics/ex-leaderboard';
import { exFlashSale } from './topics/ex-flash-sale';
import { exGoogleDocs } from './topics/ex-google-docs';

export type TopicContent = {
  title: string;
  description: string;
  example?: string;
  complexity?: {
    time: string;
    space: string;
  };
  tutorialSteps?: {
    title: string;
    content: string;
  }[];
  approaches?: {
    title: string;
    content: string;
    complexity: {
      time: string;
      space: string;
    };
  }[];
  pitfalls?: string[];
  concepts?: {
    name: string;
    details: string;
  }[];
  
  // System Design Specific Content
  diagram?: string; // Raw SVG string
  keyPoints?: {
    title: string;
    description: string;
  }[];
  comparisonTable?: {
    headers: string[]; // e.g. ['Feature', 'Vertical Scaling', 'Horizontal Scaling']
    rows: string[][]; // e.g. [['Cost', 'Hardware gets expensive', 'Cheap commodity hardware']]
  };
  videoUrl?: string;
};

export const topicContent: Record<string, TopicContent> = {
  'dsa_arrays': arraysStrings,
  'dsa_slidewin': slidingWindow,
  'dsa_twoptr': twoPointers,
  'dsa_prefix': prefixSum,
  'dsa_matrix': matrixManipulation,
  'dsa_kadane': kadaneAlgorithm,
  'dsa_ll_rev': linkedListReversalPatterns,
  'dsa_ll_cycle': cycleDetectionFloyd,
  'dsa_ll_merge': inPlaceMerge,
  'dsa_ll_rand': copyListWithRandomPointer,
  'dsa_mono': monotonicStackQueue,
  'dsa_lru': lruLfuCacheDesign,
  'dsa_circular': circularQueueImplementation,
  'dsa_bit_mask': bitmaskingBasics,
  'dsa_bit_tricks': bitTricksPowerSingle,
  'dsa_bit_subset': generatingSubsets,
  'dsa_trees_trav': recursiveIterativeTraversals,
  'dsa_trees_lca': lowestCommonAncestor,
  'dsa_trees_serialize': treeSerialization,
  'dsa_trees_view': treeSideViews,
  'dsa_tries': triesPrefixTree,
  'dsa_segtrees': segmentTrees,
  'dsa_fenwick': fenwickTreeBit,
  'dsa_dsu': disjointSetUnion,
  'dsa_heap_k': topKElements,
  'dsa_heap_median': medianInStream,
  'dsa_binsearch_classic': classicBinarySearch,
  'dsa_binsearch_ans': binarySearchOnAnswer,
  'dsa_intervals': intervalsPatterns,
  'dsa_greedy_patterns': greedyProofPatterns,
  'dsa_backtracking': backtrackingTemplate,
  'dsa_sorting_custom': customComparators,
  'dsa_quickselect': quickselectAlgorithm,
  'dsa_dp_knap': knapsackVariants,
  'dsa_dp_lcs': lcsLisPatterns,
  'dsa_dp_bitmask': bitmaskDp,
  'dsa_dp_tree': dpOnTrees,
  'dsa_dp_digit': digitDp,
  'dsa_graph_trav': graphBfsDfs,
  'dsa_topo': topologicalSortKahn,
  'dsa_graph_short': shortestPaths,
  'dsa_graph_scc': stronglyConnectedComponents,
  'dsa_graph_flow': networkFlowFordFulkerson,
  'sd_consistency_models': capTheorem,
  'sd_queues': messagingQueues,
  'sd_scale_vert': scalingTypes,
  'sd_lb_strat': loadBalancing,
  'sd_shard': sharding,
  'sd_redundancy': redundancy,
  'sd_circuit': circuitBreakers,
  'sd_sql_nosql': sqlVsNosql,
  'sd_cache_strat': cacheStrategies,
  'sd_cdn': cdnEdge,
  'sd_apigw_patterns': apiGatewayBff,
  'sd_cqrs': cqrsEventSourcing,
  'sd_throttling': rateLimiting,
  'sd_bulkhead': bulkhead,
  'sd_index_types': indexTypes,
  'sd_replication': replication,
  'sd_kafka': kafka,
  'sd_protocols': protocols,
  'sd_service_mesh': serviceMesh,
  'sd_outbox': outboxPattern,
  'sd_sagas': sagas,
  'sd_telemetry': telemetry,
  'sd_auth_security': authSecurity,
  'sd_zero_trust': zeroTrust,
  'sd_consistent_hashing': consistentHashing,
  'sd_distributed_locks': distributedLocks,
  'sd_vector_db': vectorDb,
  'ex_whatsapp': whatsapp,
  'ex_netflix': netflix,
  'ex_uber': uber,
  'ex_ticketmaster': ticketmaster,
  'ex_tinyurl': tinyurl,
  'ex_discord': discord,
  'ex_twitter': twitter,
  'ex_instagram': instagram,
  'ex_youtube': youtube,
  'ex_amazon': amazon,
  'ex_airbnb': airbnb,
  'ex_pastebin': pastebin,
  'ex_rate_limiter': rateLimiter,
  'ex_google_drive': googleDrive,
  'ex_typeahead': typeahead,
  'dsa_slidewin_variants': slidingWindowVariants,
  'dsa_tree_path_variants': treePathVariants,
  'dsa_bs_variants': binarySearchVariants,
  'dsa_dp_grid_variants': dpGridVariants,
  'dsa_graph_cycle_variants': graphCycleVariants,
  'dsa_ll_twoptr_variants': llTwoPtrVariants,
  'dsa_stacks_variants': advancedStackVariants,
  'dsa_bst_variants': bstPropertyVariants,
  'dsa_heap_variants': twoHeapsVariants,
  'dsa_dp_string_variants': dpStringVariants,

  'sd_consensus': sdConsensus,
  'sd_api_design': sdApiDesign,
  'sd_cloud_arch': sdCloudArch,
  'sd_blob_storage': sdBlobStorage,
  'sd_geo_spatial': sdGeoSpatial,

  'ex_location_based': exLocationBased,
  'ex_web_crawler': exWebCrawler,
  'ex_leaderboard': exLeaderboard,
  'ex_flash_sale': exFlashSale,
  'ex_google_docs': exGoogleDocs,
};
