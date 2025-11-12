import React from 'react';

export interface IconProps {
  /**
   * Icon image source URL
   */
  src: string;
  /**
   * Alternative text for the icon
   */
  alt: string;
}

export const Icon: React.FC<IconProps> = ({ src, alt }) => {
  return <img src={src} alt={alt} className="inline-block" />;
};

