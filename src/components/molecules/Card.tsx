import React from "react";

export interface CardProps {
  /**
   * Card title
   */
  title?: string;
  /**
   * Card content
   */
  children: React.ReactNode;
  /**
   * Card footer content
   */
  footer?: React.ReactNode;
  /**
   * Card variant
   */
  variant?: "default" | "bordered" | "elevated";
  /**
   * Padding size
   */
  padding?: "none" | "small" | "medium" | "large";
}

export const Card: React.FC<CardProps> = ({
  title,
  children,
  footer,
  variant = "default",
  padding = "medium",
}) => {
  const variantStyles = {
    default: "bg-white",
    bordered: "bg-white border-2 border-gray-200",
    elevated: "bg-white shadow-lg",
  };

  const paddingStyles = {
    none: "p-0",
    small: "p-3",
    medium: "p-6",
    large: "p-8",
  };

  const baseStyles = "rounded-lg";

  const className = `${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]}`;

  return (
    <div className={className}>
      {title && <h3 className="font-family-header text-2xl font-bold text-header mb-4">{title}</h3>}
      <div className="text-foreground">{children}</div>
      {footer && <div className="mt-4 pt-4 border-t border-gray-200">{footer}</div>}
    </div>
  );
};
