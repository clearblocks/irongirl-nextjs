import React from 'react';

export interface ButtonProps {
  /**
   * Button content
   */
  children: React.ReactNode;
  /**
   * Button variant
   */
  variant?: 'primary' | 'secondary' | 'outline';
  /**
   * Button size
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Click handler
   */
  onClick?: () => void;
  /**
   * Button type
   */
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  type = 'button',
}) => {
  const baseStyles =
    'font-sans rounded-lg transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantStyles = {
    primary:
      'bg-primary text-white hover:bg-primary-light focus:ring-primary disabled:bg-gray-300',
    secondary:
      'bg-header text-white hover:bg-header-light focus:ring-header disabled:bg-gray-300',
    outline:
      'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary disabled:border-gray-300 disabled:text-gray-300',
  };

  const sizeStyles = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  const disabledStyles = disabled
    ? 'cursor-not-allowed opacity-60'
    : 'cursor-pointer';

  const className = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles}`;

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

