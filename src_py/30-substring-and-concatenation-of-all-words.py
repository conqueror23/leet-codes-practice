"""
30. Substring with Concatenation of All Words
Difficulty: Hard

Given a string s and an array of strings words (all of equal length), return
the starting indices of all substrings in s that are a concatenation of every
word in words exactly once, in any order, without intervening characters.
"""

from collections import Counter
from typing import List


def find_substring(s: str, words: List[str]) -> List[int]:
    if not s or not words:
        return []

    word_len = len(words[0])
    num_words = len(words)
    window = word_len * num_words
    if window > len(s):
        return []

    target = Counter(words)
    result: List[int] = []

    for i in range(len(s) - window + 1):
        seen: Counter = Counter()
        j = i
        matched = 0
        while matched < num_words:
            word = s[j:j + word_len]
            if word not in target:
                break
            seen[word] += 1
            if seen[word] > target[word]:
                break
            j += word_len
            matched += 1
        if matched == num_words:
            result.append(i)

    return result


if __name__ == "__main__":
    assert sorted(find_substring("barfoothefoobarman", ["foo", "bar"])) == [0, 9]
    assert find_substring("wordgoodgoodgoodbestword", ["word", "good", "best", "word"]) == []
    assert sorted(find_substring("barfoofoobarthefoobarman", ["bar", "foo", "the"])) == [6, 9, 12]
    assert find_substring("", ["a"]) == []
    print("30 OK:", sorted(find_substring("barfoothefoobarman", ["foo", "bar"])))
