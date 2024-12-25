import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'select' | 'textarea';
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  options?: { value: string; label: string; }[];
  rows?: number;
}

export default function FormField({ 
  label, 
  name, 
  type = 'text', 
  required = false, 
  value, 
  onChange,
  options,
  rows
}: FormFieldProps) {
  const baseClassName = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500";
  
  const renderField = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            name={name}
            id={name}
            rows={rows || 4}
            className={baseClassName}
            value={value}
            onChange={onChange}
            required={required}
          />
        );
      case 'select':
        return (
          <select
            name={name}
            id={name}
            className={baseClassName}
            value={value}
            onChange={onChange}
            required={required}
          >
            <option value="">Seleziona un'opzione</option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type={type}
            name={name}
            id={name}
            className={baseClassName}
            value={value}
            onChange={onChange}
            required={required}
          />
        );
    }
  };

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {renderField()}
    </div>
  );
}