import React from "react";

export interface PricingRowProps {
  /**
   * Name of the pricing item
   */
  name: string;
  /**
   * Price in cents (integer)
   */
  price: number;
}

export const PricingRow: React.FC<PricingRowProps> = ({ name, price }) => {
  // Format price from cents to euros
  const formatPrice = (priceInCents: number): string => {
    const euros = priceInCents / 100;

    return `€${euros.toFixed(2).replace(".", ",")}`;
  };

  return (
    <div className="flex justify-between items-start gap-4 w-full border-b border-black text-base font-family-sans font-normal text-black">
      <p className="flex-1 min-w-0">{name}</p>
      <p className="shrink-0 ml-2">{formatPrice(price)}</p>
    </div>
  );
};
