# Binary Search - Recursive Approach

## Step-by-Step Visualization: Finding 82

Let's trace through the recursive binary search with this example:

```
Array: [19,44,51,58,62,75,82,85,88,90]
Index:   0  1  2  3  4  5  6  7  8  9
Target: 82
```

### Call Stack Journey

**CALL 1** (Initial call from wrapper)
```
searchRecursive(arr, 82, left=0, right=9)
├─ mid = Math.floor((0+9)/2) = 4
├─ arr[4] = 62
├─ Is 62 == 82? NO
├─ Is 82 > 62? YES
└─ Make a NEW call: searchRecursive(arr, 82, mid+1=5, right=9)
   (We're saying: "Search the right half from index 5 to 9")
```
**Call 1 PAUSES here, waiting for the result from Call 2**

---

**CALL 2** (Searching right half)
```
searchRecursive(arr, 82, left=5, right=9)
├─ mid = Math.floor((5+9)/2) = 7
├─ arr[7] = 85
├─ Is 85 == 82? NO
├─ Is 82 > 85? NO (82 is smaller!)
└─ Make a NEW call: searchRecursive(arr, 82, left=5, mid-1=6)
   (We're saying: "Search the left half from index 5 to 6")
```
**Call 2 PAUSES here, waiting for the result from Call 3**

---

**CALL 3** (Searching narrower range)
```
searchRecursive(arr, 82, left=5, right=6)
├─ mid = Math.floor((5+6)/2) = 5
├─ arr[5] = 75
├─ Is 75 == 82? NO
├─ Is 82 > 75? YES
└─ Make a NEW call: searchRecursive(arr, 82, mid+1=6, right=6)
   (We're saying: "Search from index 6 to 6 - just one element!")
```
**Call 3 PAUSES here, waiting for the result from Call 4**

---

**CALL 4** (Final check!)
```
searchRecursive(arr, 82, left=6, right=6)
├─ mid = Math.floor((6+6)/2) = 6
├─ arr[6] = 82
├─ Is 82 == 82? YES! 🎯
└─ RETURN 6
```
**✅ Call 4 returns 6**

---

### The Unwinding (Going back up the stack)

How the return value bubbles back up:

```
CALL 4: returns 6
   ↓
CALL 3: receives 6, returns 6 (from line: return searchRecursive(...))
   ↓
CALL 2: receives 6, returns 6 (from line: return searchRecursive(...))
   ↓
CALL 1: receives 6, returns 6 (from line: return searchRecursive(...))
   ↓
binarySearch wrapper: receives 6, returns 6
   ↓
console.log prints: 6 ✅
```

## 🎯 Key Insights to Understand Recursion

### 1. **Each Call Has Its Own Variables**
```
Call 1: left=0, right=9, mid=4
Call 2: left=5, right=9, mid=7  ← Different values!
Call 3: left=5, right=6, mid=5
Call 4: left=6, right=6, mid=6
```
They don't interfere with each other - each function call has its own "workspace"

### 2. **The Call Stack is Like a Tower of Plates**
- You keep stacking plates (function calls) on top
- You can only take plates from the top
- When a function returns, it's like removing the top plate
- The return value gets passed down to the plate below

### 3. **Only ONE Function Runs at a Time**
- Call 1 starts, then **pauses** when it makes Call 2
- Call 2 runs, then **pauses** when it makes Call 3
- And so on...
- Once Call 4 finishes, Call 3 resumes, then Call 2, then Call 1

### 4. **The "Return Chain"**
Every `return` statement passes the value back to whoever called it:
```javascript
return searchRecursive(arr, target, mid+1, right)
       └─────────────────┬─────────────────────┘
                         │
            "Whatever this returns, I return too"
```

## 🧠 The Recursive Mindset

The key to recursion is thinking: **"If I solve a smaller version of this problem, how does that help me solve the bigger one?"**

### Converting While Loop → Recursion

In iterative binary search:
1. **Loop condition** → becomes your **base case** (when to stop)
2. **Loop body** → becomes your **recursive case** (when to keep going)

### Binary Search Recursion Pattern

**Base Cases (When to STOP recursing):**
- If the search space is invalid (left > right) → not found, return -1
- If the middle element equals target → found it, return the index

**Recursive Case (When to KEEP going):**
- Check the middle element
- If target is greater → search the RIGHT half (recursively)
- If target is smaller → search the LEFT half (recursively)

### The Key Difference: Parameters

In the iterative version, you had **variables** that changed:
```javascript
left = 0
right = arr.length - 1
// These updated inside the loop
```

In the recursive version, you pass these as **parameters**:
```javascript
function searchRecursive(arr, target, left, right)
// Each recursive call gets new values for left/right
```

## 📝 The Mental Model

Think of it as delegating:
- "Hey future me, I checked the middle, it's too big"
- "Can you search the left half for me? (from left to mid-1)"
- Each "future you" is a new function call with a smaller search space

---

## 💡 Pro Tips

1. **Helper Function Pattern**: Use a wrapper function so users don't need to provide left/right parameters
2. **Always return the recursive call**: Don't forget `return` before the recursive call!
3. **Each call is independent**: Variables in one call don't affect other calls
4. **Trust the recursion**: Assume the recursive call works correctly for a smaller problem

