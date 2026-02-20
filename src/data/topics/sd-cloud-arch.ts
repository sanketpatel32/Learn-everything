import { TopicContent } from '../topicContent';

export const sdCloudArch: TopicContent = {
  title: 'Compute Models: Serverless vs Containers',
  description: 'Explores the trade-offs between deploying applications on Virtual Machines, Docker Containers, and Serverless Functions.',
  concepts: [
    {
      name: 'Virtual Machines (IaaS)',
      details: 'Emulates full hardware. You manage the OS, runtime, and application. Highest control, highest maintenance overhead.'
    },
    {
      name: 'Containers (CaaS)',
      details: 'Packages application code with its dependencies but shares the host OS kernel. Managed by orchestration tools like Kubernetes.'
    },
    {
      name: 'Serverless (FaaS)',
      details: 'Abstracts away servers entirely. Code runs in ephemeral containers triggered by events. Scales automatically to zero.'
    }
  ],
  comparisonTable: {
    headers: ['Factor', 'VMs', 'Containers', 'Serverless'],
    rows: [
      ['Control', 'High (OS level)', 'Medium (Environment)', 'Low (Code only)'],
      ['Scaling Speed', 'Minutes', 'Seconds', 'Milliseconds'],
      ['Cost Model', 'Pay for allocation', 'Pay for allocation/usage', 'Pay per invocation'],
      ['Cold Starts', 'N/A', 'Rare', 'Common Issue']
    ]
  },
  approaches: [
    {
      title: 'Kubernetes Orchestration',
      content: 'Using K8s to manage container lifecycle, scaling, and self-healing across a cluster of nodes.',
      complexity: { time: '-', space: '-' }
    }
  ],
  pitfalls: [
    'Assuming Serverless is mathematically cheaper; high-throughput sustained workloads are often significantly more expensive on FaaS compared to persistent containers.',
    'Migrating legacy monoliths directly into Lambda functions, hitting execution time limits (e.g., 15 mins) and memory caps.',
    'Overcomplicating simple deployments by jumping straight to Kubernetes when a managed PaaS (like Heroku or Render) suffices.'
  ]
};
