class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}


function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    if (headA == null || headB == null) return null
    let pointA = headA
    let pointB = headB

    while (pointA !== pointB) {
        if (pointA == null) {
            pointA = headB
        } else {
            pointA = pointA.next!
        }
        if (pointB === null) {
            pointB = headA
        } else {
            pointB = pointB.next!
        }
    }

    return pointA
};

// ---- tests ----
{
  const check = (name: string, actual: ListNode | null, expected: ListNode | null): void => {
    console.log(actual === expected
      ? `PASS ${name}`
      : `FAIL ${name}: expected node ${expected?.val ?? null}, got node ${actual?.val ?? null}`)
  }

  // case1: listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], intersecting at node 8
  const shared = new ListNode(8, new ListNode(4, new ListNode(5)))
  const headA = new ListNode(4, new ListNode(1, shared))
  const headB = new ListNode(5, new ListNode(6, new ListNode(1, shared)))
  check("case1 intersect at 8", getIntersectionNode(headA, headB), shared)

  // case2: no intersection
  const headC = new ListNode(2, new ListNode(6, new ListNode(4)))
  const headD = new ListNode(1, new ListNode(5))
  check("case2 no intersection", getIntersectionNode(headC, headD), null)

  // case3: both lists are the same list — intersection is the head
  check("case3 identical lists", getIntersectionNode(headA, headA), headA)

  // case4: one list empty
  check("case4 empty list", getIntersectionNode(headA, null), null)
}

// make this file a module so its declarations stay file-scoped
export {}
