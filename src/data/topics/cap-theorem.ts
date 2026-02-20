import { TopicContent } from '../topicContent';

export const capTheorem: TopicContent = {
  title: 'CAP Theorem',
  description: 'In a distributed system, you can only pick two: Consistency, Availability, or Partition Tolerance.',
  tutorialSteps: [
    {
      title: 'The Basic Rule',
      content: 'Imagine two servers. If the wire between them snaps (a partition), you have to choose: keep working (Availability) but risk different data, or stop (Consistency) until the wire is fixed.'
    },
    {
      title: 'Real World Choice',
      content: 'Partition Tolerance is mandatory because network failures ARE going to happen. So the true choice is between Consistency (C) and Availability (A) during a failure.'
    }
  ],
  pitfalls: [
    'Thinking you can ignore Partition Tolerance. In distributed systems, you cannot.',
    'Over-optimizing for Consistency when your users just want the app to stay online.'
  ],
  concepts: [
    {
      name: 'Consistency (C)',
      details: 'Every user sees the exact same data at the exact same time.'
    },
    {
      name: 'Availability (A)',
      details: 'The system responds to every request, even if it might return slightly older data.'
    },
    {
      name: 'Partition Tolerance (P)',
      details: 'The system continues to work even if parts of the network go down.'
    }
  ],
  example: 'Bank balances require Consistency (CP), while a social media newsfeed prefers Availability (AP).'
};
