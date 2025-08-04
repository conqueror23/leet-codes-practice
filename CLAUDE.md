# CLAUDE.md

Developer guide for Claude Code when working with this LeetCode practice repository.

## Project Overview

**TypeScript-based LeetCode practice repository** with 57 problems across 18 algorithmic categories, organized by difficulty (easy/medium/hard).

## Quick Development Commands

### Essential Commands
```bash
# Run any problem
npx ts-node to_be_solved/[category]/[difficulty]/[problem].ts

# Compile TypeScript
npx tsc

# Lint code (ALWAYS run before commits)
npx eslint src/ to_be_solved/
```

### Examples
```bash
# Test a specific problem
npx ts-node to_be_solved/arrays/easy/1-two-sum.ts

# Run different categories
npx ts-node to_be_solved/trees/medium/102-binary-tree-level-order-traversal.ts
npx ts-node to_be_solved/dynamic-programming/hard/72-edit-distance.ts
```

## Repository Structure

```
├── src/                    # Individual LeetCode solutions
├── to_be_solved/          # Organized practice problems (57 total)
│   ├── arrays/            # 6 problems (easy: 2, medium: 2, hard: 2)
│   ├── strings/           # 3 problems (easy: 1, medium: 1, hard: 1)
│   ├── trees/             # 3 problems (easy: 1, medium: 1, hard: 1)
│   └── ... (15 more)      # Each category has 3 problems minimum
├── interview_questions/   # Additional practice problems
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript config (ES6, CommonJS, strict)
└── .eslintrc.js          # ESLint TypeScript rules
```

## Complete Category List (18 categories)

**Data Structures:** arrays, strings, linked-lists, trees, graphs, stack-queue, heap, hash-table

**Algorithms:** dynamic-programming, backtracking, binary-search, sorting, greedy, two-pointers, sliding-window

**Advanced:** bit-manipulation, math, design

## Adding New Problems

### File Naming Convention
`{leetcode-number}-{kebab-case-description}.ts`

Examples:
- `1-two-sum.ts`
- `15-3sum.ts` 
- `125-valid-palindrome.ts`

### Problem File Template
```typescript
/**
 * [Number]. [Title]
 * Difficulty: [Easy/Medium/Hard]
 * 
 * [Problem description]
 * 
 * Example 1:
 * Input: [input]
 * Output: [output]
 * Explanation: [explanation]
 */

function problemName(param: type): returnType {
    // Implementation
}

// Test cases
console.log(problemName(testInput)); // Expected: output
```

### Directory Placement
- **Individual solutions**: Place in `src/`
- **Practice problems**: Place in `to_be_solved/[category]/[difficulty]/`
- **Interview prep**: Place in `interview_questions/`

## TypeScript Configuration

### Current Settings
- **Target**: ES6
- **Module**: CommonJS
- **Strict mode**: Enabled
- **Output**: `./dist`
- **Root**: `./src`

### Code Style Requirements
- Use TypeScript strict mode
- Proper type annotations
- No implicit any
- ESLint compliance required

## Testing

### Running Solutions
Each problem file includes built-in test cases that execute when run:
```bash
npx ts-node to_be_solved/arrays/easy/1-two-sum.ts
# Output: Test results printed to console
```

### No Test Framework
- No Jest/Mocha setup currently
- Solutions tested via console.log statements
- Test cases included in each problem file

## Code Quality Standards

### Before Committing
1. **ALWAYS run linting**: `npx eslint to_be_solved/`
2. **Test execution**: Verify problem runs without errors
3. **Type checking**: Ensure TypeScript compiles successfully

### ESLint Rules
- TypeScript ESLint configuration active
- Strict typing enforced
- Code style consistency required

## Development Workflow

### Adding Problems
1. Choose appropriate category and difficulty
2. Create file with proper naming convention
3. Include problem description and examples
4. Implement solution with proper TypeScript types
5. Add comprehensive test cases
6. Run ESLint and fix any issues
7. Test execution to verify correctness

### Modifying Existing Problems
1. Read existing file to understand current implementation
2. Make changes while preserving code style
3. Run linting and testing
4. Verify changes don't break execution

## Category Guidelines

### Problem Distribution
- **Minimum 3 problems** per category (easy/medium/hard)
- **Arrays category** has 6 problems (most comprehensive)
- **All other categories** have exactly 3 problems

### Difficulty Progression
- **Easy**: Single concept, straightforward implementation
- **Medium**: Multiple concepts, optimization required
- **Hard**: Complex algorithms, edge case handling

## Common Commands Reference

```bash
# Development
npx ts-node [file-path]      # Run specific TypeScript file
npx tsc                      # Compile all TypeScript
npx eslint [directory]       # Lint code

# Examples
npx ts-node to_be_solved/arrays/easy/26-remove-duplicates-from-sorted-array.ts
npx eslint src/
npx eslint to_be_solved/
```

## Important Notes

- **Always run ESLint** before making commits
- **Test problem execution** after adding/modifying files
- **Follow naming conventions** exactly as specified
- **Include comprehensive test cases** in every problem file
- **Use TypeScript strict mode** for all implementations
- **Current status**: 100% complete coverage across all categories and difficulties