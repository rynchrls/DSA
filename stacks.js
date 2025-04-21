/** Stacks! */

// functions: push, pop, peek, length

// first usage: text palindrome
function Palindrome(txt) {
  let word = [];
  let rword = "";

  // add each letter to the word array
  for (let i = 0; i < txt.length; i++) {
    word.push(txt[i]);
  }
  // pop each letter from the word array and add to rwrod string
  for (let i = 0; i < txt.length; i++) {
    rword += word.pop();
  }
  if (txt === rword) {
    console.log(rword + " is a palindrome");
  } else {
    console.log(rword + " is not a palindrome");
  }
}
Palindrome("racecar"); // true

// second usage: create a stack class
class Stack {
  constructor() {
    this.count = 0;
    this.storage = {};
  }

  /**
   *
   * @param {*} value
   * @returns the pushed value
   */
  push(value) {
    this.storage[this.count] = value;
    this.count++;
    return value;
  }

  /**
   *
   * @returns the popped value (which is the last value added to the stack)
   */
  pop() {
    if (this.count === 0) return undefined;

    this.count--;
    const result = this.storage[this.count];
    delete this.storage[this.count];
    return result;
  }

  /**
   *
   * @returns the last value added to the stack (without removing it)
   */
  peek() {
    return this.storage[this.count - 1];
  }

  /**
   *
   * @returns the number of elements in the stack
   */
  length() {
    return this.count;
  }
}

const myStack = new Stack();
myStack.push(1); // 1
myStack.push(2); // 2
myStack.push(3); // 3
myStack.pop(); // 3
myStack.peek(); // 2
myStack.length(); // 2


/**
 * Problem: Valid Parentheses
 * @param {*} s
 * @returns {Boolean}
 */
const isValid = (s) => {
  const regex = /[(){}[\]]/g;
  if (!s.match(regex)) return "dsadsa";
  const stack = new Stack();
  const map = {
    ")": "(",
    "}": "{",
    "]": "[",
  };
  for (let i = 0; i < s.length; i++) {
    if (Object.keys(map).includes(s[i])) {
      const top = stack.pop();
      if (top !== map[s[i]]) {
        return false;
      }
    } else {
      stack.push(s[i]);
    }
  }
  return stack.length() === 0;
};
console.log(isValid("((()))"));


/**
 * Problem: Next Greater Element
 * @param {*} arr 
 * @returns {Array}
 */
const nextGreaterElement = (arr) => {
  let stack = [];
  let result = new Array(arr.length).fill(-1); // Initialize result array with -1

  for (let i = arr.length - 1; i >= 0; i--) {
    // Remove elements from stack that are smaller than or equal to current element
    while (stack.length > 0 && stack[stack.length - 1] <= arr[i]) {
      stack.pop();
    }

    // If stack is not empty, the top element is the next greater element
    if (stack.length > 0) {
      result[i] = stack[stack.length - 1];
    }

    // Push current element onto stack
    stack.push(arr[i]);
  }

  return result;
};
console.log(nextGreaterElement([4, 5, 2, 10, 8])); // [5, 10, 10, -1, -1]


/**
 * Problem: Evaluate Reverse Polish Notation (RPN)
 * @param {*} tokens 
 * @returns {Number}
 */
const evalRPN = (tokens) => {
  const stack = [];
  const operator = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => Math.trunc(a / b),
  };

  let result = 0;

  for (let i = 0; i < tokens.length; i++) {
    if (operator[tokens[i]]) {
      if (result > 0 && stack.length === 1) {
        const b = stack.pop();
        const res = operator[tokens[i]]?.(result, parseInt(b));
        result = res;
      } else {
        const b = stack.pop();
        const a = stack.pop();
        const res = operator[tokens[i]]?.(parseInt(a), parseInt(b));
        result = res;
      }
    } else {
      stack.push(tokens[i]);
    }
  }

  return result;
};

console.log(evalRPN(["4", "13", "5", "/", "+"])); // 9


