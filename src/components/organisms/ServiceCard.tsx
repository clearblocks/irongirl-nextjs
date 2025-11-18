import React from "react";

import { Button } from "../atoms/Button";
import { Icon } from "../atoms/Icon";

export interface ServiceCardProps {
  /**
   * Card title
   */
  title: string;
  /**
   * Icon image source
   */
  iconSrc: string;
  /**
   * Icon alt text
   */
  iconAlt: string;
  /**
   * Icon width (optional, defaults to 50)
   */
  iconWidth?: number;
  /**
   * Icon height (optional, defaults to 50)
   */
  iconHeight?: number;
  /**
   * Service description
   */
  description: string;
  /**
   * Button label text
   */
  buttonLabel: string;
  /**
   * Button click handler
   */
  onClick: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  iconSrc,
  iconAlt,
  iconWidth = 50,
  iconHeight = 50,
  description,
  buttonLabel,
  onClick,
}) => {
  return (
    <div className="bg-primary-light rounded-[30px] px-[10px] py-5 flex flex-col gap-[18px] items-center overflow-hidden w-full">
      <h2 className="text-2xl font-semibold text-black font-sans shrink-0">{title}</h2>
      <div className="shrink-0 relative flex items-center justify-center">
        <Icon src={iconSrc} alt={iconAlt} width={iconWidth} height={iconHeight} />
      </div>
      <p className="text-base font-normal text-black font-sans text-center shrink-0 min-w-full">
        {description}
      </p>
      <Button label={buttonLabel} onClick={onClick} />
    </div>
  );
};
