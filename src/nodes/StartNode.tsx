import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Play } from 'lucide-react';
import clsx from 'clsx';

export const StartNode = ({ data, selected }: NodeProps) => {
  return (
    <div className={clsx("px-4 py-2 flex items-center gap-2", selected && "react-flow__node selected")}>
      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
        <Play size={16} />
      </div>
      <div>
        <div className="font-semibold text-gray-800">{data.label || 'Start Event'}</div>
        {data.triggerType && <div className="text-xs text-gray-500 capitalize">{data.triggerType} Trigger</div>}
      </div>
      <Handle type="source" position={Position.Right} id="a" />
    </div>
  );
};
