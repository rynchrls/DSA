/**
  🔍 What is a Trie?
  A Trie (pronounced “try”) is a tree-like data structure used to efficiently store and retrieve keys in a dataset of strings. 
  It’s particularly useful for dictionaries, spell-checkers, and autocomplete features.

  Each node in a Trie typically represents a single character, and paths down the tree represent words or prefixes. 

  📦 Key Characteristics:
  Each node can have multiple children (usually 26 if lowercase a–z is used).

  Every path from the root to a node forms a prefix of some word.

  A special marker (isEndOfWord) is often used to indicate the end of a valid word.

  🔧 Operations:
  Insert a word

  Search for a word

  Check for prefix
 */

class TrieNode {
  constructor() {
    this.children = {}; // e.g., { a: TrieNode, b: TrieNode }
    this.isEndOfWord = false; // true if this node ends a valid word
  }
}

const root = {
  children: {
    a: {
      children: {
        p: {
          children: {
            p: {
              children: {
                l: {
                  children: { e: { children: {}, isEndOfWord: true } },
                  isEndOfWord: false,
                },
              },
              isEndOfWord: true,
            },
          },
          isEndOfWord: false,
        },
      },
      isEndOfWord: false,
    },
  },
  isEndOfWord: false,
};

class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  insert(word) {
    let node = this.root;
    // a p
    for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  search(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return node.isEndOfWord;
  }

  startsWith(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return true;
  }

  saveWords(words) {
    for (let i = 0; i < words.length; i++) {
      let node = this.root;
      for (let char of words[i]) {
        if (!node.children[char]) {
          node.children[char] = new TrieNode();
        }
        node = node.children[char];
      }
      node.isEndOfWord = true;
    }

    return this.root;
  }

  autoComplete(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if (!node.children[char]) return []; // No words found with this prefix
      node = node.children[char];
    }

    const results = [];

    const findWords = (node, currentPrefix) => {
      if (node.isEndOfWord) {
        results.push(currentPrefix);
      }
      for (let char in node.children) {
        findWords(node.children[char], currentPrefix + char);
      }
    };

    findWords(node, prefix);
    return results;
  }
}

// Usage
const trie = new Trie();

const words = [
  "apple",
  "app",
  "application",
  "banana",
  "bat",
  "batch",
  "batman",
];

/**
 *  Problem: Autocomplete System / Prefix Search
 */
console.log("Save the words", trie.saveWords(words));
console.log("This is auto complete system", trie.autoComplete("app"));
