"""
20. Valid Parentheses
Difficulty: Easy

Given a string s containing just the characters '(', ')', '{', '}', '[' and
']', determine if the input string is valid.
"""


def is_valid(s: str) -> bool:
    pairs = {")": "(", "]": "[", "}": "{"}
    stack = []
    for ch in s:
        if ch in pairs:
            if not stack or stack.pop() != pairs[ch]:
                return False
        else:
            stack.append(ch)
    return not stack


if __name__ == "__main__":
    assert is_valid("{([])}") is True
    assert is_valid("{([)}") is False
    assert is_valid("{([}") is False
    assert is_valid("()[]{}") is True
    assert is_valid("(") is False
    assert is_valid("]") is False
    print("20 OK")
