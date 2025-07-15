# Bit Manipulation Problems

## Basic Bit Operations
1. **Single Number** (#136) - Find unique number using XOR
2. **Number of 1 Bits** (#191) - Count set bits (Hamming weight)
3. **Reverse Bits** (#190) - Reverse bits of 32-bit integer
4. **Power of Two** (#231) - Check if number is power of 2
5. **Missing Number** (#268) - Find missing number using XOR
6. **Complement of Base 10 Integer** (#1009) - Find complement

## XOR Properties
1. **Single Number II** (#137) - Find unique number when others appear 3 times
2. **Single Number III** (#260) - Find two unique numbers
3. **Find the Difference** (#389) - Find added character using XOR
4. **Sum of Two Integers** (#371) - Add without using + operator

## Bit Counting & Analysis
1. **Counting Bits** (#338) - Count 1s for numbers 0 to n
2. **Number of Steps to Reduce to Zero** (#1342) - Count operations to reach 0
3. **Prime Number of Set Bits** (#762) - Numbers with prime number of set bits
4. **Binary Watch** (#401) - LED combinations for time display

## Subsets & Combinations
1. **Subsets** (#78) - Generate all subsets using bit manipulation
2. **Subsets II** (#90) - Generate subsets with duplicates
3. **Letter Case Permutation** (#784) - Generate permutations by changing case
4. **Find All Numbers Disappeared** (#448) - Mark presence using bit manipulation

## Advanced Bit Manipulation
1. **Maximum XOR of Two Numbers** (#421) - Find maximum XOR pair using Trie
2. **Total Hamming Distance** (#477) - Sum of Hamming distances between pairs
3. **Bitwise AND of Numbers Range** (#201) - AND of all numbers in range
4. **Minimum Flips to Make OR Equal** (#1318) - Minimum flips for OR target

## Design Problems
1. **Design Bitset** (#2166) - Implement bitset data structure
2. **Iterator for Combination** (#1286) - Generate combinations iteratively

## Game Theory with Bits
1. **Nim Game** (#292) - Game theory using XOR
2. **Stone Game IV** (#1510) - Optimal strategy with bit operations

## Mathematical Applications
1. **Gray Code** (#89) - Generate Gray code sequence
2. **UTF-8 Validation** (#393) - Validate UTF-8 encoding
3. **Integer Replacement** (#397) - Minimum operations to reach 1

## Key Bit Operations
- **AND (&)**: x & 1 checks if odd, x & (x-1) removes rightmost set bit
- **OR (|)**: Set bits, combine flags
- **XOR (^)**: Toggle bits, find differences, self-inverse property
- **NOT (~)**: Flip all bits
- **Left Shift (<<)**: Multiply by 2^n
- **Right Shift (>>)**: Divide by 2^n (arithmetic), zero-fill (logical)

## Common Bit Tricks
- **Check if power of 2**: `n & (n-1) == 0`
- **Get rightmost set bit**: `n & -n`
- **Count set bits**: Brian Kernighan's algorithm
- **Isolate rightmost 0**: `~n & (n+1)`
- **Turn off rightmost set bit**: `n & (n-1)`
- **Set bit at position i**: `n | (1 << i)`
- **Clear bit at position i**: `n & ~(1 << i)`
- **Toggle bit at position i**: `n ^ (1 << i)`

## Applications
- **Flags**: Store multiple boolean values efficiently
- **Masks**: Filter or select specific bits
- **State Compression**: Represent states in DP problems
- **Fast Arithmetic**: Quick multiplication/division by powers of 2