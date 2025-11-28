import React from 'react';

interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?: string;
  error?: boolean;
}

export const NumberInput: React.FC<NumberInputProps> = ({ suffix, className, error, ...props }) => {
  return (
    <div className="relative rounded-md shadow-sm">
      <input
        type="number"
        className={`block w-full rounded-md border-gray-300 pl-3 pr-12 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border ${
          error ? 'border-red-300' : 'border-gray-300'
        } ${className}`}
        {...props}
      />
      {suffix && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <span className="text-gray-500 sm:text-sm">{suffix}</span>
        </div>
      )}
    </div>
  );
};
