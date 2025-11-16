import React from "react";

import { PricingRow } from "../molecules/PricingRow";

export interface PriceItem {
  name: string;
  price: number;
}

export interface PricingTableProps {
  /**
   * Optional title for the pricing table
   */
  title?: string;
  /**
   * Optional subtitle for the pricing table
   */
  subtitle?: string;
  /**
   * Array of price items
   */
  priceItems: PriceItem[];
}

export const PricingTable: React.FC<PricingTableProps> = ({ title, subtitle, priceItems }) => {
  return (
    <div className="bg-primary-light rounded-[5px] px-[15px] py-5 flex flex-col gap-[18px] items-center overflow-hidden w-full">
      {title && <h3 className="text-2xl font-semibold text-primary font-sans shrink-0">{title}</h3>}
      {subtitle && (
        <h4 className="text-xl font-semibold text-primary font-sans shrink-0">{subtitle}</h4>
      )}
      <div className="flex flex-col gap-[10px] items-start w-full shrink-0">
        {priceItems.map((item, index) => (
          <PricingRow key={index} name={item.name} price={item.price} />
        ))}
      </div>
    </div>
  );
};
