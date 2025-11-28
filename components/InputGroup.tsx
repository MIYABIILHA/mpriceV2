import React from 'react';

interface InputGroupProps {
  label: string;
  subLabel?: string;
  children: React.ReactNode;
}

export const InputGroup: React.FC<InputGroupProps> = ({ label, subLabel, children }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {subLabel && <span className="text-xs text-gray-400 ml-1">({subLabel})</span>}
      </label>
      {children}
    </div>
  );
};
