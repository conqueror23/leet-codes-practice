/**
 * 25. Reverse Nodes in k-Group
 * Difficulty: Hard
 * 
 * Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.
 * 
 * k is a positive integer and is less than or equal to the length of the linked list. 
 * If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.
 * 
 * You may not alter the values in the list's nodes, only nodes themselves may be changed.
 * 
 * Example 1:
 * Input: head = [1,2,3,4,5], k = 2
 * Output: [2,1,4,3,5]
 * 
 * Example 2:
 * Input: head = [1,2,3,4,5], k = 3
 * Output: [3,2,1,4,5]
 */

class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
    if (!head || k === 1) return head;
    
    let count = 0;
    let curr = head;
    while (curr && count < k) {
        curr = curr.next;
        count++;
    }
    
    if (count === k) {
        curr = reverseKGroup(curr, k);
        
        while (count > 0) {
            const next = head!.next;
            head!.next = curr;
            curr = head;
            head = next;
            count--;
        }
        head = curr;
    }
    
    return head;
}

function createLinkedList(arr: number[]): ListNode | null {
    if (arr.length === 0) return null;
    const head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

function printLinkedList(head: ListNode | null): number[] {
    const result: number[] = [];
    while (head) {
        result.push(head.val);
        head = head.next;
    }
    return result;
}

const list1 = createLinkedList([1, 2, 3, 4, 5]);
console.log(printLinkedList(reverseKGroup(list1, 2)));

const list2 = createLinkedList([1, 2, 3, 4, 5]);
console.log(printLinkedList(reverseKGroup(list2, 3)));