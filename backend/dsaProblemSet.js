const dsaProblems = [
  // Arrays & Hashing
  { problemId: 'two-sum', title: 'Two Sum', description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.', topic: 'Arrays & Hashing', difficulty: 'Easy' },
  { problemId: 'best-time-to-buy-and-sell-stock', title: 'Best Time to Buy and Sell Stock', description: 'You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.', topic: 'Arrays & Hashing', difficulty: 'Easy' },
  { problemId: 'contains-duplicate', title: 'Contains Duplicate', description: 'Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.', topic: 'Arrays & Hashing', difficulty: 'Easy' },
  { problemId: 'product-of-array-except-self', title: 'Product of Array Except Self', description: 'Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.', topic: 'Arrays & Hashing', difficulty: 'Medium' },
  { problemId: 'maximum-subarray', title: 'Maximum Subarray', description: 'Given an integer array `nums`, find the subarray with the largest sum, and return its sum.', topic: 'Arrays & Hashing', difficulty: 'Medium' },
  { problemId: 'maximum-product-subarray', title: 'Maximum Product Subarray', description: 'Given an integer array `nums`, find a subarray that has the largest product, and return the product.', topic: 'Arrays & Hashing', difficulty: 'Medium' },

  // Two Pointers
  { problemId: 'valid-palindrome', title: 'Valid Palindrome', description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.', topic: 'Two Pointers', difficulty: 'Easy' },
  { problemId: '3sum', title: '3Sum', description: 'Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.', topic: 'Two Pointers', difficulty: 'Medium' },
  { problemId: 'container-with-most-water', title: 'Container With Most Water', description: 'You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`th line are `(i, 0)` and `(i, height[i])`. Find two lines that together with the x-axis form a container that contains the most water.', topic: 'Two Pointers', difficulty: 'Medium' },

  // Sliding Window
  { problemId: 'longest-substring-without-repeating-characters', title: 'Longest Substring Without Repeating Characters', description: 'Given a string `s`, find the length of the longest substring without repeating characters.', topic: 'Sliding Window', difficulty: 'Medium' },
  { problemId: 'longest-repeating-character-replacement', title: 'Longest Repeating Character Replacement', description: 'You are given a string `s` and an integer `k`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most `k` times.', topic: 'Sliding Window', difficulty: 'Medium' },
  { problemId: 'minimum-window-substring', title: 'Minimum Window Substring', description: 'Given two strings `s` and `t` of lengths `m` and `n` respectively, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window.', topic: 'Sliding Window', difficulty: 'Hard' },

  // Stack
  { problemId: 'valid-parentheses', title: 'Valid Parentheses', description: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.', topic: 'Stack', difficulty: 'Easy' },

  // Binary Search
  { problemId: 'find-minimum-in-rotated-sorted-array', title: 'Find Minimum in Rotated Sorted Array', description: 'Given the sorted rotated array `nums` of unique elements, return the minimum element of this array. You must write an algorithm that runs in O(log n) time.', topic: 'Binary Search', difficulty: 'Medium' },
  { problemId: 'search-in-rotated-sorted-array', title: 'Search in Rotated Sorted Array', description: 'Given the array `nums` after the possible rotation and an integer `target`, return the index of the `target` if it is in `nums`, or -1 if it is not. You must write an algorithm with O(log n) runtime complexity.', topic: 'Binary Search', difficulty: 'Medium' },
  
  // Linked List
  { problemId: 'reverse-linked-list', title: 'Reverse Linked List', description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.', topic: 'Linked List', difficulty: 'Easy' },
  { problemId: 'linked-list-cycle', title: 'Linked List Cycle', description: 'Given `head`, the head of a linked list, determine if the linked list has a cycle in it.', topic: 'Linked List', difficulty: 'Easy' },
  { problemId: 'merge-two-sorted-lists', title: 'Merge Two Sorted Lists', description: 'You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists into one sorted list.', topic: 'Linked List', difficulty: 'Easy' },
  { problemId: 'merge-k-sorted-lists', title: 'Merge k Sorted Lists', description: 'You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order. Merge all the linked lists into one sorted linked list and return it.', topic: 'Linked List', difficulty: 'Hard' },
  { problemId: 'remove-nth-node-from-end-of-list', title: 'Remove Nth Node From End of List', description: 'Given the head of a linked list, remove the nth node from the end of the list and return its head.', topic: 'Linked List', difficulty: 'Medium' },
  { problemId: 'reorder-list', title: 'Reorder List', description: 'You are given the head of a singly linked list. The list can be represented as: L0 → L1 → … → Ln - 1 → Ln. Reorder the list to be on the following form: L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …', topic: 'Linked List', difficulty: 'Medium' },

  // Trees
  { problemId: 'maximum-depth-of-binary-tree', title: 'Maximum Depth of Binary Tree', description: 'Given the `root` of a binary tree, return its maximum depth.', topic: 'Trees', difficulty: 'Easy' },
  { problemId: 'same-tree', title: 'Same Tree', description: 'Given the roots of two binary trees `p` and `q`, write a function to check if they are the same or not.', topic: 'Trees', difficulty: 'Easy' },
  { problemId: 'invert-binary-tree', title: 'Invert Binary Tree', description: 'Given the root of a binary tree, invert the tree, and return its root.', topic: 'Trees', difficulty: 'Easy' },
  { problemId: 'binary-tree-maximum-path-sum', title: 'Binary Tree Maximum Path Sum', description: 'A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. Given the root of a binary tree, return the maximum path sum of any non-empty path.', topic: 'Trees', difficulty: 'Hard' },
  { problemId: 'binary-tree-level-order-traversal', title: 'Binary Tree Level Order Traversal', description: 'Given the root of a binary tree, return the level order traversal of its nodes\' values.', topic: 'Trees', difficulty: 'Medium' },
  { problemId: 'serialize-and-deserialize-binary-tree', title: 'Serialize and Deserialize Binary Tree', description: 'Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work.', topic: 'Trees', difficulty: 'Hard' },
  { problemId: 'subtree-of-another-tree', title: 'Subtree of Another Tree', description: 'Given the roots of two binary trees `root` and `subRoot`, return `true` if there is a subtree of `root` with the same structure and node values of `subRoot` and `false` otherwise.', topic: 'Trees', difficulty: 'Easy' },
  { problemId: 'construct-binary-tree-from-preorder-and-inorder-traversal', title: 'Construct Binary Tree from Preorder and Inorder Traversal', description: 'Given two integer arrays `preorder` and `inorder` where `preorder` is the preorder traversal of a binary tree and `inorder` is the inorder traversal of the same tree, construct and return the binary tree.', topic: 'Trees', difficulty: 'Medium' },
  { problemId: 'validate-binary-search-tree', title: 'Validate Binary Search Tree', description: 'Given the root of a binary tree, determine if it is a valid binary search tree (BST).', topic: 'Trees', difficulty: 'Medium' },
  { problemId: 'kth-smallest-element-in-a-bst', title: 'Kth Smallest Element in a BST', description: 'Given the root of a binary search tree and an integer `k`, return the `k`th smallest value (1-indexed) of all the values of the nodes in the tree.', topic: 'Trees', difficulty: 'Medium' },
  { problemId: 'lowest-common-ancestor-of-a-binary-search-tree', title: 'Lowest Common Ancestor of a Binary Search Tree', description: 'Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.', topic: 'Trees', difficulty: 'Medium' },
  { problemId: 'implement-trie-prefix-tree', title: 'Implement Trie (Prefix Tree)', description: 'A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings.', topic: 'Trees', difficulty: 'Medium' },
  
  // Heap
  { problemId: 'merge-k-sorted-lists-heap', title: 'Merge k Sorted Lists', description: 'You are given an array of k linked-lists `lists`, each linked-list is sorted in ascending order. Merge all the linked lists into one sorted linked list and return it.', topic: 'Heap', difficulty: 'Hard'},
  { problemId: 'top-k-frequent-elements', title: 'Top K Frequent Elements', description: 'Given an integer array `nums` and an integer `k`, return the `k` most frequent elements.', topic: 'Heap', difficulty: 'Medium' },
  { problemId: 'find-median-from-data-stream', title: 'Find Median from Data Stream', description: 'The median is the middle value in an ordered integer list. Implement the MedianFinder class.', topic: 'Heap', difficulty: 'Hard' },

  // Graph
  { problemId: 'clone-graph', title: 'Clone Graph', description: 'Given a reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph.', topic: 'Graph', difficulty: 'Medium'},
  { problemId: 'course-schedule', title: 'Course Schedule', description: 'There are a total of `numCourses` courses you have to take, labeled from 0 to `numCourses - 1`. You are given an array of prerequisites where `prerequisites[i] = [ai, bi]` indicates that you must take course `bi` first if you want to take course `ai`.', topic: 'Graph', difficulty: 'Medium'},
  { problemId: 'number-of-islands-graph', title: 'Number of Islands', description: 'Given an m x n 2D binary grid which represents a map of \'1\'s (land) and \'0\'s (water), return the number of islands.', topic: 'Graph', difficulty: 'Medium'},
  { problemId: 'pacific-atlantic-water-flow', title: 'Pacific Atlantic Water Flow', description: 'There is an `m x n` rectangular island that borders both the Pacific Ocean and the Atlantic Ocean. Return a 2D list of grid coordinates where rainwater can flow from cell to both oceans.', topic: 'Graph', difficulty: 'Medium'},
  { problemId: 'longest-consecutive-sequence', title: 'Longest Consecutive Sequence', description: 'Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence.', topic: 'Graph', difficulty: 'Medium'},
  { problemId: 'graph-valid-tree', title: 'Graph Valid Tree', description: 'Given `n` nodes labeled from 0 to `n-1` and a list of undirected edges, write a function to check whether these edges make up a valid tree.', topic: 'Graph', difficulty: 'Medium'},

  // Dynamic Programming
  { problemId: 'climbing-stairs', title: 'Climbing Stairs', description: 'You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?', topic: 'Dynamic Programming', difficulty: 'Easy'},
  { problemId: 'coin-change', title: 'Coin Change', description: 'You are given an integer array `coins` of different denominations and an integer `amount`. Return the fewest number of coins that you need to make up that amount.', topic: 'Dynamic Programming', difficulty: 'Medium'},
  { problemId: 'longest-increasing-subsequence', title: 'Longest Increasing Subsequence', description: 'Given an integer array `nums`, return the length of the longest strictly increasing subsequence.', topic: 'Dynamic Programming', difficulty: 'Medium'},
  { problemId: 'longest-common-subsequence', title: 'Longest Common Subsequence', description: 'Given two strings `text1` and `text2`, return the length of their longest common subsequence.', topic: 'Dynamic Programming', difficulty: 'Medium'},
  { problemId: 'word-break', title: 'Word Break', description: 'Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.', topic: 'Dynamic Programming', difficulty: 'Medium'},
  { problemId: 'combination-sum', title: 'Combination Sum', description: 'Given an array of distinct integer `nums` and a target integer `target`, return the number of possible combinations that add up to the target.', topic: 'Dynamic Programming', difficulty: 'Medium'},
  { problemId: 'house-robber', title: 'House Robber', description: 'Given an integer array `nums` representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.', topic: 'Dynamic Programming', difficulty: 'Medium'},
  { problemId: 'house-robber-ii', title: 'House Robber II', description: 'All houses at this place are arranged in a circle. Given an integer array `nums` representing the amount of money of each house, return the maximum amount of money you can rob.', topic: 'Dynamic Programming', difficulty: 'Medium'},
  { problemId: 'decode-ways', title: 'Decode Ways', description: 'A message containing letters from A-Z can be encoded into numbers. Given a string `s` containing only digits, return the number of ways to decode it.', topic: 'Dynamic Programming', difficulty: 'Medium'},
  { problemId: 'unique-paths', title: 'Unique Paths', description: 'There is a robot on an m x n grid. The robot can only move either down or right at any point in time. Return the number of possible unique paths to reach the bottom-right corner.', topic: 'Dynamic Programming', difficulty: 'Medium'},
  { problemId: 'jump-game', title: 'Jump Game', description: 'You are given an integer array `nums`. You are initially positioned at the array\'s first index, and each element in the array represents your maximum jump length at that position. Return `true` if you can reach the last index.', topic: 'Dynamic Programming', difficulty: 'Medium'},

  // Interval
  { problemId: 'insert-interval', title: 'Insert Interval', description: 'You are given an array of non-overlapping intervals `intervals` where `intervals[i] = [starti, endi]` represent the start and the end of the `i`th interval and `intervals` is sorted in ascending order by `starti`.', topic: 'Interval', difficulty: 'Medium'},
  { problemId: 'merge-intervals', title: 'Merge Intervals', description: 'Given an array of `intervals` where `intervals[i] = [starti, endi]`, merge all overlapping intervals.', topic: 'Interval', difficulty: 'Medium'},
  { problemId: 'non-overlapping-intervals', title: 'Non-overlapping Intervals', description: 'Given an array of intervals `intervals`, return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.', topic: 'Interval', difficulty: 'Medium'},
  { problemId: 'meeting-rooms-ii', title: 'Meeting Rooms II', description: 'Given an array of meeting time intervals `intervals` where `intervals[i] = [start, end]`, return the minimum number of conference rooms required.', topic: 'Interval', difficulty: 'Medium'},
];

// This makes the array available to other files
module.exports = dsaProblems;