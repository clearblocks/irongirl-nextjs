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
}

export const Icon: React.FC<IconProps> = ({ src, alt }) => {
  return <Image src={src} alt={alt} className="inline-block" />;
};
