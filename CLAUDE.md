# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a LeetCode practice repository containing TypeScript solutions to various algorithmic problems. The codebase is organized with individual problem solutions in the `src/` directory, each named with the problem number and description.

## Development Commands

### TypeScript Compilation
```bash
npx tsc
```
Compiles TypeScript files from `src/` to `dist/` directory.

### Running TypeScript Files
```bash
npx ts-node src/<filename>.ts
```
Execute TypeScript files directly without compilation.

### Linting
```bash
npx eslint src/
```
Run ESLint checks on the codebase using the configured TypeScript ESLint rules.

## Code Architecture

### File Structure
- `src/` - Contains all LeetCode problem solutions
- `interview_questions/` - Additional interview practice problems
- `to_be_solved/` - Organized practice problems by category and difficulty level
- Solutions are named using pattern: `{problem-number}-{problem-description}.ts`

### Practice Problem Organization
The `to_be_solved/` directory contains LeetCode problems organized by algorithmic categories, each with three difficulty levels:

#### Categories Available:
- `arrays/` - Array manipulation and traversal problems
- `backtracking/` - Recursive backtracking algorithms
- `binary-search/` - Binary search variations and applications
- `bit-manipulation/` - Bitwise operations and bit tricks
- `design/` - Data structure design problems
- `dynamic-programming/` - DP optimization problems
- `graphs/` - Graph traversal, shortest path, and connectivity
- `greedy/` - Greedy algorithm optimization
- `hash-table/` - Hashing and lookup optimizations
- `heap/` - Priority queue and heap operations
- `linked-lists/` - Linked list manipulation and traversal
- `math/` - Mathematical computations and number theory
- `sliding-window/` - Window-based array/string problems
- `sorting/` - Sorting algorithms and applications
- `stack-queue/` - Stack and queue data structure problems
- `strings/` - String manipulation and pattern matching
- `trees/` - Binary tree and general tree algorithms
- `two-pointers/` - Two-pointer technique problems

#### Difficulty Structure:
Each category contains subdirectories for difficulty levels:
- `easy/` - Fundamental problems for learning concepts
- `medium/` - Standard interview-level problems
- `hard/` - Advanced algorithmic challenges

### TypeScript Configuration
- Target: ES6
- Module: CommonJS
- Strict mode enabled
- Output directory: `./dist`
- Root directory: `./src`

### Dependencies
- **Runtime**: `ts-node` for direct TypeScript execution, `nodemon` for file watching
- **Development**: ESLint with TypeScript support for code quality

## Working with Solutions

### Adding New Solutions
When adding new LeetCode solutions:
1. **Main Solutions**: Place in `src/` directory following pattern: `{number}-{kebab-case-description}.ts`
2. **Practice Problems**: Use the organized structure in `to_be_solved/{category}/{difficulty}/`
3. Use TypeScript with strict mode compliance
4. Run linting before committing changes

### Running Practice Problems
Execute any practice problem directly:
```bash
# Run a specific practice problem
npx ts-node to_be_solved/arrays/easy/26-remove-duplicates-from-sorted-array.ts

# Run problems from any category/difficulty
npx ts-node to_be_solved/dynamic-programming/medium/322-coin-change.ts
```

### Problem File Structure
Each problem file includes:
- Problem description with LeetCode number and difficulty
- Clean TypeScript implementation with proper typing
- Multiple test cases demonstrating usage
- Alternative solutions where applicable

### Linting Practice Problems
Lint the entire practice problem collection:
```bash
npx eslint to_be_solved/
```

## Testing

Currently no test framework is configured. Solutions can be tested by running them directly with `ts-node`.

### Practice Problem Testing
Each practice problem file contains built-in test cases that execute when the file is run:
```bash
# Test cases will run automatically when executing any problem file
npx ts-node to_be_solved/arrays/easy/1-two-sum.ts
```

## Study Guide

### Recommended Learning Path
1. **Start with Easy problems** in fundamental categories:
   - Arrays (basic manipulation, two pointers)
   - Strings (basic operations, anagrams)
   - Hash Table (lookups, frequency counting)

2. **Progress to Medium problems** after mastering basics:
   - Dynamic Programming (memoization, tabulation)
   - Trees (traversals, manipulation)
   - Graphs (BFS, DFS, basic algorithms)

3. **Tackle Hard problems** for advanced concepts:
   - Complex DP (multi-dimensional, optimization)
   - Advanced Graph algorithms (shortest path, MST)
   - System Design problems

### Category Focus Areas
- **Interview Preparation**: Focus on Arrays, Strings, Trees, and Dynamic Programming
- **Algorithm Mastery**: Emphasize Graphs, Backtracking, and Binary Search
- **Optimization Skills**: Study Greedy, Bit Manipulation, and Advanced DP