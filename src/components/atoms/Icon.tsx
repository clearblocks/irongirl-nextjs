import React from "react";

import Image from "next/image";

export interface IconProps {
  /**
   * Icon image source URL
   */
  src: string;
  /**
   * Alternative text for the icon
   */
  alt: string;
  /**
   * Icon width in pixels
   */
  width?: number;
  /**
   * Icon height in pixels
   */
  height?: number;
}

export const Icon: React.FC<IconProps> = ({ src, alt, width = 50, height = 50 }) => {
  return <Image src={src} alt={alt} width={width} height={height} className="inline-block" />;
};
