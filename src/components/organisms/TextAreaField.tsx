import React from 'react';
import { Label } from '../atoms/Label';
import { TextArea } from '../atoms/TextArea';

export interface TextAreaFieldProps {
  /**
   * Label text
   */
  label: string;
  /**
   * Field ID
   */
  id: string;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Error message to display
   */
  errorMessage?: string;
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Required field
   */
  required?: boolean;
  /**
   * Field value
   */
  value?: string;
  /**
   * Change handler
   */
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  id,
  placeholder,
  errorMessage,
  disabled = false,
  required = false,
  value,
  onChange,
}) => {
  const hasError = !!errorMessage;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <TextArea
        id={id}
        name={id}
        placeholder={placeholder}
        error={hasError}
        disabled={disabled}
        required={required}
        value={value}
        onChange={onChange}
      />
      {hasError && (
        <p className="text-sm text-red-500 font-sans mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

