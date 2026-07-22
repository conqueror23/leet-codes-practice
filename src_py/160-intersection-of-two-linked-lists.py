"""
160. Intersection of Two Linked Lists
Difficulty: Easy

Given the heads of two singly linked-lists headA and headB, return the node at
which the two lists intersect. If the two linked lists have no intersection,
return None.
"""

from typing import Optional


class ListNode:
    def __init__(self, val: int = 0, next: "Optional[ListNode]" = None):
        self.val = val
        self.next = next


def get_intersection_node(
    headA: Optional[ListNode], headB: Optional[ListNode]
) -> Optional[ListNode]:
    if headA is None or headB is None:
        return None

    a, b = headA, headB
    while a is not b:
        a = a.next if a is not None else headB
        b = b.next if b is not None else headA
    return a


if __name__ == "__main__":
    # Shared tail: 8 -> 4 -> 5
    node5 = ListNode(5)
    node4 = ListNode(4, node5)
    shared = ListNode(8, node4)

    headA = ListNode(4, ListNode(1, shared))
    headB = ListNode(5, ListNode(6, ListNode(1, shared)))

    assert get_intersection_node(headA, headB) is shared

    # No intersection
    a = ListNode(1, ListNode(2))
    b = ListNode(3, ListNode(4))
    assert get_intersection_node(a, b) is None
    print(
        "160 OK: intersection val =",
        get_intersection_node(headA, headB).val,  # pyright: ignore
    )
