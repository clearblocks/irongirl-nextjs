import React from 'react';
import { Icon } from '../atoms/Icon';
import { Button } from '../atoms/Button';

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
  description,
  buttonLabel,
  onClick,
}) => {
  return (
    <div className="bg-primary-light rounded-[30px] px-[10px] py-5 flex flex-col gap-[18px] items-center overflow-hidden w-full">
      <h2 className="text-2xl font-semibold text-black font-sans shrink-0">
        {title}
      </h2>
      <div className="w-[42px] h-[46px] shrink-0 relative">
        <Icon src={iconSrc} alt={iconAlt} />
      </div>
      <p className="text-base font-normal text-black font-sans text-center shrink-0 min-w-full">
        {description}
      </p>
      <Button label={buttonLabel} onClick={onClick} />
    </div>
  );
};

