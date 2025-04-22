/**
  🔍 What is a Hash Table?
  A hash table (or hash map) is a data structure that stores key-value pairs. It's designed to quickly access data using a key.

  It uses a hash function to compute an index (or hash code) into an array of buckets or slots, from which the desired value can 
  be found.

  ⚠️ Collision Handling
  Sometimes, different keys generate the same index. This is called a collision.

  Common ways to handle it:

  Chaining: Use a linked list at each index to store multiple key-value pairs.

  Open Addressing: Find another empty slot in the array.
 */

class HashTable {
  constructor(size) {
    this.size = size;
    this.buckets = new Array(size).fill(null).map(() => []); // 2d array
  }

  // Hash function
  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i); // simple character code sum
    }
    return hash % this.size;
  }

  // Insert or update key-value pair
  set(key, value) {
    const index = this._hash(key);
    const bucket = this.buckets[index];

    // Check if key already exists and update
    for (let pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }

    // If key doesn't exist, push new pair
    bucket.push([key, value]);
  }

  // Retrieve value by key
  get(key) {
    const index = this._hash(key);
    const bucket = this.buckets[index];

    for (let pair of bucket) {
      if (pair[0] === key) {
        return pair[1];
      }
    }

    return undefined;
  }

  // Remove key-value pair
  remove(key) {
    const index = this._hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        return true;
      }
    }

    return false;
  }

  // Optional: display contents of the hash table
  display() {
    console.log("Hash Table:");
    this.buckets.forEach((bucket, i) => {
      if (bucket.length > 0) {
        console.log(`Index ${i}:`, bucket);
      }
    });
  }

  countRecurringWord(key) {
    const arrOfWords = key.split(" ");
    const myHash = new Array(10).fill(null).map(() => []);
    const listOfWords = {};

    const get = (key) => {
      const index = this._hash(key);
      const bucket = myHash[index];

      for (let pair of bucket) {
        if (pair[0] === key) {
          return pair;
        }
      }

      return undefined;
    };

    const set = (key, value) => {
      const index = this._hash(key);
      const bucket = myHash[index];

      // Check if key already exists and update
      for (let pair of bucket) {
        if (pair[0] === key) {
          pair[1] = value;
          return;
        }
      }

      // If key doesn't exist, push new pair
      bucket.push([key, value]);
    };

    for (let i = 0; i < arrOfWords.length; i++) {
      const index = this._hash(arrOfWords[i]);
      const bucket = myHash[index];

      const isIncluded = get(arrOfWords[i]);

      if (isIncluded) {
        set(isIncluded[0], isIncluded[1] + 1);
        listOfWords[arrOfWords[i]] += 1;
      } else {
        bucket.push([arrOfWords[i], 1]);
        listOfWords[arrOfWords[i]] = 1;
      }
    }

    return listOfWords;
  }
}

/**
 * Example Usage
 */
const myHashTable = new HashTable(10);

myHashTable.set("apple", 50);
myHashTable.set("banana", 100);
myHashTable.set("orange", 150);

console.log(myHashTable.get("apple")); // 50
console.log(myHashTable.get("banana")); // 100

myHashTable.remove("banana");
console.log(myHashTable.get("banana")); // undefined

myHashTable.display();

/**
 * Sample Problem
 * Create a system to count how many times each word appears in a given sentence using your custom hash table.
 */

const sentence = "apple banana apple grape banana apple";

console.log("THESE ARE THE WORDS", myHashTable.countRecurringWord(sentence));
