// LeetCode 997: Find the Town Judge (Easy) - Advanced Solutions
// In a town, there are n people labeled from 1 to n. There is a rumor that one of these people is secretly the town judge.
// The town judge trusts nobody, and everybody (except the town judge) trusts the town judge.

/**
 * APPROACH 1: In-degree and Out-degree counting
 * Time Complexity: O(trust.length + n)
 * Space Complexity: O(n)
 * Best for: Most efficient and intuitive approach
 */
function findJudgeInOutDegree(n: number, trust: number[][]): number {
    if (n === 1 && trust.length === 0) return 1; // Special case: only one person
    
    const trustBalance = new Array(n + 1).fill(0);
    
    // trustBalance[i] = (people who trust i) - (people i trusts)
    // Judge should have balance of n-1 (trusted by all n-1 others, trusts nobody)
    for (const [a, b] of trust) {
        trustBalance[a]--; // a trusts someone (out-degree)
        trustBalance[b]++; // b is trusted by someone (in-degree)
    }
    
    // Find person with exactly n-1 trust balance
    for (let i = 1; i <= n; i++) {
        if (trustBalance[i] === n - 1) {
            return i;
        }
    }
    
    return -1;
}

/**
 * APPROACH 2: Separate In-degree and Out-degree Arrays
 * Time Complexity: O(trust.length + n)
 * Space Complexity: O(n)
 * Best for: When you need to track in-degree and out-degree separately
 */
function findJudgeSeparateArrays(n: number, trust: number[][]): number {
    if (n === 1 && trust.length === 0) return 1;
    
    const inDegree = new Array(n + 1).fill(0);   // How many people trust this person
    const outDegree = new Array(n + 1).fill(0);  // How many people this person trusts
    
    for (const [a, b] of trust) {
        outDegree[a]++;
        inDegree[b]++;
    }
    
    // Judge: in-degree = n-1, out-degree = 0
    for (let i = 1; i <= n; i++) {
        if (inDegree[i] === n - 1 && outDegree[i] === 0) {
            return i;
        }
    }
    
    return -1;
}

/**
 * APPROACH 3: Hash Map approach
 * Time Complexity: O(trust.length + n)
 * Space Complexity: O(n)
 * Best for: When you prefer hash map over arrays, more readable for some
 */
function findJudgeHashMap(n: number, trust: number[][]): number {
    if (n === 1 && trust.length === 0) return 1;
    
    const trustCount = new Map<number, number>();
    const trustedBy = new Set<number>();
    
    // Initialize counts for all people
    for (let i = 1; i <= n; i++) {
        trustCount.set(i, 0);
    }
    
    for (const [a, b] of trust) {
        trustedBy.add(a); // a trusts someone, so can't be judge
        trustCount.set(b, trustCount.get(b)! + 1);
    }
    
    // Judge: not in trustedBy set and has trust count of n-1
    for (let i = 1; i <= n; i++) {
        if (!trustedBy.has(i) && trustCount.get(i) === n - 1) {
            return i;
        }
    }
    
    return -1;
}

/**
 * APPROACH 4: Graph Adjacency approach
 * Time Complexity: O(trust.length + n²)
 * Space Complexity: O(n²)
 * Best for: When you need full graph representation, educational purposes
 */
function findJudgeGraph(n: number, trust: number[][]): number {
    if (n === 1 && trust.length === 0) return 1;
    
    // Build adjacency matrix
    const graph = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(false));
    
    for (const [a, b] of trust) {
        graph[a][b] = true;
    }
    
    // Check each person
    for (let judge = 1; judge <= n; judge++) {
        let isJudge = true;
        
        // Judge should not trust anyone
        for (let other = 1; other <= n; other++) {
            if (judge !== other && graph[judge][other]) {
                isJudge = false;
                break;
            }
        }
        
        if (!isJudge) continue;
        
        // Everyone else should trust the judge
        for (let other = 1; other <= n; other++) {
            if (judge !== other && !graph[other][judge]) {
                isJudge = false;
                break;
            }
        }
        
        if (isJudge) return judge;
    }
    
    return -1;
}

/**
 * APPROACH 5: Set-based approach with early termination
 * Time Complexity: O(trust.length + n)
 * Space Complexity: O(n)
 * Best for: When trust array is sparse and you want early termination
 */
function findJudgeSetBased(n: number, trust: number[][]): number {
    if (n === 1 && trust.length === 0) return 1;
    
    const cannotBeJudge = new Set<number>();
    const trustCount = new Map<number, number>();
    
    // Process trust relationships
    for (const [a, b] of trust) {
        cannotBeJudge.add(a); // Person who trusts someone cannot be judge
        trustCount.set(b, (trustCount.get(b) || 0) + 1);
        
        // Early termination: if everyone trusts someone, no judge exists
        if (cannotBeJudge.size === n) {
            return -1;
        }
    }
    
    // Find potential judges (people who don't trust anyone)
    const potentialJudges: number[] = [];
    for (let i = 1; i <= n; i++) {
        if (!cannotBeJudge.has(i)) {
            potentialJudges.push(i);
        }
    }
    
    // There should be exactly one potential judge
    if (potentialJudges.length !== 1) {
        return -1;
    }
    
    const judge = potentialJudges[0];
    return (trustCount.get(judge) || 0) === n - 1 ? judge : -1;
}

/**
 * Performance Comparison Function
 */
