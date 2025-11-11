import React from 'react';

export interface ButtonProps {
  /**
   * Button label text
   */
  label: string;
  /**
   * Click handler
   */
  onClick?: () => void;
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Button type
   */
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  type = 'button',
}) => {
  const baseStyles =
    'font-sans font-medium text-xl text-white bg-primary rounded-[25px] px-[26px] py-0 h-[50px] flex items-center justify-center gap-[10px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-[0px_4px_4px_0px_inset_rgba(0,0,0,0.25)]';

  const disabledStyles = disabled
    ? 'cursor-not-allowed grayscale'
    : 'cursor-pointer hover:opacity-90';

  const className = `${baseStyles} ${disabledStyles}`;

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

