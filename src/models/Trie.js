class TrieNode {
    constructor() {
      this.children = new Map();
      this.isEndOfWord = false;
    }
  }
  
  class Trie {
    constructor() {
      this.root = new TrieNode();
    }
  
    insert(word) {
      let node = this.root;
  
      for (let i = 0; i < word.length; i++) {
        const char = word.charAt(i);
  
        if (!node.children.has(char)) {
          node.children.set(char, new TrieNode());
        }
  
        node = node.children.get(char);
      }
  
      node.isEndOfWord = true;
    }
  
    search(word) {
      let node = this.root;
  
      for (let i = 0; i < word.length; i++) {
        const char = word.charAt(i);
  
        if (!node.children.has(char)) {
          return false;
        }
  
        node = node.children.get(char);
      }
  
      return node.isEndOfWord;
    }
  
    startsWith(prefix) {
      let node = this.root;
  
      for (let i = 0; i < prefix.length; i++) {
        const char = prefix.charAt(i);
  
        if (!node.children.has(char)) {
          return false;
        }
  
        node = node.children.get(char);
      }
  
      return true;
    }
  }

const trie = new Trie();

trie.insert("apple");
console.log(trie.search("apple"));   // Output: true
console.log(trie.search("app"));     // Output: false
console.log(trie.startsWith("app")); // Output: true
trie.insert("app");
console.log(trie.search("app"));     // Output: true