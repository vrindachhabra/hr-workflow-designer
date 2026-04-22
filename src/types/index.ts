export type NodeType = 'startNode' | 'taskNode' | 'approvalNode' | 'automatedNode' | 'endNode';

export interface WorkflowNodeData {
  label: string;
  [key: string]: any;
}

export interface FormFieldConfig {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'number';
  options?: { label: string; value: string }[];
  required?: boolean;
}

export type NodeFormConfig = Record<NodeType, FormFieldConfig[]>;

export interface AutomationTask {
  id: string;
  label: string;
  params: string[];
}

export interface SimulationLog {
  step: number;
  nodeId: string;
  nodeType: string;
  action: string;
  status: 'success' | 'error' | 'pending';
  message: string;
}
