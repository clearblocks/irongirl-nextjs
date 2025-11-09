import React from 'react';

export interface LabelProps {
  /**
   * Label text
   */
  children: React.ReactNode;
  /**
   * Associated input ID
   */
  htmlFor?: string;
  /**
   * Required indicator
   */
  required?: boolean;
  /**
   * Size variant
   */
  size?: 'small' | 'medium' | 'large';
}

export const Label: React.FC<LabelProps> = ({
  children,
  htmlFor,
  required = false,
  size = 'medium',
}) => {
  const sizeStyles = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  const className = `font-sans font-medium text-foreground ${sizeStyles[size]} mb-1 block`;

  return (
    <label htmlFor={htmlFor} className={className}>
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

