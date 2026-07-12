"""
1768. Merge Strings Alternately
Difficulty: Easy

Merge two strings by adding letters in alternating order, starting with word1.
If a string is longer than the other, append the additional letters onto the
end of the merged string.
"""


def merge_alternately(word1: str, word2: str) -> str:
    result = []
    i = j = 0
    turn = 0
    while i < len(word1) and j < len(word2):
        if turn == 0:
            result.append(word1[i])
            i += 1
            turn = 1
        else:
            result.append(word2[j])
            j += 1
            turn = 0
    result.append(word1[i:])
    result.append(word2[j:])
    return "".join(result)


if __name__ == "__main__":
    assert merge_alternately("abc", "pqr") == "apbqcr"
    assert merge_alternately("ab", "pqrs") == "apbqrs"
    assert merge_alternately("abcd", "pq") == "apbqcd"
    assert merge_alternately("abc", "defgh") == "adbecfgh"
    print("1768 OK:", merge_alternately("abc", "defgh"))
