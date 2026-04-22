import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Zap } from 'lucide-react';
import clsx from 'clsx';

export const AutomatedNode = ({ data, selected }: NodeProps) => {
  return (
    <div className={clsx("px-4 py-2 min-w-[150px] border-purple-200", selected && "react-flow__node selected ring-purple-500 border-purple-500")}>
      <Handle type="target" position={Position.Left} id="a" />
      <div className="flex items-center gap-2 mb-2 border-b border-purple-100 pb-2">
        <div className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center text-purple-600">
          <Zap size={14} />
        </div>
        <div className="font-semibold text-gray-800 text-sm">{data.label || 'Automation'}</div>
      </div>
      {data.actionType && (
        <div className="text-xs text-gray-600">
          <span className="font-medium">Action:</span> {data.actionType}
        </div>
      )}
      <Handle type="source" position={Position.Right} id="b" />
    </div>
  );
};
