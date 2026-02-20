import { TopicContent } from '../topicContent';

export const sdConsensus: TopicContent = {
  title: 'Distributed Consensus (Paxos/Raft)',
  description: 'Explores how distributed nodes agree on a single value or state despite network failures or node crashes.',
  concepts: [
    {
      name: 'Raft',
      details: 'A leader-based consensus algorithm designed for understandability. It uses leader election and log replication to manage replicated logs.'
    },
    {
      name: 'Paxos',
      details: 'A foundational, leaderless consensus protocol that is highly fault-tolerant but famously difficult to understand and implement correctly.'
    },
    {
      name: 'Split Brain',
      details: 'A scenario where a cluster divides into multiple sub-clusters, each believing it is the authoritative primary, leading to data corruption without consensus (quorum).'
    }
  ],
  approaches: [
    {
      title: 'Quorum (N/2 + 1)',
      content: 'Consensus relies on a majority vote. If a cluster has 5 nodes, 3 must agree to commit a transaction. This prevents split-brain by ensuring only one partition can have a majority.',
      complexity: { time: 'O(1)', space: 'O(1)' }
    },
    {
      title: 'Leader Election',
      content: 'In Raft, followers expect periodic heartbeats. If a heartbeat times out, a follower transitions to a candidate and requests votes to become the new leader.',
      complexity: { time: 'O(1)', space: 'O(1)' }
    }
  ],
  pitfalls: [
    'Configuring a cluster with an even number of nodes, increasing the likelihood of election ties or split-brain problems (always use an odd number).',
    'Failing to handle network partitions gracefully, resulting in continuous, disruptive leader election cycles.',
    'Underestimating the latency overhead of achieving consensus synchronous replication.'
  ]
};
