/**
 🔍 What is a Binary Search Tree (BST)?
  A Binary Search Tree is a type of binary 
  tree where each node has at most two children (left and right), 
  and it maintains the following property:

  All elements in the left subtree are less than the node’s value.
  All elements in the right subtree are greater than the node’s value.

  Take note: BST must only have 2 children
 */

/** Sample of BST
 *
 */
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

/** Sample structure when you insert data on BST
     this.root = {
      data: 50,
      left: {
        data: 30,
        left: {
          data: 20,
          left: null,
          rigth: null,
        },
        rigth: {
          data: 40,
          left: null,
          rigth: null,
        },
      },
      right: {
        data: 70,
        left: {
          data: 60,
          left: null,
          right: null
        },
        rigth: {
          data: 80,
          left: null,
          right: null
        },
      },
    };
 */
class BST {
  constructor() {
    this.root = null;
    this.count = 0;
    this.result = null;
  }

  insert(data) {
    const newNode = new Node(data);
    const insertNode = (parent, newNode) => {
      if (newNode.data < parent.data) {
        if (!parent.left) parent.left = newNode;
        else insertNode(parent.left, newNode);
      } else {
        if (!parent.right) parent.right = newNode;
        else insertNode(parent.right, newNode);
      }
    };

    if (!this.root) this.root = newNode;
    else insertNode(this.root, newNode);
  }

  search(node, data) {
    if (!node) return null;
    if (data < node.data) return this.search(node.left, data);
    else if (data > node.data) return this.search(node.right, data);
    else return node;
  }

  deleteNode(node, key) {
    if (!node) return null;

    if (key < node.data) {
      node.left = this.deleteNode(node.left, key);
    } else if (key > node.data) {
      node.right = this.deleteNode(node.right, key);
    } else {
      // ✅ Node found

      // Case 1: No child
      if (!node.left && !node.right) return null;

      // Case 2: One child
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      // Case 3: Two children
      let minNode = this.findMin(node.right); // in-order successor
      node.data = minNode.data;
      node.right = this.deleteNode(node.right, minNode.data);
    }

    return node;
  }

  findMin(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  // back to base-case after recursion, Think of it like going down branches of a tree —
  // when there are no more branches, you climb back up.
  inOrder(node) {
    if (node) {
      this.inOrder(node.left);
      console.log(node.data);
      this.inOrder(node.right);
    }
  }

  preOrder(node) {
    if (node) {
      console.log(node.data); // 1. Visit current node
      this.preOrder(node.left); // 2. Traverse left
      this.preOrder(node.right); // 3. Traverse right
    }
  }

  postOrder(node) {
    if (node) {
      this.postOrder(node.left); // 1. Traverse left
      this.postOrder(node.right); // 2. Traverse right
      console.log(node.data); // 3. Visit current node
    }
  }

  levelOrder(root) {
    if (!root) return;
    let queue = [root];
    while (queue.length > 0) {
      let current = queue.shift();
      console.log(current.data);

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }
  LCA(node, p, q) {
    if (!node) return null;

    if (p < node.data && q < node.data) {
      return this.LCA(node.left, p, q);
    } else if (p > node.data && q > node.data) {
      return this.LCA(node.right, p, q);
    } else {
      console.log("LCA:", node.data); // still prints!
      return node; // return the LCA node
    }
  }

  kthSmallest(node, k) {
    if (!node) return null;
    const inOrder = (curr) => {
      if (!curr || this.result !== null) return;

      inOrder(curr.left);

      this.count++;
      if (this.count === k) {
        this.result = curr.data;
        return;
      }
      inOrder(curr.right);
    };
    inOrder(node);
    return this.result;
  }
}

const bst = new BST();
bst.insert(50);
bst.insert(30);
bst.insert(70);
bst.insert(20);
bst.insert(40);
bst.insert(60);
bst.insert(80);

console.log(bst.search(bst.root, 70)); // Node with data = 60
console.log(bst.deleteNode(bst.root, 50));

/**
  1. Depth-First Traversal (DFS)
  There are 3 common types:

  Traversal Type	Order	Use Case
  In-order -	Left → Root → Right	Get sorted order from BST
  Pre-order -	Root → Left → Right	Save tree structure (e.g., copy)
  Post-order -	Left → Right → Root	Delete tree, evaluate expressions 

  2. Breadth-First Traversal (BFS / Level-Order)
  We use a queue to visit nodes level by level:
 */

// In-order
bst.inOrder(bst.root);
// Pre-order
bst.preOrder(bst.root);
// Post-order
bst.postOrder(bst.root);

// Challenge: Find the Lowest Common Ancestor (LCA) in a BST
bst.LCA(bst.root, 20, 80);

// New Challenge: Find the Kth Smallest Element in a BST
console.log("The smallest element is: ", bst.kthSmallest(bst.root, 4));
