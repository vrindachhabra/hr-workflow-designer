import React from 'react';
import { useForm } from 'react-hook-form';
import { nodeFormConfigs } from '../config/nodeForms';
import { NodeType } from '../types';

interface DynamicFormProps {
  nodeType: NodeType;
  initialData: any;
  onChange: (data: any) => void;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ nodeType, initialData, onChange }) => {
  const config = nodeFormConfigs[nodeType];
  const { register, watch } = useForm({
    defaultValues: initialData || {}
  });

  // Watch for changes and propagate up
  React.useEffect(() => {
    const subscription = watch((value) => {
      onChange(value);
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  if (!config) return <div className="text-sm text-gray-500">No configuration available for this node.</div>;

  return (
    <form className="space-y-4">
      {config.map((field) => (
        <div key={field.key} className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          
          {field.type === 'text' && (
            <input
              {...register(field.key, { required: field.required })}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          )}

          {field.type === 'textarea' && (
            <textarea
              {...register(field.key, { required: field.required })}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm min-h-[80px]"
            />
          )}

          {field.type === 'number' && (
            <input
              type="number"
              {...register(field.key, { required: field.required })}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          )}

          {field.type === 'select' && field.options && (
            <select
              {...register(field.key, { required: field.required })}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm bg-white"
            >
              <option value="">Select...</option>
              {field.options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          )}
        </div>
      ))}
    </form>
  );
};
