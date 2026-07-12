"""
67. Add Binary
Difficulty: Easy

Given two binary strings a and b, return their sum as a binary string.
"""


def add_binary(a: str, b: str) -> str:
    result = []
    carry = 0
    i, j = len(a) - 1, len(b) - 1

    while i >= 0 or j >= 0 or carry:
        total = carry
        if i >= 0:
            total += int(a[i])
            i -= 1
        if j >= 0:
            total += int(b[j])
            j -= 1
        result.append(str(total % 2))
        carry = total // 2

    return "".join(reversed(result))


if __name__ == "__main__":
    assert add_binary("1", "11") == "100"
    assert add_binary("1010", "1011") == "10101"
    assert add_binary("0", "0") == "0"
    assert add_binary("11", "1") == "100"
    print("67 OK:", add_binary("1010", "1011"))
