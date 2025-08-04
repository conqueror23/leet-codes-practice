# LeetCode Practice Repository

TypeScript solutions for LeetCode problems, organized by algorithm type and difficulty.

## Quick Start

```bash
# Install dependencies
npm install

# Run any problem
npx ts-node to_be_solved/arrays/easy/1-two-sum.ts

# Check code quality
npx eslint to_be_solved/
```

## Structure

```
leet-codes-practice/
├── src/                    # Individual solutions
├── to_be_solved/          # Organized by category (57 problems)
│   ├── arrays/            # Array problems (6 problems)
│   ├── strings/           # String problems (3 problems)
│   ├── trees/             # Tree problems (3 problems)
│   └── ... (15 more categories)
└── interview_questions/   # Additional practice
```

## Categories (18 total)

### Data Structures
- **Arrays** (6) - Two pointers, sorting, searching
- **Strings** (3) - Pattern matching, manipulation
- **Linked Lists** (3) - Traversal, reversal, merging
- **Trees** (3) - Binary trees, traversals
- **Graphs** (3) - BFS, DFS, shortest paths
- **Stack/Queue** (3) - LIFO/FIFO operations
- **Heap** (3) - Priority queues, k-th elements
- **Hash Table** (3) - Lookups, frequency counting

### Algorithms
- **Dynamic Programming** (3) - Optimization, memoization
- **Backtracking** (3) - Recursive exploration
- **Binary Search** (3) - Search variations
- **Sorting** (3) - Custom comparisons
- **Greedy** (3) - Local optimization
- **Two Pointers** (3) - Array processing
- **Sliding Window** (3) - Subarray problems

### Advanced
- **Bit Manipulation** (3) - Bitwise operations
- **Math** (3) - Number theory
- **Design** (3) - Data structure implementation

## Difficulty Levels

- **Easy** (18 problems) - Basic concepts, single algorithms
- **Medium** (19 problems) - Multiple concepts, optimization
- **Hard** (20 problems) - Complex algorithms, edge cases

## Learning Path

### Beginner (Start here)
1. **Arrays/Easy** → **Hash Table/Easy** → **Strings/Easy**
2. Master basic operations before moving to medium

### Interview Prep
1. **Arrays** → **Two Pointers** → **Sliding Window**
2. **Trees** → **Graphs** → **Dynamic Programming**
3. Practice 2-3 problems daily from different categories

### Advanced Practice
1. **Hard** problems from each category
2. **System Design** problems
3. Time complexity optimization

## Problem Format

Each file contains:
- Problem description with LeetCode number
- Clean TypeScript implementation
- Test cases with expected outputs
- Time/space complexity notes

```typescript
/**
 * 1. Two Sum (Easy)
 * Given array nums and target, return indices of two numbers that add up to target.
 */
function twoSum(nums: number[], target: number): number[] {
    // Implementation
}

// Test cases
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
```

## Commands

```bash
# Run specific problem
npx ts-node to_be_solved/arrays/easy/1-two-sum.ts

# Compile all TypeScript
npx tsc

# Lint code
npx eslint src/ to_be_solved/

# Run from any category
npx ts-node to_be_solved/[category]/[difficulty]/[problem-name].ts
```

## Progress Tracking

**Current Status: 100% Complete**
- ✅ All 18 categories have easy/medium/hard problems
- ✅ 57 total problems covering all major algorithms
- ✅ Each problem includes comprehensive test cases

## Tips

1. **Start Easy** - Master fundamentals before harder problems
2. **Practice Daily** - Consistency beats intensity
3. **Understand Patterns** - Many problems use similar techniques
4. **Time Yourself** - Simulate interview conditions
5. **Review Solutions** - Learn multiple approaches

## Contributing

1. Use naming pattern: `[number]-[kebab-case-description].ts`
2. Include problem description and test cases
3. Run `npx eslint` before committing
4. Follow existing TypeScript patterns

---

**Total Problems: 57** | **Categories: 18** | **Full Coverage: ✅**