"""
121. Best Time to Buy and Sell Stock
Difficulty: Easy

You are given an array prices where prices[i] is the price of a given stock on
the i-th day. Maximize your profit by choosing a single day to buy and a
different day in the future to sell. Return the maximum profit, or 0.
"""

from typing import List


def max_profit(prices: List[int]) -> int:
    if not prices:
        return 0
    min_price = prices[0]
    best = 0
    for price in prices[1:]:
        best = max(best, price - min_price)
        min_price = min(min_price, price)
    return best


if __name__ == "__main__":
    assert max_profit([7, 1, 5, 3, 6, 4]) == 5
    assert max_profit([7, 6, 4, 3, 1]) == 0
    assert max_profit([]) == 0
    print("121 OK:", max_profit([7, 1, 5, 3, 6, 4]))
