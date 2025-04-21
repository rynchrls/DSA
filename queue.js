/** QUEUE
   Enqueue – Add an element to the rear of the queue.

   Dequeue – Remove an element from the front of the queue.

   Front – Get the element at the front of the queue without removing it.

   isEmpty – Check if the queue is empty.

   isFull – (For fixed-size queues) Check if the queue is full.
*/

/** TYPES OF QUEUE

  Circular Queue – Connects end to beginning to reuse empty space.

  Priority Queue – Each element has a priority; higher priority is dequeued first.

  Deque (Double-ended Queue) – Insertion and removal can happen from both ends.

*/

class Queue {
  constructor() {
    this.items = [];
  }

  // Enqueue
  enqueue(element) {
    this.items.push(element);
  }

  // Dequeue
  dequeue() {
    if (this.isEmpty()) return "Queue is empty";
    return this.items.shift();
  }

  // Front
  front() {
    return this.isEmpty() ? "Queue is empty" : this.items[0];
  }

  // Check if empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Display queue
  printQueue() {
    console.log(this.items.join(" <- "));
  }
}

// Example usage
const queue = new Queue();
queue.enqueue("A");
queue.enqueue("B");
queue.enqueue("C");
queue.printQueue(); // A <- B <- C
console.log(queue.dequeue()); // A
queue.printQueue(); // B <- C

/**
 * Identifies the first non repeating from a string
 * @param {*} stream
 * @returns {string}
 */
function firstNonRepeating(stream) {
  const freq = {};
  const queue = [];
  let result = "";

  for (let char of stream) {
    // Count frequency
    freq[char] = (freq[char] || 0) + 1;

    // Push to queue
    queue.push(char);

    // Remove all repeating chars from the front
    while (queue.length && freq[queue[0]] > 1) {
      queue.shift();
    }

    // Append result
    result += queue.length ? queue[0] : "#";
  }

  return result;
}
console.log(firstNonRepeating("aabc")); // Output: a#bb

/**
 * Sample problem for circular queue
 * @param {*} petrol
 * @param {*} distance
 * @returns {number}
 */
const circularTour = (petrol, distance) => {
  let total = 0;
  let tank = 0;
  let start = 0;

  for (let i = 0; i < petrol.length; i++) {
    const gain = petrol[i] - distance[i];
    total += gain;
    tank += gain;

    if (tank < 0) {
      // can't reach next pump, reset start
      start = i + 1;
      tank = 0;
    }
  }

  return total >= 0 ? start : -1;
};
const petrol = [4, 6, 7, 4];
const distance = [6, 5, 3, 5];
console.log(circularTour(petrol, distance));

/**
 * Deque Sample Problem
 * @param {*} nums
 * @param {*} k
 * @returns
 */
const slidingWindowMaximum = (nums, k) => {
  const deque = []; // will store indices
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    // Remove indices that are out of the current window
    if (deque.length && deque[0] <= i - k) {
      deque.shift();
    }

    // Remove smaller values from the end of the deque
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }

    // Push current index to deque
    deque.push(i);

    // Start adding results after the first window is complete
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
};

const integer = [1, 3, -1, -3, 5, 3, 6, 7];
const size = 3;
console.log(slidingWindowMaximum(integer, size));

/**
 * Collect all first negative integer for specific window
 * @param {*} nums
 * @param {*} k
 * @returns {Array}
 */
const firstNegativeInteger = (nums, k) => {
  const deque = [];
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    if (deque.length && deque[0] <= i - k) {
      deque.shift();
    }

    while (deque.length && nums[deque[deque.length - 1]] > 0) {
      deque.pop();
    }

    deque.push(i);

    if (i >= k - 1) {
      result.push(nums[deque[0]] < 0 ? nums[deque[0]] : 0);
    }
  }
  return result;
};

const integer1 = [12, -1, -7, 8, 15, 30, 16, 28];
const k1 = 3;
console.log(firstNegativeInteger(integer1, k1));

/**
 * class for priority queue
 */
class KthLargest {
  constructor(k, nums) {
    this.k = k;
    this.minHeap = [];

    // Build the heap with the first k elements.
    for (let num of nums) {
      this.add(num);
    }
  }

  add(val) {
    // Add the new value to the heap
    this.minHeap.push(val);

    // Sort the heap to maintain the order (or use heapify logic)
    this.minHeap.sort((a, b) => a - b);

    // If there are more than k elements, remove the smallest one (i.e., the first in the sorted array)
    if (this.minHeap.length > this.k) {
      this.minHeap.shift(); // Remove the smallest element
    }

    // The k-th largest element is now the smallest element in the heap
    return this.minHeap[0]; // Return the k-th largest
  }
}

// Usage example:
const kthLargest = new KthLargest(3, [4, 5, 8, 2]);
console.log(kthLargest.add(3)); // returns 4
console.log(kthLargest.add(5)); // returns 5
console.log(kthLargest.add(10)); // returns 5
console.log(kthLargest.add(9)); // returns 8
console.log(kthLargest.add(4)); // returns 8

/**
 * class for circular queue
 */
class CircularQueue {
  constructor(size) {
    this.size = size;
    this.queue = new Array(size);
    this.front = -1;
    this.rear = -1;
  }

  // Enqueue operation
  enqueue(val) {
    if ((this.rear + 1) % this.size === this.front) {
      console.log("Queue is full");
    } else {
      if (this.front === -1) this.front = 0; // First element to enqueue
      this.rear = (this.rear + 1) % this.size;
      this.queue[this.rear] = val;
    }
  }

  // Dequeue operation
  dequeue() {
    if (this.front === -1) {
      console.log("Queue is empty");
      return;
    }
    let removedValue = this.queue[this.front];
    if (this.front === this.rear) {
      this.front = this.rear = -1; // Reset when the queue is empty
    } else {
      this.front = (this.front + 1) % this.size;
    }
    return removedValue;
  }

  // Peek operation
  peek() {
    if (this.front === -1) {
      console.log("Queue is empty");
      return;
    }
    return this.queue[this.front];
  }

  // Check if the queue is empty
  isEmpty() {
    return this.front === -1;
  }

  // Check if the queue is full
  isFull() {
    return (this.rear + 1) % this.size === this.front;
  }
}

// Usage example:
let cq = new CircularQueue(5);
cq.enqueue(10);
cq.enqueue(20);
cq.enqueue(30);
cq.enqueue(40);
cq.enqueue(50);
console.log(cq.dequeue()); // 10
cq.enqueue(60);
console.log(cq.peek()); // 20
