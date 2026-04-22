import React from 'react';
import { useSimulation } from '../hooks/useSimulation';
import { PlayCircle, AlertCircle, CheckCircle, RefreshCcw, XCircle } from 'lucide-react';
import clsx from 'clsx';

export const SimulationPanel = () => {
  const { logs, isRunning, hasRun, runSimulation, clearSimulation } = useSimulation();

  return (
    <div className="absolute bottom-4 left-4 right-80 bg-white border border-gray-200 rounded-lg shadow-xl z-20 overflow-hidden flex flex-col max-h-[300px]">
      <div className="p-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <PlayCircle size={18} className="text-blue-500" />
          Simulation Engine
        </h3>
        <div className="flex gap-2">
          {hasRun && (
            <button 
              onClick={clearSimulation}
              className="text-xs px-3 py-1.5 border border-gray-300 rounded bg-white hover:bg-gray-50 font-medium flex items-center gap-1"
            >
              <RefreshCcw size={12} /> Clear
            </button>
          )}
          <button 
            onClick={runSimulation}
            disabled={isRunning}
            className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium disabled:opacity-50 flex items-center gap-1 shadow-sm"
          >
            {isRunning ? 'Running...' : 'Run Simulation'}
          </button>
        </div>
      </div>
      
      {hasRun && (
        <div className="p-4 overflow-y-auto bg-gray-50 flex-1">
          {logs.length === 0 ? (
            <div className="text-sm text-gray-500 italic">No execution logs generated. Ensure you have a valid start node.</div>
          ) : (
            <div className="space-y-3">
              {logs.map((log, idx) => (
                <div key={idx} className="flex gap-3 text-sm bg-white p-3 border border-gray-100 rounded shadow-sm">
                  <div className="mt-0.5 flex-shrink-0">
                    {log.status === 'success' && <CheckCircle size={16} className="text-green-500" />}
                    {log.status === 'error' && <XCircle size={16} className="text-red-500" />}
                    {log.status === 'pending' && <AlertCircle size={16} className="text-orange-500" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">
                      Step {log.step}: {log.action}
                    </div>
                    <div className={clsx("text-xs mt-1", log.status === 'error' ? "text-red-600 font-medium" : "text-gray-600")}>
                      {log.message}
                    </div>
                    {log.nodeId !== 'system' && (
                      <div className="text-[10px] text-gray-400 mt-1 uppercase">
                        Node ID: {log.nodeId}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
