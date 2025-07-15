# Sliding Window Problems

## Fixed Size Window
1. **Maximum Average Subarray I** (#643) - Find maximum average in fixed window
2. **Contains Duplicate II** (#219) - Check duplicates within k distance
3. **Max Consecutive Ones III** (#1004) - Longest sequence with at most k flips
4. **Sliding Window Maximum** (#239) - Maximum in each window of size k

## Variable Size Window
1. **Longest Substring Without Repeating Characters** (#3) - Longest unique character substring
2. **Longest Repeating Character Replacement** (#424) - Longest substring with k character changes
3. **Minimum Window Substring** (#76) - Smallest window containing all characters
4. **Fruit Into Baskets** (#904) - Pick fruits from at most 2 types of trees
5. **Longest Substring with At Most K Distinct Characters** (#340) - K distinct characters
6. **Subarrays with K Different Integers** (#992) - Count subarrays with exactly k distinct

## String Pattern Matching
1. **Find All Anagrams in String** (#438) - Find all anagram indices
2. **Permutation in String** (#567) - Check if permutation exists
3. **Minimum Window Substring** (#76) - Minimum window containing pattern
4. **Substring with Concatenation of All Words** (#30) - Find concatenated word substrings

## Numeric Problems
1. **Maximum Sum Subarray of Size K** - Fixed window sum
2. **Minimum Size Subarray Sum** (#209) - Minimum length subarray with sum ≥ target
3. **Subarray Product Less Than K** (#713) - Count subarrays with product < k
4. **Binary Subarrays with Sum** (#930) - Count binary subarrays with given sum

## Key Techniques
- **Expand Window**: Add elements to right
- **Contract Window**: Remove elements from left
- **Window Condition**: Maintain valid window state
- **HashMap/Counter**: Track character frequencies
- **Two Pointers**: Left and right boundaries

## Template
```
left = 0
for right in range(len(array)):
    # Add array[right] to window
    
    while window_condition_broken:
        # Remove array[left] from window
        left += 1
    
    # Update result with current window
```