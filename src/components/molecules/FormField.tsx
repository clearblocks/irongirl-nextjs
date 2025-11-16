import React from "react";

import { Input, type InputProps, Label } from "../atoms";

export interface FormFieldProps extends Omit<InputProps, "id" | "error"> {
  /**
   * Field label
   */
  label: string;
  /**
   * Field ID (used to connect label and input)
   */
  id: string;
  /**
   * Error message to display
   */
  errorMessage?: string;
  /**
   * Helper text
   */
  helperText?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  errorMessage,
  helperText,
  required,
  ...inputProps
}) => {
  const hasError = !!errorMessage;

  return (
    <div className="w-full">
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <Input id={id} error={hasError} required={required} {...inputProps} />
      {errorMessage && <p className="mt-1 text-sm text-red-500">{errorMessage}</p>}
      {helperText && !errorMessage && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
    </div>
  );
};
