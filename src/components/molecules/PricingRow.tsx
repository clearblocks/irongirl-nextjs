import React from 'react';

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
    return `€${euros.toFixed(2).replace('.', ',')}`;
  };

  return (
    <div className="flex justify-between items-start w-full border-b border-black text-base font-sans font-normal text-black">
      <p className="shrink-0">{name}</p>
      <p className="shrink-0">{formatPrice(price)}</p>
    </div>
  );
};

