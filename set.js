const mySet = new Set();

mySet.add(1);
mySet.add(2);
mySet.add(2); // Duplicate, will be ignored
mySet.add("hello");

// console.log(mySet); // Output: Set(3) {1, 2, 'hello'}
// console.log(mySet.has(2)); // true
// console.log(mySet.size); // 3

/**
 * .add(value) – adds a value to the set.

   .has(value) – checks if the value is in the set.

   .delete(value) – removes a value.

   .clear() – removes everything.

   .size – returns the number of unique elements.


 */
/**
 * Challenge: Find the First Repeating Element
 */
const repeatingElement = (element) => {
  const seen = new Set();
  for (let i = 0; i < element.length; i++) {
    if (seen.has(element[i])) {
      return element[i];
    }
    seen.add(element[i]);
  }
  return seen;
};
const element = [2, 5, 1, 2, 3, 5, 1, 2, 4];
console.log(repeatingElement(element));

/**
 * Problem: Remove Duplicate
 * @param {*} duplicate
 * @returns {Number}
 */
const removeDuplicate = (duplicate) => {
  const nonDuplicate = new Set();

  for (let i = 0; i < duplicate.length; i++) {
    if (!nonDuplicate.has(duplicate[i])) {
      nonDuplicate.add(duplicate[i]);
    }
  }

  return nonDuplicate;
};

const duplicate = [1, 2, 2, 3, 4, 4, 5];
console.log(removeDuplicate(duplicate));

/**
 * Problem: Get All Duplicates
 * @param {*} dup
 * @returns {Array}
 */
const allDuplicate = (dup) => {
  const mySet = new Set();
  const duplicatesSet = new Set();
  for (let i = 0; i < dup.length; i++) {
    if (mySet.has(dup[i])) {
      duplicatesSet.add(dup[i]); // avoids O(n) includes
    } else {
      mySet.add(dup[i]);
    }
  }
  return [...duplicatesSet];
};

const duplicate2 = [4, 3, 2, 7, 8, 2, 3, 1, 3, 3, 3, 3];
console.log(allDuplicate(duplicate2));

/**
 * Problem: Check if the strings are anagram
 * @param {*} str1
 * @param {*} str2
 * @returns {Boolean}
 */
const anagram = (str1, str2) => {
  if (str1.length !== str2.length) return false;

  const count1 = {};
  const count2 = {};

  for (let char of str1) {
    count1[char] = (count1[char] || 0) + 1;
  }

  for (let char of str2) {
    count2[char] = (count2[char] || 0) + 1;
  }

  for (let key in count1) {
    if (count1[key] !== count2[key]) return false;
  }

  return true;
};

const input1 = "aabb";
const input2 = "bbaa";
console.log(anagram(input1, input2));

/**
 * Problem: Missing N from number sequel
 * @param {*} num
 * @returns {Array}
 */
const missingN = (num) => {
  let result = [];
  let prevNum = 0;

  for (let i = 0; i < num.length; i++) {
    while (num[i] !== prevNum + 1 && i > 0) {
      prevNum += 1;
      result.push(prevNum);
    }
    prevNum = num[i];
  }
  return result;
};

const numArr = [1, 5];
console.log(missingN(numArr));

/**
 * Problem: find the intersection from 2 arrays
 * @param {*} input
 * @param {*} input2
 * @returns {Array}
 */
const intersection = (input, input2) => {
  const mySet = new Set(input);
  const duplicate = new Set();

  for (let i = 0; i < input2.length; i++) {
    if (mySet.has(input2[i])) {
      duplicate.add(input2[i]);
    }
  }
  return [...duplicate];
};

const input3 = [1, 2, 2, 1];
const input4 = [2, 2];

console.log(intersection(input3, input4));
