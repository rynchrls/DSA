/**
  📚 What is a Graph in DSA?
  A Graph is a non-linear data structure consisting of two components:

  Vertices (nodes) — these are points or objects.

  Edges (lines) — these connect pairs of vertices.

  🎯 Types of Graphs

  Type	         Example
  Directed	     One-way road from A ➔ B
  Undirected     A two-way road between A ↔ B
  Weighted	     Road between cities with distances
  Unweighted	 Friendships in social media
  Cyclic	     Graph that has at least one cycle
  Acyclic	     No cycles (e.g., family trees)

  ⚙️ Graph Representation
  There are two common ways to represent a graph:

  Adjacency Matrix

  A 2D array where matrix j is 1 if there is an edge from vertex i to vertex j.

  Adjacency List

  Each vertex stores a list of adjacent vertices.

 */

class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1); // For undirected graph
  }

  showGraph() {
    for (let vertex in this.adjacencyList) {
      console.log(vertex + " -> " + this.adjacencyList[vertex].join(", "));
    }
  }
}

const adjcencyList = {
  A: ["B"],
  B: ["A", "C"],
  C: ["B"],
};
const g = new Graph();
g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addEdge("A", "B");
g.addEdge("B", "C");

g.showGraph();

// Output:
// A -> B
// B -> A, C
// C -> B

// Directed Graph Implementation
class DirectedGraph {
  constructor() {
    this.adjacencyList = {}; // stores vertices and their neighbors
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }
  static var = {
    A: ["B", "C"],
    B: [],
    C: [],
  };
  addEdge(source, destination) {
    // Directed: only add edge from source ➔ destination
    if (!this.adjacencyList[source]) {
      this.addVertex(source);
    }
    if (!this.adjacencyList[destination]) {
      this.addVertex(destination);
    }
    this.adjacencyList[source].push(destination);
  }

  removeEdge(source, destination) {
    if (this.adjacencyList[source]) {
      this.adjacencyList[source] = this.adjacencyList[source].filter(
        (vertex) => vertex !== destination
      );
    }
  }

  removeVertex(vertex) {
    // Remove all edges pointing to this vertex
    for (let v in this.adjacencyList) {
      this.adjacencyList[v] = this.adjacencyList[v].filter(
        (neighbor) => neighbor !== vertex
      );
    }
    // Remove the vertex itself
    delete this.adjacencyList[vertex];
  }

  display() {
    for (let vertex in this.adjacencyList) {
      console.log(vertex + " ➔ " + this.adjacencyList[vertex].join(", "));
    }
  }
}

// Example usage
const graph = new DirectedGraph();
graph.addVertex("A");
graph.addVertex("B");
graph.addEdge("A", "B"); // A ➔ B
graph.addEdge("A", "C"); // A ➔ C
graph.addEdge("B", "D"); // B ➔ D
graph.addEdge("C", "D"); // C ➔ D

graph.display();

// Output:
// A ➔ B, C
// B ➔ D
// C ➔ D
// D ➔

/**
 * 🧠 Problem: Find if a Path Exists in a Directed Graph
 */
function hasPath(edges, start, end) {
  // Step 1: Build the graph (Adjacency List)
  const graph = buildGraph(edges);

  // Step 2: DFS to find path
  return dfs(graph, start, end);
}

function buildGraph(edges) {
  const graph = {};
  for (let [src, dst] of edges) {
    if (!(src in graph)) graph[src] = [];
    graph[src].push(dst);
  }
  return graph;
}

function dfs(graph, current, target) {
  if (current === target) return true;
  if (!graph[current]) return false; // no neighbors

  for (let neighbor of graph[current]) {
    if (dfs(graph, neighbor, target)) {
      return true;
    }
  }

  return false;
}

// Example usage:

const edges1 = [
  ["A", "B"],
  ["A", "C"],
  ["B", "D"],
  ["C", "D"],
  ["D", "E"],
];

console.log(hasPath(edges1, "A", "E")); // true
console.log(hasPath(edges1, "B", "A")); // false

const edges2 = [
  ["A", "B"],
  ["C", "D"],
];

console.log(hasPath(edges2, "A", "D")); // false
