import { useState } from 'react';
import { useWorkflow } from './useWorkflow';
import { mockApi } from '../api/mockApi';
import { SimulationLog } from '../types';

export const useSimulation = () => {
  const { nodes, edges } = useWorkflow();
  const [logs, setLogs] = useState<SimulationLog[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const runSimulation = async () => {
    setIsRunning(true);
    setLogs([]);
    setHasRun(true);

    try {
      const results = await mockApi.simulateWorkflow(nodes, edges);
      setLogs(results);
    } catch (error) {
      setLogs([{
        step: 1,
        nodeId: 'system',
        nodeType: 'system',
        action: 'Simulation Error',
        status: 'error',
        message: 'An unexpected error occurred during simulation.'
      }]);
    } finally {
      setIsRunning(false);
    }
  };

  const clearSimulation = () => {
    setLogs([]);
    setHasRun(false);
  };

  return { logs, isRunning, hasRun, runSimulation, clearSimulation };
};
