/**
 🔷 What is a Heap?
  A Heap is a binary tree-based data structure that satisfies the Heap Property.

  Heap Properties:
  A Complete Binary Tree: All levels are filled except possibly the last, and the last level is filled from left to right.

  Two types:

  Min-Heap: The parent node is smaller than its children.

  Max-Heap: The parent node is larger than its children.
 */

class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  removeMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop(); // Move last element to root
    this.heapifyDown();
    return min;
  }

  // 10,5
  heapifyUp() {
    let index = this.heap.length - 1; // 1

    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      0;

      if (this.heap[parentIndex] <= this.heap[index]) break;

      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];

      index = parentIndex;
    }
  }

  heapifyDown() {
    let index = 0;
    let length = this.heap.length;

    while (true) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let smallest = index;

      if (left < length && this.heap[left] < this.heap[smallest]) {
        smallest = left;
      }

      if (right < length && this.heap[right] < this.heap[smallest]) {
        smallest = right;
      }

      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];

      index = smallest;
    }
  }

  display() {
    console.log(this.heap);
  }
}

const heap = new MinHeap();

heap.insert(10);
heap.insert(5);
heap.insert(3);
heap.insert(2);
heap.insert(7);

heap.display(); // Output: [2, 5, 3, 10, 7]

console.log("Min removed:", heap.removeMin()); // Output: 2
heap.display(); // Output: [3, 5, 7, 10]

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  // 🟢 Insert a new value
  insert(value) {
    this.heap.push(value); // Add at the end
    this.heapifyUp(); // Restore heap property
  }

  // 🔴 Remove and return the max (root)
  remove() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const max = this.heap[0];
    this.heap[0] = this.heap.pop(); // Replace root with last element
    this.heapifyDown(); // Restore heap property

    return max;
  }

  // 🔼 Heapify Up (used during insert)
  heapifyUp() {
    let index = this.heap.length - 1;

    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);

      if (this.heap[parentIndex] >= this.heap[index]) break;

      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];

      index = parentIndex;
    }
  }

  // 🔽 Heapify Down (used during remove)
  heapifyDown() {
    let index = 0;
    let length = this.heap.length;

    while (true) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let largest = index;

      if (left < length && this.heap[left] > this.heap[largest]) {
        largest = left;
      }

      if (right < length && this.heap[right] > this.heap[largest]) {
        largest = right;
      }

      if (largest === index) break;

      [this.heap[index], this.heap[largest]] = [
        this.heap[largest],
        this.heap[index],
      ];

      index = largest;
    }
  }

  // 🧪 Utility: print the heap
  print() {
    console.log(this.heap);
  }
}

const maxHeap = new MaxHeap();

maxHeap.insert(10);
maxHeap.insert(5);
maxHeap.insert(30);
maxHeap.insert(20);

maxHeap.print(); // [30, 20, 10, 5]

console.log("Removed:", maxHeap.remove()); // 30
maxHeap.print(); // [20, 5, 10]

const kthLargest = (nums, k) => {
  const heap = [];

  function insert(value) {
    heap.push(value);
    heapifyUp();
  }

  function heapifyUp() {
    let index = heap.length - 1; // 1

    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      0;

      if (heap[parentIndex] <= heap[index]) break;

      [heap[parentIndex], heap[index]] = [heap[index], heap[parentIndex]];

      index = parentIndex;
    }
  }

  function removeMin() {
    if (heap.length === 0) return null;
    if (heap.length === 1) return heap.pop();

    heap[0] = heap.pop(); // Move last element to root
    heapifyDown();
  }

  function heapifyDown() {
    let index = 0;
    let length = heap.length;

    while (true) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let smallest = index;

      if (left < length && heap[left] < heap[smallest]) {
        smallest = left;
      }

      if (right < length && heap[right] < heap[smallest]) {
        smallest = right;
      }

      if (smallest === index) break;

      [heap[index], heap[smallest]] = [heap[smallest], heap[index]];

      index = smallest;
    }
  }

  for (let i = 0; i < nums.length; i++) {
    insert(nums[i]);
    if (heap.length > k) {
      removeMin();
    }
  }
  return heap;
};

/**
 * Problem: Find the kth largest element in an array using heap.
 */
const nums = [3, 2, 1, 5, 6, 4],
  k = 2;
console.log("This is kth largest number", kthLargest(nums, k));
