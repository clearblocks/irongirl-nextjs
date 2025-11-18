import React from "react";

export interface TextAreaProps {
  /**
   * Textarea placeholder
   */
  placeholder?: string;
  /**
   * Textarea value
   */
  value?: string;
  /**
   * Change handler
   */
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Error state
   */
  error?: boolean;
  /**
   * Textarea name
   */
  name: string;
  /**
   * Textarea ID
   */
  id?: string;
  /**
   * Required field
   */
  required?: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({
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
    "w-full px-4 py-2 font-family-sans text-base rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 min-h-[100px] resize-vertical";

  const stateStyles = error
    ? "border-2 border-red-500 focus:ring-red-500"
    : "border-2 border-gray-300 focus:ring-primary focus:border-primary";

  const disabledStyles = disabled ? "bg-gray-100 cursor-not-allowed opacity-60" : "bg-white";

  const className = `${baseStyles} ${stateStyles} ${disabledStyles}`;

  return (
    <textarea
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
