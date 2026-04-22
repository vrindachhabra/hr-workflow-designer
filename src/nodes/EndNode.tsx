import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Flag } from 'lucide-react';
import clsx from 'clsx';

export const EndNode = ({ data, selected }: NodeProps) => {
  return (
    <div className={clsx("px-4 py-2 flex items-center gap-2", selected && "react-flow__node selected")}>
      <Handle type="target" position={Position.Left} id="a" />
      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
        <Flag size={16} />
      </div>
      <div>
        <div className="font-semibold text-gray-800">{data.label || 'End Event'}</div>
        {data.status && <div className="text-xs text-gray-500 capitalize">{data.status}</div>}
      </div>
    </div>
  );
};
