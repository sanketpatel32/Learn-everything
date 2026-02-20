import { TopicContent } from '../topicContent';

export const slidingWindow: TopicContent = {
  title: 'Sliding Window Pattern',
  description: 'An advanced algorithmic technique used to find optimal subarrays or substrings. It fundamentally converts nested loops (O(N²)) into a single linear pass (O(N)) by maintaining a moving "window" of elements over the data.',
  example: 'Given an array of positive integers [2,3,1,2,4,3] and a target sum 7, find the minimal length of a contiguous subarray whose sum is >= target. The answer is 2 (subarray [4,3]).',
  approaches: [
    {
      title: 'Brute Force (Nested Loops)',
      content: 'The brute force approach literally tests every single possible subarray to see if it meets our criteria (e.g., sum >= 7).\n\nStep-by-step mechanics:\n1. The outer loop selects the starting element (index `left` from `0` to `n-1`).\n2. The inner loop selects the ending element (index `right` from `left` to `n-1`).\n3. For each pair of `left` and `right`, we calculate the sum of the elements in between.\n\n```python\nfunction bruteForce(arr, targetSum):\n    minLen = INT_MAX\n    for left from 0 to arr.length - 1:\n        sum = 0\n        for right from left to arr.length - 1:\n            sum += arr[right]\n            if sum >= targetSum:\n                minLen = min(minLen, right - left + 1)\n                break // We found shortest starting at \'left\'\n    return minLen\n```\n\nWhy is this bad?\nNotice that if we test `[2, 3, 1, 2]`, we passed over the subset `[3, 1]`. When we move our starting index to 1, we compute the sum for `[3, 1]` all over again. This redundant mathematical recalculation is what forces this algorithm into O(N²) time complexity. In an array of size 100,000, that is 10 billion operations, completely crashing the system.',
      complexity: {
        time: 'O(N²)',
        space: 'O(1)'
      }
    },
    {
      title: 'Optimal Approach (Sliding Window)',
      content: 'The core philosophy of Sliding Window is preserving work. Instead of recalculating overlaps, we maintain a running state (like a running sum) in a "window" of space, expanding and contracting its borders (the pointers).\n\nStep-by-step mechanics:\n1. Establish two pointers, `left` and `right`, both starting at index 0. Initialize `windowSum = 0`.\n2. Expand the window to the right by moving the `right` pointer one step at a time, eagerly adding the new element `arr[right]` to `windowSum`.\n3. Wait until the window becomes "valid" (e.g., `windowSum >= 7`).\n4. Once valid, record the current window dimension (e.g., `right - left + 1`).\n5. Now, instead of resetting, attempt to SHRINK the window from the left to see if we can maintain validity in a smaller footprint. Subtract `arr[left]` from `windowSum` and slide the `left` pointer forward.\n6. Repeat step 5 until the window is invalid again (`windowSum < 7`), then resume step 2.\n\n```python\nfunction optimalSlidingWindow(arr, targetSum):\n    minLen = INT_MAX\n    sum = 0, left = 0\n    \n    for right from 0 to arr.length - 1:\n        sum += arr[right]\n        \n        while sum >= targetSum:\n            minLen = min(minLen, right - left + 1)\n            sum -= arr[left]\n            left += 1\n            \n    return minLen\n```\n\nWhy does this work so gracefully?\nBecause both the `left` and `right` pointers strictly move FORWARD from index 0 to n. They never go backwards. Even though there is a while-loop inside the for-loop, each index is added to the sum exactly ONE time, and subtracted from the sum exactly ONE time. `2N` operations resolves to O(N) time complexity.',
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      }
    }
  ],
  pitfalls: [
    'Off-by-one errors when initializing or moving the left/right pointers.',
    'Forgetting to remove or decrement the "old" value from your state (sum, hashmap) when the left pointer moves forward.',
    'Using Sliding Window on arrays containing negative numbers when looking for a target sum (the window logic breaks because expanding the window might decrease the sum, destroying the monotonicity requirement).'
  ],
  concepts: [
    {
      name: 'Monotonicity Requirement',
      details: 'For dynamic sliding window to work, adding elements must strictly move the condition in one direction, and removing elements must strictly move it in the reverse direction. (e.g., adding positive numbers always increases the sum).'
    },
    {
      name: 'State Tracking',
      details: 'The hardest part of sliding window is identifying what state to track inside the window. It could be a running sum, a count of distinct characters, a hash map of frequencies, or even a monotonic queue.'
    }
  ]
};
