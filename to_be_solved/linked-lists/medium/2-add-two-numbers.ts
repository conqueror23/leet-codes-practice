/**
 * 2. Add Two Numbers - Medium
 * 
 * You are given two non-empty linked lists representing two non-negative integers. 
 * The digits are stored in reverse order, and each of their nodes contains a single digit. 
 * Add the two numbers and return the sum as a linked list.
 * 
 * You may assume the two numbers do not contain any leading zero, except the number 0 itself.
 */

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    // Advanced: Single pass with carry handling
    // Time: O(max(m, n)), Space: O(max(m, n))
    
    const dummy = new ListNode(0);
    let current = dummy;
    let carry = 0;
    
    while (l1 !== null || l2 !== null || carry !== 0) {
        const val1 = l1?.val ?? 0;
        const val2 = l2?.val ?? 0;
        
        const sum = val1 + val2 + carry;
        carry = Math.floor(sum / 10);
        
        current.next = new ListNode(sum % 10);
        current = current.next;
        
        l1 = l1?.next ?? null;
        l2 = l2?.next ?? null;
    }
    
    return dummy.next;
}

// Alternative: Recursive approach
function addTwoNumbersRecursive(l1: ListNode | null, l2: ListNode | null, carry: number = 0): ListNode | null {
    if (!l1 && !l2 && carry === 0) return null;
    
    const val1 = l1?.val ?? 0;
    const val2 = l2?.val ?? 0;
    const sum = val1 + val2 + carry;
    
    const newCarry = Math.floor(sum / 10);
    const digit = sum % 10;
    
    const result = new ListNode(digit);
    result.next = addTwoNumbersRecursive(l1?.next ?? null, l2?.next ?? null, newCarry);
    
    return result;
}

// Optimized: In-place modification of longer list
function addTwoNumbersInPlace(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    if (!l1) return l2;
    if (!l2) return l1;
    
    // Determine which list is longer
    const len1 = getLength(l1);
    const len2 = getLength(l2);
    
    let longer = len1 >= len2 ? l1 : l2;
    let shorter = len1 >= len2 ? l2 : l1;
    const result = longer;
    
    let carry = 0;
    let prev: ListNode | null = null;
    
    // Add corresponding digits
    while (shorter !== null) {
        const sum = longer.val + shorter.val + carry;
        longer.val = sum % 10;
        carry = Math.floor(sum / 10);
        
        prev = longer;
        longer = longer.next!;
        shorter = shorter.next;
    }
    
    // Continue with remaining digits of longer list
    while (longer !== null) {
        const sum = longer.val + carry;
        longer.val = sum % 10;
        carry = Math.floor(sum / 10);
        
        prev = longer;
        longer = longer.next;
    }
    
    // Add final carry if needed
    if (carry > 0) {
        prev!.next = new ListNode(carry);
    }
    
    return result;
}

function getLength(head: ListNode | null): number {
    let length = 0;
    while (head !== null) {
        length++;
        head = head.next;
    }
    return length;
}

// Advanced: Handle very large numbers (BigInt approach)
function addTwoNumbersBigInt(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    // Convert linked lists to BigInt numbers
    const num1 = linkedListToBigInt(l1);
    const num2 = linkedListToBigInt(l2);
    
    // Add the numbers
    const sum = num1 + num2;
    
    // Convert back to linked list
    return bigIntToLinkedList(sum);
}

function linkedListToBigInt(head: ListNode | null): bigint {
    let result = 0n;
    let multiplier = 1n;
    
    while (head !== null) {
        result += BigInt(head.val) * multiplier;
        multiplier *= 10n;
        head = head.next;
    }
    
    return result;
}

function bigIntToLinkedList(num: bigint): ListNode | null {
    if (num === 0n) return new ListNode(0);
    
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (num > 0n) {
        const digit = Number(num % 10n);
        current.next = new ListNode(digit);
        current = current.next;
        num = num / 10n;
    }
    
    return dummy.next;
}

// Stack-based approach (for educational purposes)
function addTwoNumbersStack(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const stack1: number[] = [];
    const stack2: number[] = [];
    
    // Push all digits to stacks (reverse order for this problem)
    let temp = l1;
    while (temp !== null) {
        stack1.push(temp.val);
        temp = temp.next;
    }
    
    temp = l2;
    while (temp !== null) {
        stack2.push(temp.val);
        temp = temp.next;
    }
    
    const result: number[] = [];
    let carry = 0;
    
    // Process from least significant digit
    while (stack1.length > 0 || stack2.length > 0 || carry > 0) {
        const val1 = stack1.pop() || 0;
        const val2 = stack2.pop() || 0;
        
        const sum = val1 + val2 + carry;
        result.push(sum % 10);
        carry = Math.floor(sum / 10);
    }
    
    // Convert array back to linked list
    if (result.length === 0) return new ListNode(0);
    
    const dummy = new ListNode(0);
    let current = dummy;
    
    for (const digit of result) {
        current.next = new ListNode(digit);
        current = current.next;
    }
    
    return dummy.next;
}

