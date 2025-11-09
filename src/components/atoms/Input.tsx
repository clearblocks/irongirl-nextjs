import React from 'react';

export interface InputProps {
  /**
   * Input type
   */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  /**
   * Input placeholder
   */
  placeholder?: string;
  /**
   * Input value
   */
  value?: string;
  /**
   * Change handler
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Error state
   */
  error?: boolean;
  /**
   * Input name
   */
  name?: string;
  /**
   * Input ID
   */
  id?: string;
  /**
   * Required field
   */
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  error = false,
  name,
  id,
  required = false,
}) => {
  const baseStyles =
    'w-full px-4 py-2 font-sans text-base rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1';

  const stateStyles = error
    ? 'border-2 border-red-500 focus:ring-red-500'
    : 'border-2 border-gray-300 focus:ring-primary focus:border-primary';

  const disabledStyles = disabled
    ? 'bg-gray-100 cursor-not-allowed opacity-60'
    : 'bg-white';

  const className = `${baseStyles} ${stateStyles} ${disabledStyles}`;

  return (
    <input
      type={type}
      id={id}
      name={name}
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
    />
  );
};

