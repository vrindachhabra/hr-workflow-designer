import { Node, Edge } from 'reactflow';
import { NodeType } from '../types';

export const validateWorkflow = (nodes: Node[], edges: Edge[]): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // 1. Must have exactly one Start Node
  const startNodes = nodes.filter((n) => n.type === 'startNode');
  if (startNodes.length === 0) {
    errors.push('Workflow must have a Start Node.');
  } else if (startNodes.length > 1) {
    errors.push('Workflow can only have one Start Node.');
  }

  // 2. Check for disconnected nodes (simple reachability from start)
  if (startNodes.length === 1) {
    const visited = new Set<string>();
    const stack = [startNodes[0].id];
    
    // Adjacency list
    const adjList: Record<string, string[]> = {};
    nodes.forEach(n => adjList[n.id] = []);
    edges.forEach(e => {
      if (adjList[e.source]) {
        adjList[e.source].push(e.target);
      }
    });

    while (stack.length > 0) {
      const current = stack.pop()!;
      if (!visited.has(current)) {
        visited.add(current);
        const neighbors = adjList[current] || [];
        for (const neighbor of neighbors) {
          stack.push(neighbor);
        }
      }
    }

    const unreachable = nodes.filter(n => !visited.has(n.id));
    if (unreachable.length > 0) {
      errors.push(`There are ${unreachable.length} disconnected node(s). All nodes must be reachable from the Start Node.`);
    }
  }

  // 3. Very basic cycle prevention check (DAG check using DFS)
  const isCyclic = () => {
    const visited = new Set<string>();
    const recStack = new Set<string>();
    const adjList: Record<string, string[]> = {};
    nodes.forEach(n => adjList[n.id] = []);
    edges.forEach(e => {
      if (adjList[e.source]) adjList[e.source].push(e.target);
    });

    const dfs = (nodeId: string): boolean => {
      if (!visited.has(nodeId)) {
        visited.add(nodeId);
        recStack.add(nodeId);

        const neighbors = adjList[nodeId] || [];
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor) && dfs(neighbor)) {
            return true;
          } else if (recStack.has(neighbor)) {
            return true;
          }
        }
      }
      recStack.delete(nodeId);
      return false;
    };

    for (const node of nodes) {
      if (dfs(node.id)) return true;
    }
    return false;
  };

  if (isCyclic()) {
    errors.push('Workflow contains cycles. Only Directed Acyclic Graphs (DAGs) are allowed.');
  }

  return {
    valid: errors.length === 0,
    errors
  };
};
