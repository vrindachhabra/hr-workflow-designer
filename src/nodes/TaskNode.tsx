import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { UserCheck } from 'lucide-react';
import clsx from 'clsx';

export const TaskNode = ({ data, selected }: NodeProps) => {
  return (
    <div className={clsx("px-4 py-2 min-w-[150px]", selected && "react-flow__node selected")}>
      <Handle type="target" position={Position.Left} id="a" />
      <div className="flex items-center gap-2 mb-2 border-b border-gray-100 pb-2">
        <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center text-blue-600">
          <UserCheck size={14} />
        </div>
        <div className="font-semibold text-gray-800 text-sm">{data.label || 'User Task'}</div>
      </div>
      {data.assignee && (
        <div className="text-xs text-gray-600">
          <span className="font-medium">Assignee:</span> {data.assignee}
        </div>
      )}
      <Handle type="source" position={Position.Right} id="b" />
    </div>
  );
};
