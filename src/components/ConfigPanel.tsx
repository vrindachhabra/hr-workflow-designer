import React from 'react';
import { useWorkflow } from '../hooks/useWorkflow';
import { DynamicForm } from './DynamicForm';
import { NodeType } from '../types';
import { Settings, Trash2 } from 'lucide-react';

export const ConfigPanel = () => {
  const { nodes, selectedNodeId, updateNodeData, deleteSelected } = useWorkflow();
  
  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  if (!selectedNode) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-6 flex flex-col items-center justify-center text-center text-gray-500">
        <Settings size={32} className="mb-4 text-gray-300" />
        <p>Select a node to configure its properties.</p>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full shadow-lg z-10 relative">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h2 className="font-semibold text-gray-800 flex items-center gap-2">
          <Settings size={18} />
          Configuration
        </h2>
        <button 
          onClick={deleteSelected}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
          title="Delete Node"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="mb-4 pb-4 border-b border-gray-100">
          <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Node Type</div>
          <div className="text-sm font-semibold capitalize text-gray-700 bg-gray-100 px-2 py-1 rounded inline-block">
            {selectedNode.type?.replace('Node', '')}
          </div>
        </div>

        <DynamicForm 
          key={selectedNode.id} // Force re-render on node change
          nodeType={selectedNode.type as NodeType}
          initialData={selectedNode.data}
          onChange={(data) => updateNodeData(selectedNode.id, data)}
        />
      </div>
    </div>
  );
};
