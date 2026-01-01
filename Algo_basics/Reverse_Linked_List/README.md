# Reverse a Linked List - Mental Model Guide

## The Challenge

Turn this:
```
HEAD → [1] → [2] → [3] → [4] → [5] → null
```

Into this:
```
HEAD → [5] → [4] → [3] → [2] → [1] → null
```

**Important:** We're not just printing in reverse or creating a new list. We're **flipping all the arrows** in place!

## The Core Insight

To reverse a list, you need to **flip each arrow** so it points backwards:

**Before:**
```
[1] → [2] → [3] → null
```

**After:**
```
null ← [1] ← [2] ← [3]
```

But here's the challenge: **Once you flip an arrow, you lose the reference to the next node!**

## The "Breaking the Chain" Problem

Imagine you're at node 2:
```
[1] → [2] → [3] → [4]
      ↑
    current
```

If you flip the arrow immediately:
```
[1] ← [2]   [3] → [4]
            ↑
          LOST! Can't reach anymore
```

You just lost nodes 3, 4, and everything after! 💥

This is the same "don't break the chain" principle from insertion and deletion, but now you're dealing with it at every single node!

## The Solution: Three Pointers Technique

You need to keep track of **THREE things at once**:

1. **prev** - The node before current (where we want to point back to)
2. **current** - The node we're working on right now
3. **next** - The node after current (so we don't lose it!)

Think of these as three people walking through a hallway together, always staying one step apart.

## Visual Step-by-Step Walkthrough

Let's reverse: `[1] → [2] → [3] → null`

### Initial Setup
```
prev = null
current = head → [1] → [2] → [3] → null
next = null (temporary variable)
```

---

### Iteration 1: At node 1

**State:**
```
prev = null
       ↓
null   [1] → [2] → [3] → null
       ↑
     current
```

**Actions:**
```
a. next = current.next           // Save [2] before we lose it!
b. current.next = prev           // Flip: [1] → null
c. prev = current                // Move prev to [1]
d. current = next                // Move current to [2]
```

**Result:**
```
       prev
        ↓
null ← [1]   [2] → [3] → null
             ↑
           current
```

---

### Iteration 2: At node 2

**State:**
```
null ← [1] ← prev
       [2] → [3] → null
       ↑
     current
```

**Actions:**
```
a. next = current.next           // Save [3]
b. current.next = prev           // Flip: [2] → [1]
c. prev = current                // Move prev to [2]
d. current = next                // Move current to [3]
```

**Result:**
```
            prev
             ↓
null ← [1] ← [2]   [3] → null
                   ↑
                 current
```

---

### Iteration 3: At node 3

**State:**
```
null ← [1] ← [2] ← prev
       [3] → null
       ↑
     current
```

**Actions:**
```
a. next = current.next           // Save null
b. current.next = prev           // Flip: [3] → [2]
c. prev = current                // Move prev to [3]
d. current = next                // Move current to null
```

**Result:**
```
                 prev
                  ↓
null ← [1] ← [2] ← [3]
                         current = null (DONE!)
```

---

### Final Step

```
head = prev  // Update head to point to [3] (the new first node)
```

**Final reversed list:**
```
HEAD → [5] → [4] → [3] → [2] → [1] → null
```

## The Algorithm Pattern

```
1. Initialize three pointers:
   - prev = null (nothing before the first node)
   - current = head (start at the beginning)
   - next = null (temporary variable)

2. Loop while current is not null:
   a. Save the next node
   b. Flip the current node's arrow backwards
   c. Move prev forward
   d. Move current forward

3. After loop ends, prev points to the new head
4. Update head = prev
```

## The Critical 4 Steps (Order Matters!)

**Inside the loop, this exact order is CRITICAL:**

```javascript
1. next = current.next      // MUST BE FIRST - Save before we lose it!
2. current.next = prev      // Now safe to flip the arrow
3. prev = current           // Move prev forward
4. current = next           // Move current forward
```

### Why This Order?

**Step 1 MUST be first:**
- If you flip the arrow before saving next, you lose the rest of the list!
- `current.next` will point to `prev`, and you can't reach the nodes ahead

**Step 2 comes next:**
- Now it's safe to flip because we saved next

**Steps 3 & 4 can be done in any order:**
- Both just move pointers forward
- No risk of losing data

### What Happens If You Get It Wrong?

**Wrong Order Example:**
```javascript
current.next = prev      // Flipped!
next = current.next      // next is now prev (WRONG!)
prev = current
current = next           // Going backwards instead of forward - INFINITE LOOP!
```

## Mental Model: The Sliding Window

Think of the three pointers as **three people walking through a line of people holding hands**:

```
Before they arrive:
○ → ○ → ○ → ○ → ○

As they walk through:
  prev  current  next
   ↓      ↓       ↓
   ○  ←   ○   →   ○ → ○ → ○
          ↑
    Flips to point back

After they pass:
○ ← ○ ← ○ → ○ → ○
```

- **prev** walks one step behind
- **current** is in the middle, flipping arrows
- **next** walks one step ahead, scouting the path
- They move together like a sliding window through the list

## Edge Cases

### 1. Empty List (head is null)
```
prev = null
current = null
Loop doesn't run (current is null)
Return null ✅

Result: Empty list stays empty
```

### 2. Single Node
```
Before: [1] → null

Loop runs once:
- next = null
- current.next = null (was already null!)
- prev = [1]
- current = null (exit loop)

head = prev = [1]

After: [1] → null ✅ (same as before)
```

### 3. Two Nodes
```
Before: [1] → [2] → null

Iteration 1:
null ← [1]   [2] → null

Iteration 2:
null ← [1] ← [2]

After: [2] → [1] → null ✅
```

## Loop Condition: Why `while (current !== null)`?

```javascript
while (current !== null)  // ✅ Correct
```

**Why this works:**
- We process nodes while there ARE nodes to process
- When current becomes null, we've processed all nodes
- prev is now pointing to the last node (the new head)

**Wrong alternatives:**
```javascript
while (current.next !== null)  // ❌ Misses the last node!
while (prev !== null)           // ❌ Wrong logic
```

## Iterative vs Recursive Approaches

### Iterative (What we're doing)
**Pros:**
- More intuitive to understand
- O(1) space complexity (only 3 pointers)
- No risk of stack overflow
- Easier to visualize the pointer movements

**Cons:**
- More lines of code
- Need to manage multiple pointers

### Recursive
**Pros:**
- More elegant code (fewer lines)
- "Trusting the recursion" practice

**Cons:**
- Harder to visualize
- O(n) space complexity (call stack)
- Risk of stack overflow on very large lists
- Trickier to understand the pointer flipping

**Recommendation:** Start with iterative! Once you understand how the pointers work, the recursive version makes more sense.

## Common Mistakes

### ❌ Mistake 1: Flipping before saving next
```javascript
current.next = prev      // ❌ Flipped the arrow!
next = current.next      // ❌ next is now prev (lost the real next!)
```

**Fix:** Always save next FIRST!

### ❌ Mistake 2: Wrong loop condition
```javascript
while (current.next !== null)  // ❌ Stops too early!
```

**Fix:** Use `while (current !== null)`

### ❌ Mistake 3: Forgetting to update head
```javascript
// After the loop...
return prev  // ❌ Forgot to update this.head in a class method!
```

**Fix:** Always update `this.head = prev` before returning

### ❌ Mistake 4: Modifying head pointer during loop
```javascript
while (head !== null) {    // ❌ Using head instead of current
    head = head.next       // ❌ Lost the original head!
}
```

**Fix:** Use a `current` variable, never modify `head` until the end

## Time & Space Complexity

### Time Complexity: O(n)
- Visit each node exactly once
- Each visit does constant work (4 pointer operations)
- n nodes × O(1) work = O(n)

### Space Complexity: O(1)
- Only use 3 pointers (prev, current, next)
- No additional data structures
- Space doesn't grow with input size

**This is optimal!** Can't do better than O(n) time since you must visit each node to reverse it.

## The Complete Pattern Template

```javascript
reverse() {
  // Step 1: Initialize three pointers
  let prev = null
  let current = this.head
  let next = null
  
  // Step 2: Loop through the list
  while (current !== null) {
    // a. Save next (DON'T LOSE THE CHAIN!)
    next = current.next
    
    // b. Flip the arrow
    current.next = prev
    
    // c. Move prev forward
    prev = current
    
    // d. Move current forward
    current = next
  }
  
  // Step 3: Update head to the new first node
  this.head = prev
}
```

## Visualization: Before and After

### Before Reverse
```
this.head
    ↓
  ┌───┬───┐   ┌───┬───┐   ┌───┬───┐   ┌───┬───┐
  │ 1 │ ●─┼──→│ 2 │ ●─┼──→│ 3 │ ●─┼──→│ 4 │ ✗ │
  └───┴───┘   └───┴───┘   └───┴───┘   └───┴───┘
```

### After Reverse
```
                                      this.head
                                          ↓
  ┌───┬───┐   ┌───┬───┐   ┌───┬───┐   ┌───┬───┐
  │ 1 │ ✗ │←──┼─● │ 2 │←──┼─● │ 3 │←──┼─● │ 4 │
  └───┴───┘   └───┴───┘   └───┴───┘   └───┴───┘
```

Notice:
- All arrows flipped direction
- Head moved from first node to last node
- Null moved from end to beginning

## Why This Problem is Important

### For Interviews
- Top 5 most asked linked list question
- Tests pointer manipulation skills
- Foundation for harder problems (reverse sublist, palindrome check)
- Asked at: Google, Facebook, Amazon, Microsoft, Apple

### For Learning
- Reinforces the "don't break the chain" principle
- Teaches multi-pointer technique (used in many problems)
- Builds confidence with pointer manipulation
- Gateway to more complex linked list operations

### Real-World Applications
- Undo/Redo functionality
- Browser history navigation
- String manipulation
- Data stream processing

## Pro Tips

1. **Draw it out** - Seriously, draw each step with boxes and arrows
2. **Use descriptive names** - prev, current, next are clearer than p, c, n
3. **Comment each step** - Especially while learning
4. **Test edge cases** - Empty, single node, two nodes
5. **Walk through manually** - Trace through with a 3-node list on paper
6. **Trust the pattern** - Once you have the 4 steps, don't overthink it

## Practice Variations

Once you master the basic reverse:
1. **Reverse sublist** - Reverse only nodes from position m to n
2. **Reverse in k-groups** - Reverse every k nodes
3. **Palindrome check** - Reverse second half and compare
4. **Reorder list** - Interleave first and reversed second half

## Key Takeaways

1. **Three pointers** - prev, current, next
2. **Order is critical** - Save next BEFORE flipping
3. **Loop condition** - `while (current !== null)`
4. **Don't forget** - Update head at the end
5. **Edge cases** - Test empty, single node, two nodes
6. **Optimal solution** - O(n) time, O(1) space
7. **Foundation skill** - Master this for harder problems

---

Now you're ready to code! Remember: Draw it out, follow the 4-step pattern, and test your edge cases. Good luck! 🚀