function performanceComparison(n: number, trust: number[][]): void {
    console.log(`\n=== Find Town Judge Performance Comparison ===`);
    console.log(`n: ${n}, trust relationships: ${trust.length}`);
    
    const methods = [
        { name: 'In-Out Degree', func: findJudgeInOutDegree, complexity: 'O(E + n) time, O(n) space' },
        { name: 'Separate Arrays', func: findJudgeSeparateArrays, complexity: 'O(E + n) time, O(n) space' },
        { name: 'Hash Map', func: findJudgeHashMap, complexity: 'O(E + n) time, O(n) space' },
        { name: 'Graph Matrix', func: findJudgeGraph, complexity: 'O(E + n²) time, O(n²) space' },
        { name: 'Set Based', func: findJudgeSetBased, complexity: 'O(E + n) time, O(n) space' }
    ];
    
    methods.forEach(method => {
        const start = performance.now();
        const result = method.func(n, trust);
        const end = performance.now();
        
        console.log(`${method.name.padEnd(16)}: ${result.toString().padEnd(6)} | ${(end - start).toFixed(4)}ms | ${method.complexity}`);
    });
}

/**
 * Advanced Test Cases
 */
function runAdvancedTests(): void {
    console.log('=== Find Town Judge Advanced Test Cases ===');
    
    const testCases = [
        {
            n: 2, trust: [[1, 2]], expected: 2,
            description: 'Simple case: one person trusts another'
        },
        {
            n: 3, trust: [[1, 3], [2, 3]], expected: 3,
            description: 'Standard case: everyone trusts person 3'
        },
        {
            n: 3, trust: [[1, 3], [2, 3], [3, 1]], expected: -1,
            description: 'No judge: candidate trusts someone'
        },
        {
            n: 1, trust: [], expected: 1,
            description: 'Edge case: single person (trivial judge)'
        },
        {
            n: 4, trust: [[1, 3], [1, 4], [2, 3], [2, 4], [4, 3]], expected: 3,
            description: 'Complex case: person 3 is trusted by everyone and trusts nobody'
        },
        {
            n: 3, trust: [[1, 2], [2, 3]], expected: -1,
            description: 'Chain trust: no one is trusted by everyone'
        },
        {
            n: 2, trust: [[1, 2], [2, 1]], expected: -1,
            description: 'Mutual trust: both trust each other'
        },
        {
            n: 5, trust: [[1, 2], [3, 2], [4, 2], [5, 2]], expected: 2,
            description: 'Large case: person 2 is trusted by everyone except themselves'
        },
        {
            n: 4, trust: [[1, 2], [1, 3], [2, 3], [4, 3]], expected: 3,
            description: 'Multiple trust relationships pointing to judge'
        }
    ];
    
    const methods = [
        { name: 'InOut', func: findJudgeInOutDegree },
        { name: 'Arrays', func: findJudgeSeparateArrays },
        { name: 'HashMap', func: findJudgeHashMap },
        { name: 'Graph', func: findJudgeGraph },
        { name: 'Sets', func: findJudgeSetBased }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\nTest ${index + 1}: ${testCase.description}`);
        console.log(`n=${testCase.n}, trust=[${testCase.trust.map(t => `[${t.join(',')}]`).join(', ')}], expected=${testCase.expected}`);
        
        methods.forEach(method => {
            const result = method.func(testCase.n, [...testCase.trust]); // Clone trust array to avoid mutation
            const passed = result === testCase.expected;
            console.log(`  ${method.name.padEnd(8)}: ${result.toString().padEnd(4)} ${passed ? '✓' : '✗'}`);
        });
    });
}

/**
 * Algorithm Analysis
 */
function algorithmAnalysis(): void {
    console.log('\n=== Algorithm Analysis ===');
    console.log('PROBLEM PATTERN: Graph theory - finding node with specific in/out degree properties');
    console.log('');
    console.log('APPROACH COMPARISON:');
    console.log('1. In-Out Degree: Most elegant, single array, optimal time/space');
    console.log('2. Separate Arrays: Clear separation of concerns, easy to debug');
    console.log('3. Hash Map: More readable, good for dynamic scenarios');
    console.log('4. Graph Matrix: Overkill for this problem, but shows full graph structure');
    console.log('5. Set Based: Good early termination, clear logic separation');
    console.log('');
    console.log('KEY INSIGHTS:');
    console.log('- Judge has in-degree = n-1 and out-degree = 0');
    console.log('- This is a special case of finding a "sink" node in a directed graph');
    console.log('- The problem guarantees at most one judge exists');
    console.log('- Can be solved without building the full graph representation');
    console.log('');
    console.log('RECOMMENDED: In-Out Degree approach for optimal efficiency and clarity');
}

/**
 * Graph Theory Insights
 */
function graphTheoryInsights(): void {
    console.log('\n=== Graph Theory Context ===');
    console.log('This problem represents a directed graph where:');
    console.log('- Vertices: People (1 to n)');
    console.log('- Edges: Trust relationships (a trusts b)');
    console.log('- Judge: Universal sink (in-degree = n-1, out-degree = 0)');
    console.log('');
    console.log('Related Graph Concepts:');
    console.log('- Celebrity Problem: Same structure, different context');
    console.log('- Topological Sort: Judge would be the only node with no outgoing edges');
    console.log('- Strongly Connected Components: Judge forms its own component');
    console.log('');
    console.log('Extensions:');
    console.log('- Multiple judges: Find all nodes with in-degree = n-1, out-degree = 0');
    console.log('- Partial judge: Find nodes with in-degree ≥ threshold');
    console.log('- Trust levels: Weighted graph version');
}

// Run all tests and analysis
runAdvancedTests();
performanceComparison(5, [[1, 2], [3, 2], [4, 2], [5, 2]]);
algorithmAnalysis();
graphTheoryInsights();

export { 
    findJudgeInOutDegree, 
    findJudgeSeparateArrays, 
    findJudgeHashMap, 
    findJudgeGraph, 
    findJudgeSetBased 
};