/**
 * Problem: Stock Span Problem
 * @param {*} prices 
 * @returns {Array}
 */
const stockSpan = (prices) => {
  const stack = [];
  const span = new Array(prices.length).fill(1);

  for (let i = 0; i < prices.length; i++) {
    while (stack.length > 0 && prices[stack[stack.length - 1]] <= prices[i]) {
      stack.pop();
    }

    if (stack.length === 0) {
      span[i] = 1;
    } else {
      span[i] = i - stack[stack.length - 1];
    }

    stack.push([i]);
  }
  return span;
};

const prices = [100, 80, 60, 70, 60, 75, 85];

const span = stockSpan(prices);
console.log(span); // [1, 1, 1, 2, 1, 4, 6]


/**
 * Problem: Daily Temperature
 * @param {*} temperatures 
 * @returns {Array}
 */
const dailyTemp = (temperatures) => {
  const result = new Array(temperatures.length).fill(0); // to store the result
  const stack = []; // store indices
  const res = [1, 1, 4, 2, 1, 1, 0, 0];

  for (let i = 0; i < temperatures.length; i++) {
    while (
      stack.length > 0 &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      const prevIndex = stack.pop();
      result[prevIndex] = i - prevIndex;
    }

    stack.push(i);
  }

  return result;
};

const temp = [73, 74, 75, 71, 69, 72, 76, 73];
console.log(dailyTemp(temp));



/**
 * Problem: Trapping Rain Water
 * @param {*} height 
 * @returns {Number}
 */
const trap = (height) => {
  const stack = [];
  let water = 0;

  for (let i = 0; i < height.length; i++) {
    while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
      const prev = stack.pop();
      water += height[i] * height[i + 1] - height[prev];
    }

    stack.push(i);
  }
  return water;
};

const height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
console.log(trap(height)); // 6


/**
 * Remove Adjacent
 * @param {*} s 
 * @returns {String}
 */
const removeSameAdjacent = (s) => {
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    if (stack.length > 0 && stack[stack.length - 1] === s[i]) {
      stack.pop();
    } else {
      stack.push(s[i]);
    }
  }

  return stack.join("");
};

console.log(removeSameAdjacent("abasdasbaca")); // "ca"


/**
 * Encode String
 * @param {*} s 
 * @returns {String}
 */
const encodedString = (s) => {
  const numStack = [];
  const strStack = [];
  let currentStr = "";
  let currentNum = 0;
  let cBracket = "";

  for (let i = 0; i < s.length; i++) {
    if (!isNaN(s[i])) {
      currentNum = currentNum * 10 + Number(s[i]);
    } else if (s[i] === "[") {
      numStack.push(currentNum);
      if (currentStr === "") {
        strStack.push("");
      } else {
        strStack.push(currentStr);
      }
      currentNum = 0;
      cBracket = s[i];
      currentStr = "";
    } else if (s[i] === "]") {
      const repeatCount = numStack.pop();
      const prevStr = strStack.pop();
      currentStr = prevStr.concat(...Array(repeatCount).fill(currentStr));
      cBracket = "";
    } else {
      if (cBracket === "[") {
        currentStr += s[i];
      } else {
        currentStr = s[i];
      }
    }
  }
  return currentStr;
};

console.log(encodedString("z3[ax2[bcd]]"));


/**
 * Problem: Remove 3 digits from a string
 * @param {*} num 
 * @param {*} digit 
 * @returns {String of Number}
 */
const remove3Digits = (num, digit) => {
  const stack = [];
  let count = 0;

  for (let i = 0; i < num.length; i++) {
    if (stack.length > 0 && stack[stack.length - 1] > num[i] && count < digit) {
      count++;
      stack.pop();
    }
    stack.push(num[i]);
  }
  stack.length > 1 ? (stack[0] = "") : null;
  return stack.join("");
};

const num = "10";
const k = 2;
console.log(remove3Digits(num, k)); // 0
