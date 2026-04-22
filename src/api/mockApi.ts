import { AutomationTask, SimulationLog } from '../types';
import { Node, Edge } from 'reactflow';
import { validateWorkflow } from '../utils/validation';

export const mockApi = {
  getAutomations: async (): Promise<AutomationTask[]> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    return [
      { id: 'send_email', label: 'Send Email', params: ['to', 'subject'] },
      { id: 'generate_doc', label: 'Generate Document', params: ['template', 'recipient'] },
      { id: 'update_db', label: 'Update Database', params: ['table', 'recordId'] },
      { id: 'notify_slack', label: 'Notify Slack', params: ['channel', 'message'] }
    ];
  },

  simulateWorkflow: async (nodes: Node[], edges: Edge[]): Promise<SimulationLog[]> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const validation = validateWorkflow(nodes, edges);
    if (!validation.valid) {
      return validation.errors.map((err, idx) => ({
        step: idx + 1,
        nodeId: 'system',
        nodeType: 'system',
        action: 'Validation Failed',
        status: 'error',
        message: err
      }));
    }

    const logs: SimulationLog[] = [];
    
    // Create adjacency list
    const adjList: Record<string, string[]> = {};
    const inDegree: Record<string, number> = {};
    
    nodes.forEach(n => {
      adjList[n.id] = [];
      inDegree[n.id] = 0;
    });

    edges.forEach(e => {
      adjList[e.source].push(e.target);
      inDegree[e.target] = (inDegree[e.target] || 0) + 1;
    });

    // Find start node
    const startNode = nodes.find(n => n.type === 'startNode');
    if (!startNode) return [];

    let currentNodes = [startNode.id];
    let step = 1;

    // BFS execution traversal (simplified simulation)
    while (currentNodes.length > 0) {
      const nextNodes: string[] = [];
      
      for (const nodeId of currentNodes) {
        const node = nodes.find(n => n.id === nodeId)!;
        
        logs.push({
          step: step++,
          nodeId: node.id,
          nodeType: node.type || 'unknown',
          action: `Executing ${node.data?.label || node.type}`,
          status: 'success',
          message: `Processed node successfully.`
        });

        const neighbors = adjList[nodeId] || [];
        for (const neighbor of neighbors) {
          inDegree[neighbor]--;
          if (inDegree[neighbor] === 0) {
            nextNodes.push(neighbor);
          }
        }
      }
      currentNodes = nextNodes;
    }

    return logs;
  }
};
