const { linkedList } = require('./../../DS_Basics/Singly_Linked_List/singly_linked_list')
linkedList.append(1)
linkedList.append(2)
linkedList.append(3)

/**
 * Before: [1] → [2] → [3] → null
 * After: null ← [1] ← [2] ← [3]
 * 
 * Much easier to think from this aspect, for me at least.
 * Look from the end.
 * - prev pointer holds the each node coming from R->L
 * - next pointer is basically to move ahead or for Increment
 * - current.next is assigned to prev, for ex: 
 *    - while current.next is null, its prev is 1
 *    - while current.next is 1, its prev is 2
 * 3 -> 2 -> 1 -> null
 * 
 * Using three pointers to keep track of at once:
 * previous - The node before current (where we want to point back to)
 * current - The node we're working on right now
 * next - The node after current (so we don't lose it)
 */
function reverseList(list) {
  // Use three pointers
  let prev = null
  let next = null
  let current = list.head

  while (current !== null) {
    next = current.next // for increment
    current.next = prev
    prev = current
    current = next
  }

  list.head = prev
}

reverseList(linkedList)

linkedList.printList()
