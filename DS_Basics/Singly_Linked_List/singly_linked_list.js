class Node {
  constructor(data) {
    this.data = data
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = null
  }

  append(data) {
    let current = this.head
    const newNode = new Node(data)

    if (current == null) {
      this.head = newNode
      return
    }

    while (current.next !== null) {
      current = current.next
    }
    current.next = newNode
  }

  prepend(data){
    const oldHead = this.head
    this.head = new Node(data)
    this.head.next = oldHead;
  }

  printList() {
    let current = this.head

    let string = ""
    while (current !== null) {
      string += current.data + "->"
      current = current.next
    }
    string+= "null"

    console.log(string)
  }

  // 1 -> 2 -> 4 -> 5 -> null
  delete(data) { // 4
    let current = this.head

    while (current !== null) {
      // if head needs to be deleted
      if (current.data === data) {
        this.head = current.next
        return
      }

      if (current.next && current.next.data === data) {
        current.next = current.next.next
        break
      }
      current = current.next
    }
    return null
  }

  find(data) {
    let current = this.head

    while (current !== null) {
      if (current.data === data) {
        return current
      }
      current = current.next
    }

    return null
  }

  size() {
    if (this.head === null) return 0

    let count = 0
    let current = this.head
    while (current !== null) {
      count++
      current = current.next
    }

    return count
  }

  // 0  1  2  3  4
  // 1->2->4->5->null
  insertAt(data, index) { // 100, 1
    let current = this.head
    const newNode = new Node(data)

    // Edge case 1: Index < 0
    if (index < 0) return null

    // Edge case 2: if list is empty
    if (current == null) {
      this.head = newNode
      return
    }

    // Edge case 3: if index is 0, we need to prepend instead
    if (index === 0) {
      const oldHead = this.head
      this.head = newNode
      newNode.next = oldHead
      return
    }

    let i = 0;
    while (current !== null) {
      if (i === index - 1) {
        newNode.next = current.next
        current.next = newNode
        return
      }
      current = current.next
      i++
    }

    return null
  }

  // 1 -> 2 (targetData) -> newNode -> 4 -> 5 -> null
  insertAfter(data, targetData) { // A, 2
    // Handle empty list
    if (this.head === null) {
      return null // Can't insert after something in an empty list
    }
    
    let current = this.head

    while (current !== null) {
      if (current.data === targetData) {
        const newNode = new Node(data)
        newNode.next = current.next
        current.next = newNode
        return
      }
      current = current.next
    }

    return null
  }

  // 1 -> 2 -> newNode -> 4 (targetData) -> 5 -> null
  insertBefore(data, targetData) {
    if (this.head === null) {
      return null
    }

    // Edge case: target is the head
    if (this.head.data === targetData) {
      const newNode = new Node(data)
      newNode.next = this.head
      this.head = newNode
      return
      // Or: this.prepend(data)
    }
    
    let current = this.head

    while (current !== null) {
      if (current.next && current.next.data === targetData) {
        const newNode = new Node(data)
        newNode.next = current.next
        current.next = newNode
        return
      }
      current = current.next
    }

    return null
  }
}

const linkedList = new LinkedList();
export { linkedList } 

// const list = new LinkedList();
// list.append(1)
// list.append(2)
// list.append(4)
// list.append(5)
// list.prepend(0)
// list.insertAt('A',5) // insert at index position
// list.insertAfter('B','A')
// list.insertBefore('X','A')
// // list.printList()
// console.log(list.head)