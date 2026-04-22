import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { ShieldCheck } from 'lucide-react';
import clsx from 'clsx';

export const ApprovalNode = ({ data, selected }: NodeProps) => {
  return (
    <div className={clsx("px-4 py-2 min-w-[150px] border-orange-200", selected && "react-flow__node selected ring-orange-500 border-orange-500")}>
      <Handle type="target" position={Position.Left} id="a" />
      <div className="flex items-center gap-2 mb-2 border-b border-orange-100 pb-2">
        <div className="w-6 h-6 rounded bg-orange-100 flex items-center justify-center text-orange-600">
          <ShieldCheck size={14} />
        </div>
        <div className="font-semibold text-gray-800 text-sm">{data.label || 'Approval'}</div>
      </div>
      {data.approverRole && (
        <div className="text-xs text-gray-600">
          <span className="font-medium">Role:</span> {data.approverRole}
        </div>
      )}
      <Handle type="source" position={Position.Right} id="b" />
    </div>
  );
};
