# LeetCode Practice Repository

A comprehensive TypeScript-based repository for practicing LeetCode problems, organized by algorithmic categories and difficulty levels.

## 📁 Repository Structure

```
leet-codes-practice/
├── src/                    # Main LeetCode solutions (individual problems)
├── interview_questions/    # Additional interview practice problems
├── to_be_solved/          # Organized practice problems by category
│   ├── arrays/
│   │   ├── easy/          # Two Sum, Remove Duplicates, etc.
│   │   ├── medium/        # 3Sum, Maximum Product Subarray, etc.
│   │   └── hard/          # Median of Two Sorted Arrays, etc.
│   ├── dynamic-programming/
│   │   ├── easy/          # Fibonacci, Climbing Stairs, etc.
│   │   ├── medium/        # Coin Change, House Robber, etc.
│   │   └── hard/          # Edit Distance, etc.
│   ├── graphs/
│   │   ├── easy/          # Find the Town Judge, etc.
│   │   ├── medium/        # Number of Islands, Course Schedule, etc.
│   │   └── hard/          # Word Ladder, etc.
│   └── ... (18 categories total, each with easy/medium/hard)
├── CLAUDE.md              # Development guidelines
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- TypeScript
- ts-node

### Installation
```bash
npm install
```

### Running Solutions
```bash
# Run any solution directly
npx ts-node src/37-sudoku-solver.ts

# Run practice problems by category/difficulty
npx ts-node to_be_solved/arrays/easy/26-remove-duplicates-from-sorted-array.ts
npx ts-node to_be_solved/dynamic-programming/medium/322-coin-change.ts
```

### Development
```bash
# Compile TypeScript
npx tsc

# Run linting
npx eslint src/
npx eslint to_be_solved/
```

## 📚 Practice Problem Categories

### 🔢 Data Structures
- **Arrays** - Manipulation, traversal, two pointers
- **Linked Lists** - Traversal, reversal, merging
- **Trees** - Binary trees, BST, traversals
- **Graphs** - BFS, DFS, shortest path
- **Stack/Queue** - LIFO/FIFO operations
- **Heap** - Priority queues, k-th elements
- **Hash Table** - Lookups, frequency counting

### 🧮 Algorithms  
- **Dynamic Programming** - Memoization, tabulation, optimization
- **Backtracking** - Recursive exploration, constraint satisfaction
- **Binary Search** - Search variations, optimization problems
- **Sorting** - Custom comparisons, merge operations
- **Greedy** - Local optimization strategies
- **Two Pointers** - Array/string processing techniques
- **Sliding Window** - Subarray/substring problems

### 🔧 Advanced Topics
- **Bit Manipulation** - Bitwise operations, optimization tricks
- **Math** - Number theory, computational problems
- **Design** - Data structure implementation, system design

## 🎯 Difficulty Levels

### 🟢 Easy (Fundamentals)
- Basic data structure operations
- Simple algorithms and patterns
- Foundation building problems

### 🟡 Medium (Interview Standard)
- Standard interview questions
- Multiple concept combinations
- Optimization challenges

### 🔴 Hard (Advanced)
- Complex algorithmic challenges
- Multi-step problem solving
- Advanced optimization techniques

## 📖 Learning Path

### 🚀 Beginner Track
1. Start with **Arrays/Easy** - Master basic operations
2. Practice **Strings/Easy** - String manipulation basics
3. Learn **Hash Table/Easy** - Frequency and lookup patterns

### 💼 Interview Preparation
1. **Arrays** → **Two Pointers** → **Sliding Window**
2. **Trees** → **Graphs** → **Dynamic Programming**
3. **Backtracking** → **Binary Search** → **Greedy**

### 🏆 Advanced Mastery
1. Complex **Dynamic Programming** patterns
2. Advanced **Graph** algorithms
3. **System Design** problems

## 🛠️ Problem File Structure

Each problem file includes:
- 📝 Problem description with LeetCode number and difficulty
- 💻 Clean TypeScript implementation with proper typing
- 🧪 Multiple test cases with expected outputs
- 🔄 Alternative solutions where applicable

Example:
```typescript
// LeetCode 1: Two Sum (Easy)
// Given an array of integers nums and an integer target...

function twoSum(nums: number[], target: number): number[] {
    // Implementation here
}

// Test cases
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
```

## 📊 Progress Tracking

Track your progress through different categories:
- ✅ Completed problems
- 🔄 Work in progress  
- 📝 Notes and learnings
- ⭐ Favorite solutions

## 🤝 Contributing

1. Follow the established file naming convention
2. Include comprehensive test cases
3. Add clear problem descriptions
4. Run linting before committing
5. Update documentation as needed

## 📚 Resources

- [LeetCode Official](https://leetcode.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Algorithm Visualization](https://visualgo.net/)
- [Big O Cheat Sheet](https://www.bigocheatsheet.com/)

## 📄 License

This project is for educational purposes and personal practice.
