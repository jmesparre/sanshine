'use client';

import Image from 'next/image';
interface TransferButtonProps {
  onClick: () => void;
  price: { amount: number; currency: string };
  method: { name: string; icon: string };
}

const TransferButton: React.FC<TransferButtonProps> = ({ onClick, price, method }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-secondary cursor-pointer text-white rounded-lg p-4 flex items-center justify-between hover:bg-secondary-foreground transition-colors"
    >
      <div className="flex items-center">
        <Image
          src={method.icon}
          alt={method.name}
          width={40}
          height={40}
          className="rounded-full mr-4"
        />
        <div>
          <p className="font-semibold text-left">Pago en {price.currency}</p>
          <p className="text-sm text-gray-300 text-left">Via: {method.name}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xl">
          {price.amount.toLocaleString(price.currency === 'MXN' ? 'es-MX' : 'es-AR', {
            style: 'currency',
            currency: price.currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </p>
        <p className="text-sm">Pagar</p>
      </div>
    </button>
  );
};

export default TransferButton;
