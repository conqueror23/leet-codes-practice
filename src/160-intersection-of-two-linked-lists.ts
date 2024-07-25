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

    return pointA.next
};




const node5 = new ListNode(5)
const node4 = new ListNode(4, node5)
const node8 = new ListNode(8, node4)

const node1 = new ListNode(1, node8)
const headA = new ListNode(4, node1)


const node6 = new ListNode(6, node1)
const headB = new ListNode(5, node6)


const case1 = getIntersectionNode(headA, headB)

console.log("case1", case1)
