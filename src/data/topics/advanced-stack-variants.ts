import { TopicContent } from '../topicContent';

export const advancedStackVariants: TopicContent = {
  title: 'Advanced Stack Patterns',
  description: 'Explores advanced stack use cases like basic calculators, expression parsing, and decode string.',
  complexity: {
    time: 'O(N)',
    space: 'O(N)'
  },
  concepts: [
    {
      name: 'Expression Evaluation',
      details: 'Using a stack to delay computation of inner brackets or lower precedence operations until higher precedence ones define the right operand.'
    },
    {
      name: 'String Decoding',
      details: 'When dealing with nested patterns like 3[a2[c]], stacks help pause current sequences while inner contexts are resolved.'
    }
  ],
  approaches: [
    {
      title: 'Calculator Parse Stack',
      content: 'Maintain a running number and an operator sign (+, -, *, /). Push evaluated blocks to stack. Sum stack contents at the end.',
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      }
    },
    {
      title: 'Multi-Context Stack',
      content: 'For nested strings, use one stack for multiplying factors (numbers) and another for previously accumulated substrings.',
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      }
    }
  ],
  pitfalls: [
    'Failing to handle multi-digit numbers properly by evaluating char by char.',
    'Not flushing the last parsed number/operator when the string iteration ends.',
    'Mismanaging the order in which items are popped and combined (especially for string combinations).'
  ]
};
