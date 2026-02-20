import { TopicContent } from '../topicContent';

export const messagingQueues: TopicContent = {
  title: 'Messaging & Queues',
  description: 'Asynchronous communication where one service drops a message and moves on without waiting.',
  tutorialSteps: [
    {
      title: 'The Post Office Analogy',
      content: 'Think of a queue like a mailbox. Service A drops the letter. It doesn\'t care when Service B picks it up. This prevents Service A from hanging if B is slow.'
    },
    {
      title: 'Pressure Relief',
      content: 'During a traffic spike, the queue holds all the work. The processing service handles them one-by-one at its own speed, preventing a crash.'
    }
  ],
  pitfalls: [
    'Assuming messages always arrive in the exact same order they were sent.',
    'Processing the same message twice (consumers must be "idempotent" or smart enough to know they already did it).'
  ],
  concepts: [
    {
      name: 'Pub / Sub',
      details: 'One message is delivered to many different services at once (Publisher/Subscriber).'
    },
    {
      name: 'DLQ (Dead Letter Queue)',
      details: 'A "junk folder" for messages that failed to be processed multiple times, so they don\'t block the whole system.'
    }
  ],
  example: 'When you order food, the app sends a message to the kitchen while you immediately see an "Order Confirmed" screen.'
};
