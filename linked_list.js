/**
  🔗 What is a Linked List?
  A Linked List is a linear data structure where elements (called nodes) are stored in memory in a non-contiguous way. 
  Each node points to the next node in the sequence. Unlike arrays, which store elements in contiguous memory, 
  linked lists use pointers.

  🧱 Structure of a Node
  Each node typically contains:

  Data: The actual value stored.

  Next: A reference (or pointer) to the next node.

 */

// Node class
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

// LinkedList class
class LinkedList {
  constructor() {
    this.head = null;
  }

  // Add node at the end
  append(data) {
    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
      return;
    }

    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }

  // Insert node at the beginning
  insertAtBeginning(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }

  // Delete node by value
  deleteNode(value) {
    if (!this.head) return;

    if (this.head.data === value) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    while (current.next && current.next.data !== value) {
      current = current.next;
    }

    if (current.next) {
      current.next = current.next.next;
    }
  }

  // Display list
  printList() {
    let current = this.head;
    let result = "";
    while (current) {
      result += current.data + " → ";
      current = current.next;
    }
    result += "null";
    console.log(result);
  }

  removeDuplicate(head) {
    let current = head;

    while (current !== null) {
      let runner = current;

      while (runner.next !== null) {
        if (runner.next.data === current.data) {
          // Skip the duplicate
          runner.next = runner.next.next;
        } else {
          runner = runner.next;
        }
      }

      current = current.next;
    }

    return head;
  }
}

// Usage
const list = new LinkedList();
list.append(10);
list.append(20);
list.append(30);
list.printList(); // 10 → 20 → 30 → null

list.insertAtBeginning(5);
list.printList(); // 5 → 10 → 20 → 30 → null

list.deleteNode(20);
list.printList(); // 5 → 10 → 30 → null

/**
 * Sample Problem
 * Problem: Remove Duplicates from a Linked List
 */
const head = {
  data: 10,
  next: {
    data: 40,
    next: {
      data: 20,
      next: {
        data: 30,
        next: {
          data: 30,
          next: {
            data: 20,
            next: {
              data: 40,
              next: {
                data: 10,
                next: null,
              },
            },
          },
        },
      },
    },
  },
};

const res = list.removeDuplicate(head);
function printList() {
  let current = res;
  let result = "";
  while (current) {
    result += current.data + " → ";
    current = current.next;
  }
  result += "null";
  console.log(result);
}

printList();
// console.log("LIST WITH NO DUPLICATE:", list.removeDuplicate(head));
