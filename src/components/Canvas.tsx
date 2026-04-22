import React, { useCallback, useRef } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap,
  ReactFlowProvider,
  Node,
  useReactFlow
} from 'reactflow';
import 'reactflow/dist/style.css';

import { useWorkflow } from '../hooks/useWorkflow';
import { nodeTypes as customNodeTypes } from '../nodes';
import { generateId } from '../utils/ids';
import { SimulationPanel } from './SimulationPanel';

const FlowCanvas = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { 
    nodes, edges, onNodesChange, onEdgesChange, onConnect, 
    addNode, setSelectedNodeId 
  } = useWorkflow();

  const { screenToFlowPosition } = useReactFlow();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow/type');
      const defaultLabel = event.dataTransfer.getData('application/reactflow/label');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: generateId(),
        type,
        position,
        data: { label: defaultLabel },
      };

      addNode(newNode);
    },
    [addNode, screenToFlowPosition]
  );

  return (
    <div className="flex-1 h-full relative" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={customNodeTypes}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onNodeClick={(_, node) => setSelectedNodeId(node.id)}
        onPaneClick={() => setSelectedNodeId(null)}
        fitView
      >
        <Background color="#ccc" gap={16} />
        <Controls />
        <MiniMap zoomable pannable />
      </ReactFlow>
      <SimulationPanel />
    </div>
  );
};

export const Canvas = () => (
  <ReactFlowProvider>
    <FlowCanvas />
  </ReactFlowProvider>
);
