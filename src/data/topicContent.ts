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
import { binarySearchOnAnswer } from './topics/binary-search-on-answer';
import { customComparators } from './topics/custom-comparators';
import { quickselectAlgorithm } from './topics/quickselect-algorithm';
import { knapsackVariants } from './topics/knapsack-variants';
import { lcsLisPatterns } from './topics/lcs-lis-patterns';
import { bitmaskDp } from './topics/bitmask-dp';
import { dpOnTrees } from './topics/dp-on-trees';
import { graphBfsDfs } from './topics/graph-bfs-dfs';
import { topologicalSortKahn } from './topics/topological-sort-kahn';
import { shortestPaths } from './topics/shortest-paths';
import { stronglyConnectedComponents } from './topics/strongly-connected-components';
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
  'dsa_binsearch_ans': binarySearchOnAnswer,
  'dsa_sorting_custom': customComparators,
  'dsa_quickselect': quickselectAlgorithm,
  'dsa_dp_knap': knapsackVariants,
  'dsa_dp_lcs': lcsLisPatterns,
  'dsa_dp_bitmask': bitmaskDp,
  'dsa_dp_tree': dpOnTrees,
  'dsa_graph_trav': graphBfsDfs,
  'dsa_topo': topologicalSortKahn,
  'dsa_graph_short': shortestPaths,
  'dsa_graph_scc': stronglyConnectedComponents,
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
  'sd_index_types': indexTypes
};