// Optimized for specific constraints
function addTwoNumbersOptimized(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    // Handle edge cases
    if (!l1) return l2;
    if (!l2) return l1;
    
    let head: ListNode | null = null;
    let tail: ListNode | null = null;
    let carry = 0;
    
    while (l1 || l2 || carry) {
        const sum = (l1?.val || 0) + (l2?.val || 0) + carry;
        const digit = sum % 10;
        carry = Math.floor(sum / 10);
        
        const newNode = new ListNode(digit);
        
        if (!head) {
            head = tail = newNode;
        } else {
            tail!.next = newNode;
            tail = newNode;
        }
        
        l1 = l1?.next || null;
        l2 = l2?.next || null;
    }
    
    return head;
}

// Helper functions for testing
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

function linkedListToArray(head: ListNode | null): number[] {
    const result: number[] = [];
    
    while (head !== null) {
        result.push(head.val);
        head = head.next;
    }
    
    return result;
}

function printLinkedList(head: ListNode | null): string {
    return linkedListToArray(head).join(' -> ');
}

// Test cases
console.log("=== 2. Add Two Numbers Tests ===");

function testAddTwoNumbers() {
    // Test case 1: [2,4,3] + [5,6,4] = [7,0,8] (342 + 465 = 807)
    const l1 = createLinkedList([2, 4, 3]);
    const l2 = createLinkedList([5, 6, 4]);
    const result1 = addTwoNumbers(l1, l2);
    console.log("Test 1:", printLinkedList(result1)); // Expected: 7 -> 0 -> 8
    
    // Test case 2: [0] + [0] = [0]
    const l3 = createLinkedList([0]);
    const l4 = createLinkedList([0]);
    const result2 = addTwoNumbers(l3, l4);
    console.log("Test 2:", printLinkedList(result2)); // Expected: 0
    
    // Test case 3: [9,9,9,9,9,9,9] + [9,9,9,9] = [8,9,9,9,0,0,0,1]
    const l5 = createLinkedList([9, 9, 9, 9, 9, 9, 9]);
    const l6 = createLinkedList([9, 9, 9, 9]);
    const result3 = addTwoNumbers(l5, l6);
    console.log("Test 3:", printLinkedList(result3)); // Expected: 8 -> 9 -> 9 -> 9 -> 0 -> 0 -> 0 -> 1
    
    // Test case 4: Different lengths
    const l7 = createLinkedList([1, 8]);
    const l8 = createLinkedList([0]);
    const result4 = addTwoNumbers(l7, l8);
    console.log("Test 4:", printLinkedList(result4)); // Expected: 1 -> 8
    
    // Test case 5: Single carry
    const l9 = createLinkedList([5]);
    const l10 = createLinkedList([5]);
    const result5 = addTwoNumbers(l9, l10);
    console.log("Test 5:", printLinkedList(result5)); // Expected: 0 -> 1
}

testAddTwoNumbers();

// Performance comparison
console.log("\n=== Performance Comparison ===");

function performanceTest() {
    const testCases = [
        { l1: [2, 4, 3], l2: [5, 6, 4] },
        { l1: [9, 9, 9], l2: [9, 9, 9, 9] },
        { l1: [1], l2: [9, 9, 9] },
        { l1: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], l2: [5, 6, 4] }
    ];
    
    testCases.forEach((test, i) => {
        console.log(`\nTest case ${i + 1}:`);
        
        const l1 = createLinkedList(test.l1);
        const l2 = createLinkedList(test.l2);
        
        // Test iterative approach
        const result1 = addTwoNumbers(createLinkedList(test.l1), createLinkedList(test.l2));
        console.log(`Iterative: ${printLinkedList(result1)}`);
        
        // Test recursive approach
        const result2 = addTwoNumbersRecursive(createLinkedList(test.l1), createLinkedList(test.l2));
        console.log(`Recursive: ${printLinkedList(result2)}`);
        
        // Test optimized approach
        const result3 = addTwoNumbersOptimized(createLinkedList(test.l1), createLinkedList(test.l2));
        console.log(`Optimized: ${printLinkedList(result3)}`);
    });
}

performanceTest();