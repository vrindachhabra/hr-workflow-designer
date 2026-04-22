import React from 'react';
import { NodeType } from '../types';
import { Play, UserCheck, ShieldCheck, Zap, Flag } from 'lucide-react';

const nodeTypes = [
  { type: 'startNode', label: 'Start Event', icon: Play, color: 'text-green-600', bg: 'bg-green-100' },
  { type: 'taskNode', label: 'User Task', icon: UserCheck, color: 'text-blue-600', bg: 'bg-blue-100' },
  { type: 'approvalNode', label: 'Approval', icon: ShieldCheck, color: 'text-orange-600', bg: 'bg-orange-100' },
  { type: 'automatedNode', label: 'Automation', icon: Zap, color: 'text-purple-600', bg: 'bg-purple-100' },
  { type: 'endNode', label: 'End Event', icon: Flag, color: 'text-red-600', bg: 'bg-red-100' }
];

export const Sidebar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string, defaultLabel: string) => {
    event.dataTransfer.setData('application/reactflow/type', nodeType);
    event.dataTransfer.setData('application/reactflow/label', defaultLabel);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col h-full z-10 shadow-sm relative">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">Workflow Designer</h1>
        <p className="text-sm text-gray-500 mt-1">Drag and drop nodes to build your process.</p>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        <div className="space-y-3">
          {nodeTypes.map(({ type, label, icon: Icon, color, bg }) => (
            <div
              key={type}
              className="p-3 border border-gray-200 rounded-lg cursor-grab hover:shadow-md hover:border-gray-300 transition-all flex items-center gap-3 bg-white"
              onDragStart={(event) => onDragStart(event, type, label)}
              draggable
            >
              <div className={`w-8 h-8 rounded ${bg} flex items-center justify-center ${color}`}>
                <Icon size={16} />
              </div>
              <span className="font-medium text-gray-700 text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400">
        HR Operations Platform
      </div>
    </div>
  );
};
