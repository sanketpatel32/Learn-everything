import { TopicContent } from '../topicContent';

export const sdApiDesign: TopicContent = {
  title: 'API Paradigms: REST vs GraphQL vs gRPC',
  description: 'A comparison of the distinct protocols and architectural styles used for building networked applications and services.',
  concepts: [
    {
      name: 'REST (Representational State Transfer)',
      details: 'Resource-centric architecture using standard HTTP methods (GET, POST, PUT, DELETE). highly cacheable and widely adopted.'
    },
    {
      name: 'GraphQL',
      details: 'Query language for APIs that allows clients to request exactly the data they need, no more, no less. Solves over-fetching and under-fetching.'
    },
    {
      name: 'gRPC',
      details: 'High-performance RPC framework using HTTP/2 and Protocol Buffers. Excellent for microservice-to-microservice communication.'
    }
  ],
  comparisonTable: {
    headers: ['Feature', 'REST', 'GraphQL', 'gRPC'],
    rows: [
      ['Data Format', 'JSON / XML', 'JSON', 'Protocol Buffers (Binary)'],
      ['Transport', 'HTTP/1.1 or HTTP/2', 'HTTP/1.1 or HTTP/2', 'HTTP/2 (Required)'],
      ['Use Case', 'Public APIs, CRUD', 'Complex UI, Mobile Apps', 'Internal Microservices'],
      ['Caching', 'Built-in (HTTP)', 'Complex (Client-side)', 'Difficult']
    ]
  },
  pitfalls: [
    'Using gRPC for public-facing web clients without realizing browser support for HTTP/2 trailers is extremely limited (requiring gRPC-Web proxy).',
    'Exposing overly complex GraphQL schemas that allow clients to write computationally expensive queries, bringing down the database.',
    'Designing REST APIs as RPC-style verbs (e.g., POST /createUser) instead of resource nouns (POST /users).'
  ]
};
