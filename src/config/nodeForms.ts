import { NodeFormConfig } from '../types';

export const nodeFormConfigs: NodeFormConfig = {
  startNode: [
    { key: 'label', label: 'Trigger Name', type: 'text', required: true },
    { key: 'triggerType', label: 'Trigger Type', type: 'select', options: [
      { label: 'Manual', value: 'manual' },
      { label: 'Schedule', value: 'schedule' },
      { label: 'API Event', value: 'api' }
    ]}
  ],
  taskNode: [
    { key: 'label', label: 'Task Name', type: 'text', required: true },
    { key: 'assignee', label: 'Assignee Email', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'dueDate', label: 'Days to complete', type: 'number' }
  ],
  approvalNode: [
    { key: 'label', label: 'Approval Title', type: 'text', required: true },
    { key: 'approverRole', label: 'Approver Role', type: 'select', options: [
      { label: 'Manager', value: 'manager' },
      { label: 'HR Admin', value: 'hr_admin' },
      { label: 'Finance', value: 'finance' }
    ], required: true },
    { key: 'requiresSignature', label: 'Requires e-Signature?', type: 'select', options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' }
    ]}
  ],
  automatedNode: [
    { key: 'label', label: 'Action Name', type: 'text', required: true },
    { key: 'actionType', label: 'Action Type', type: 'select', options: [
      { label: 'Send Email', value: 'send_email' },
      { label: 'Generate Document', value: 'generate_doc' },
      { label: 'Update Database', value: 'update_db' }
    ], required: true },
    { key: 'payload', label: 'JSON Payload Template', type: 'textarea' }
  ],
  endNode: [
    { key: 'label', label: 'End State Name', type: 'text', required: true },
    { key: 'status', label: 'Completion Status', type: 'select', options: [
      { label: 'Success', value: 'success' },
      { label: 'Failed', value: 'failed' }
    ]}
  ]
};
